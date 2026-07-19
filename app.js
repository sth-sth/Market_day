// Global State and Core Logic
let currentLang = 'zh'; // Default Chinese as requested

const STATE = {
    timeRemaining: 60,
    roundDuration: 60,
    score: 0,
    lives: 3,
    totalCards: 0,
    correctDrops: 0,
    combo: 0,
    maxCombo: 0,
    activeCard: null,
    isPlaying: false,
    timerInterval: null,
    spawnWatchdog: null,
    fallFrame: null,
    fallRun: 0,
    mode: 'easy',
    activeBuckets: [],
    activeTopicIds: [],
    phase: 'idle',
    roundId: 0,
    deck: [],
    fallSpeed: 1.05 // Extra slow descent for more answer time
};

const els = {
    app: document.getElementById('app'),
    viewButtons: document.querySelectorAll('.view-btn'),
    modeButtons: document.querySelectorAll('.mode-card'),
    durationButtons: document.querySelectorAll('.duration-card'),
    screens: {
        launch: document.getElementById('launch-screen'),
        tutorial: document.getElementById('tutorial-screen'),
        precheck: document.getElementById('precheck-overlay'),
        game: document.getElementById('game-ui'),
        pause: document.getElementById('pause-overlay'),
        settlement: document.getElementById('settlement-screen')
    },
    ui: {
        score: document.getElementById('score'),
        time: document.getElementById('time'),
        combo: document.getElementById('combo'),
        lives: document.getElementById('lives'),
        mode: document.getElementById('game-mode'),
        timeFill: document.getElementById('time-fill'),
        countdown: document.getElementById('countdown-overlay'),
        dropZone: document.getElementById('drop-zone'),
        bucketsLeft: document.getElementById('buckets-left'),
        bucketsRight: document.getElementById('buckets-right'),
        feedbackToast: document.getElementById('feedback-toast'),
        comboToast: document.getElementById('combo-toast')
    },
    qrModal: document.getElementById('qr-modal'),
    qrWrapper: document.getElementById('qrcode')
};

// Initial Setup
function init() {
    const savedDuration = Number(localStorage.getItem('marketDayRoundDuration'));
    if ([60, 120].includes(savedDuration)) STATE.roundDuration = savedDuration;
    STATE.timeRemaining = STATE.roundDuration;
    prepareRound();
    applyLanguage();
    applyViewMode(localStorage.getItem('marketDayViewMode') || 'phone');
    updateRoundDurationUI();
    updateUI();
    renderBuckets();
    bindEvents();
    setupQRLink();
}

function bindEvents() {
    document.getElementById('btn-lang-toggle').addEventListener('click', toggleLang);
    els.viewButtons.forEach((button) => {
        button.addEventListener('click', () => applyViewMode(button.dataset.view));
    });
    els.modeButtons.forEach((button) => {
        button.addEventListener('click', () => selectGameMode(button.dataset.mode));
    });
    els.durationButtons.forEach((button) => {
        button.addEventListener('click', () => selectRoundDuration(button.dataset.duration));
    });
    document.getElementById('btn-start').addEventListener('click', openTutorial);
    document.getElementById('btn-close-tutorial').addEventListener('click', () => showScreen('launch'));
    document.getElementById('btn-tutorial-continue').addEventListener('click', openPrecheck);
    document.getElementById('btn-scoc-yes').addEventListener('click', startGame);
    document.getElementById('btn-scoc-no').addEventListener('click', rejectScoc);
    document.getElementById('btn-pause').addEventListener('click', pauseGame);
    document.getElementById('btn-resume').addEventListener('click', resumeGame);
    document.getElementById('btn-quit').addEventListener('click', quitGame);
    document.getElementById('btn-play-again').addEventListener('click', openTutorial);
    
    document.getElementById('btn-show-qr-launch').addEventListener('click', showQR);
    document.getElementById('btn-show-qr-settlement').addEventListener('click', showQR);
    document.getElementById('btn-close-qr').addEventListener('click', hideQR);
    
    // Prevent default scroll bounce on mobile
    document.body.addEventListener('touchmove', (e) => {
        if(STATE.isPlaying) e.preventDefault();
    }, { passive: false });
}

function openPrecheck() {
    showScreen('precheck');
}

function openTutorial() {
    renderTopicGuide();
    updateRoundDurationUI();
    const guideScroll = document.getElementById('topic-guide-scroll');
    if (guideScroll) guideScroll.scrollTop = 0;
    showScreen('tutorial');
}

function renderTopicGuide() {
    const list = document.getElementById('topic-guide-list');
    if (!list) return;

    list.innerHTML = '';
    TOPICS.forEach((topic, index) => {
        const meta = TOPIC_META[topic];
        const examples = cardsData.filter((card) => card.bucket === meta.id).slice(0, 2);
        const card = document.createElement('article');
        const indexRail = document.createElement('div');
        const content = document.createElement('div');
        const titleLine = document.createElement('div');
        const icon = document.createElement('span');
        const title = document.createElement('h2');
        const description = document.createElement('p');
        const exampleLabel = document.createElement('p');
        const chipList = document.createElement('div');

        card.className = 'topic-guide-card';
        card.setAttribute('role', 'listitem');
        card.style.setProperty('--topic-color', meta.color);

        indexRail.className = 'topic-guide-index';
        indexRail.innerText = String(index + 1).padStart(2, '0');

        content.className = 'topic-guide-card-content';
        titleLine.className = 'topic-guide-title-line';
        icon.className = 'topic-guide-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerText = meta.guideIcon;
        title.innerText = currentLang === 'zh' ? meta.label_zh : topic;
        description.className = 'topic-guide-description';
        description.innerText = meta[`description_${currentLang}`];
        exampleLabel.className = 'topic-guide-example-label';
        exampleLabel.innerText = i18n[currentLang].topicGuideExamples;
        chipList.className = 'topic-guide-chip-list';

        examples.forEach((example) => {
            const chip = document.createElement('span');
            chip.className = 'topic-guide-chip';
            chip.innerText = example[`text_${currentLang}`];
            chipList.appendChild(chip);
        });

        titleLine.append(icon, title);
        content.append(titleLine, description, exampleLabel, chipList);
        card.append(indexRail, content);
        list.appendChild(card);
    });

    const closeButton = document.getElementById('btn-close-tutorial');
    const closeLabel = i18n[currentLang].topicGuideClose;
    if (closeButton) {
        closeButton.title = closeLabel;
        closeButton.setAttribute('aria-label', closeLabel);
    }
}

function rejectScoc() {
    STATE.isPlaying = false;
    STATE.phase = 'finished';
    STATE.roundId++;
    clearRoundTimers();
    resetActiveCard();

    STATE.score = 0;
    STATE.timeRemaining = STATE.roundDuration;
    STATE.combo = 0;
    STATE.maxCombo = 0;
    STATE.lives = 0;
    STATE.totalCards = 0;
    STATE.correctDrops = 0;
    updateUI();

    document.getElementById('final-score').innerText = '0';
    document.getElementById('final-accuracy').innerText = '0%';
    document.getElementById('final-title').innerText = currentLang === 'zh' ? '供應商聲明失敗' : 'Declaration Failed';
    document.getElementById('final-reason').innerText = currentLang === 'zh'
        ? '你選擇不遵守 CLP 供應商行為守則，任務在開始前已直接失敗。'
        : "You chose not to follow CLP's Supplier Code of Conduct. Mission failed before the game started.";

    showScreen('settlement');
}

// Language Logic
function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage();
}

function applyLanguage() {
    const dict = i18n[currentLang];
    document.documentElement.lang = currentLang === 'zh' ? 'zh-HK' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });
    updateModeUI();
    updateRoundDurationUI();
    renderTopicGuide();
    renderBuckets();
    if(STATE.activeCard) {
        // Soft refresh active card texts safely
        const sourceData = JSON.parse(STATE.activeCard.dataset.source);
        STATE.activeCard.querySelector('.card-tag').innerText = sourceData[`tag_${currentLang}`];
        STATE.activeCard.querySelector('.card-text').innerText = sourceData[`text_${currentLang}`];
    }
    refreshQRMeta();
}

function applyViewMode(mode) {
    const nextMode = mode === 'laptop' ? 'laptop' : 'phone';
    document.body.classList.remove('view-phone', 'view-laptop');
    document.body.classList.add(`view-${nextMode}`);
    els.viewButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.view === nextMode);
    });
    localStorage.setItem('marketDayViewMode', nextMode);
    // 如果沒有自訂背景，切換視圖時更新預設背景
    if (!localStorage.getItem('marketday_bg_url')) {
        const defaultBg = nextMode === 'laptop' ? 'assets/clp-scoc-bg-landscape.png' : 'assets/clp-scoc-bg-portrait.png';
        const opacity = parseFloat(localStorage.getItem('marketday_bg_opacity') || '0.45');
        document.body.style.setProperty('--bg-image', `url('${defaultBg}')`);
        document.body.style.setProperty('--bg-overlay-opacity', opacity);
        document.body.classList.add('has-bg-image'); const dc = document.querySelector('.device-content'); if (dc) { dc.style.backgroundImage = `url('${defaultBg}')`; }
    }
}

function selectGameMode(mode) {
    if (!GAME_MODES[mode] || STATE.isPlaying) return;
    STATE.mode = mode;
    prepareRound();
    updateModeUI();
    renderBuckets();
}

function selectRoundDuration(duration) {
    const nextDuration = Number(duration);
    if (STATE.isPlaying || ![60, 120].includes(nextDuration)) return;

    STATE.roundDuration = nextDuration;
    STATE.timeRemaining = nextDuration;
    localStorage.setItem('marketDayRoundDuration', String(nextDuration));
    updateRoundDurationUI();
    updateUI();
}

function getRoundDurationLabel() {
    return STATE.roundDuration === 120
        ? i18n[currentLang].durationTwo
        : i18n[currentLang].durationOne;
}

function formatTime(seconds) {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = String(safeSeconds % 60).padStart(2, '0');
    return `${minutes}:${remainder}`;
}

function updateRoundDurationUI() {
    const durationLabel = getRoundDurationLabel();
    els.durationButtons.forEach((button) => {
        const isSelected = Number(button.dataset.duration) === STATE.roundDuration;
        button.classList.toggle('selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });

    ['tutorial-duration', 'precheck-duration'].forEach((id) => {
        const durationEl = document.getElementById(id);
        if (durationEl) durationEl.innerText = durationLabel;
    });
}

function updateModeUI() {
    const mode = GAME_MODES[STATE.mode];
    if (!mode) return;

    const label = i18n[currentLang][mode.labelKey];
    els.app.dataset.mode = STATE.mode;
    els.modeButtons.forEach((button) => {
        const isSelected = button.dataset.mode === STATE.mode;
        button.classList.toggle('selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });
    if (els.ui.mode) els.ui.mode.innerText = label;
}

function prepareRound() {
    if (STATE.mode === 'easy') {
        STATE.activeBuckets = [...EASY_BUCKETS];
        STATE.activeTopicIds = buckets.map((bucket) => bucket.id);
    } else if (STATE.mode === 'medium') {
        STATE.activeBuckets = shuffle([...buckets]).slice(0, 6);
        STATE.activeTopicIds = STATE.activeBuckets.map((bucket) => bucket.id);
    } else {
        STATE.activeBuckets = [...buckets];
        STATE.activeTopicIds = buckets.map((bucket) => bucket.id);
    }
    STATE.deck = getRoundCards();
}

function getRoundCards() {
    const cards = STATE.mode === 'medium'
        ? cardsData.filter((card) => STATE.activeTopicIds.includes(card.bucket))
        : cardsData;
    return shuffle(cards);
}

function getCardTargetId(cardData) {
    if (STATE.mode !== 'easy') return cardData.bucket;
    const group = EASY_BUCKETS.find((bucket) => bucket.topics.includes(cardData.bucket));
    return group ? group.id : cardData.bucket;
}

// UI Renderers
function renderBuckets() {
    els.ui.bucketsLeft.innerHTML = '';
    els.ui.bucketsRight.innerHTML = '';

    STATE.activeBuckets.forEach((b, idx) => {
        const div = document.createElement('div');
        div.className = 'bucket';
        div.classList.toggle('bucket-large', STATE.mode === 'easy');
        div.dataset.id = b.id;
        div.style.setProperty('--b-col', b.color);
        const fullLabel = b[`label_${currentLang}`];
        const displayLabel = STATE.mode === 'easy' ? fullLabel : (b[`short_${currentLang}`] || fullLabel);
        div.setAttribute('aria-label', fullLabel);
        div.title = fullLabel;
        div.innerHTML = `
            <div class="icon">${b.icon}</div>
            <div class="name">${displayLabel}</div>
        `;
        div.addEventListener('click', () => handleBucketTap(div));
        const targetCol = STATE.mode === 'easy'
            ? (idx === 0 ? els.ui.bucketsLeft : els.ui.bucketsRight)
            : (idx % 2 === 0 ? els.ui.bucketsLeft : els.ui.bucketsRight);
        targetCol.appendChild(div);
    });
}

function handleBucketTap(bucketEl) {
    if (!STATE.isPlaying || !STATE.activeCard) return;
    const rect = bucketEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    handleDrop(bucketEl, cx, cy);
}

function showScreen(name) {
    Object.values(els.screens).forEach(s => s.classList.add('hidden'));
    if(name === 'pause') els.screens.game.classList.remove('hidden');
    els.screens[name].classList.remove('hidden');
}

// Game Loop
async function startGame() {
    const roundId = ++STATE.roundId;
    clearRoundTimers();
    resetActiveCard();
    prepareRound();
    renderBuckets();

    STATE.score = 0; STATE.timeRemaining = STATE.roundDuration; STATE.combo = 0; STATE.maxCombo = 0; STATE.lives = 3;
    STATE.totalCards = 0; STATE.correctDrops = 0; STATE.isPlaying = true; STATE.phase = 'countdown';
    
    updateUI();
    els.ui.dropZone.innerHTML = `
        <div id="countdown-overlay" class="countdown-overlay hidden">3</div>
        <div id="feedback-toast" class="feedback-toast hidden"></div>
        <div id="combo-toast" class="combo-toast hidden"></div>
    `;
    els.ui.countdown = document.getElementById('countdown-overlay');
    els.ui.feedbackToast = document.getElementById('feedback-toast');
    els.ui.comboToast = document.getElementById('combo-toast');
    
    showScreen('game');
    await playCountdown(roundId);

    if (!isCurrentRound(roundId) || STATE.phase !== 'countdown') return;
    STATE.phase = 'playing';
    startRoundLoops(roundId);
    spawnCardFlow();
}

function isCurrentRound(roundId) {
    return STATE.isPlaying && STATE.roundId === roundId;
}

function clearRoundTimers() {
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.spawnWatchdog);
    STATE.timerInterval = null;
    STATE.spawnWatchdog = null;
}

function startRoundLoops(roundId) {
    clearRoundTimers();
    STATE.timerInterval = setInterval(() => {
        if (!isCurrentRound(roundId) || STATE.phase !== 'playing') return;
        STATE.timeRemaining--;
        updateUI();
        if (STATE.timeRemaining <= 0) endGame('time');
    }, 1000);

    STATE.spawnWatchdog = setInterval(() => {
        if (!isCurrentRound(roundId) || STATE.phase !== 'playing') return;
        if (STATE.activeCard && !STATE.activeCard.isConnected) {
            stopCardFall();
            STATE.activeCard = null;
        }
        if (!STATE.activeCard) spawnCardFlow();
    }, 700);
}

function playCountdown(roundId) {
    return new Promise((resolve) => {
        const c = els.ui.countdown;
        if (!c) {
            resolve();
            return;
        }
        const marks = ['3', '2', '1', currentLang === 'zh' ? '開始!' : 'GO!'];
        c.classList.remove('hidden');
        let idx = 0;

        function tick() {
            if (!isCurrentRound(roundId) || STATE.phase !== 'countdown') {
                c.classList.add('hidden');
                resolve();
                return;
            }
            c.innerText = marks[idx];
            c.classList.remove('pulse');
            c.offsetHeight;
            c.classList.add('pulse');
            idx++;
            if (idx < marks.length) {
                setTimeout(tick, 450);
            } else {
                setTimeout(() => {
                    if (isCurrentRound(roundId) && STATE.phase === 'countdown') c.classList.add('hidden');
                    resolve();
                }, 320);
            }
        }

        tick();
    });
}

function pauseGame() {
    if (STATE.phase !== 'playing') return;
    STATE.isPlaying = false;
    STATE.phase = 'paused';
    clearRoundTimers();
    stopCardFall();
    showScreen('pause');
}
function resumeGame() {
    if (STATE.phase !== 'paused') return;
    STATE.isPlaying = true;
    STATE.phase = 'playing';
    showScreen('game');
    startRoundLoops(STATE.roundId);
    if (STATE.activeCard && document.body.contains(STATE.activeCard)) {
        startCardFall(STATE.activeCard);
    } else {
        STATE.activeCard = null;
        spawnCardFlow();
    }
}
function quitGame() {
    STATE.isPlaying = false;
    STATE.phase = 'idle';
    STATE.roundId++;
    clearRoundTimers();
    resetActiveCard();
    showScreen('launch');
}

function endGame() {
    STATE.isPlaying = false;
    STATE.phase = 'finished';
    STATE.roundId++;
    clearRoundTimers();
    resetActiveCard();
    
    const acc = STATE.totalCards > 0 ? Math.round((STATE.correctDrops / STATE.totalCards) * 100) : 0;
    document.getElementById('final-score').innerText = STATE.score;
    document.getElementById('final-accuracy').innerText = acc + '%';
    const reasonEl = document.getElementById('final-reason');
    if (reasonEl) {
        reasonEl.innerText = STATE.lives <= 0
            ? (currentLang === 'zh' ? '生命耗盡，任務結束。' : 'Out of lives. Mission failed.')
            : (currentLang === 'zh' ? '時間到，任務結束。' : 'Time up. Mission complete.');
    }
    
    let rank = currentLang === 'zh' ? "SCoC 專家" : "SCoC Expert";
    if (acc >= 90) rank = currentLang === 'zh' ? "合規大使" : "Ethics Guardian";
    else if (acc < 50) rank = currentLang === 'zh' ? "風險學員" : "Risk Trainee";
    document.getElementById('final-title').innerText = rank;
    
    showScreen('settlement');
}

function updateUI() {
    els.ui.score.innerText = STATE.score;
    els.ui.time.innerText = formatTime(STATE.timeRemaining);
    els.ui.combo.innerText = STATE.combo;
    els.ui.lives.innerText = '❤'.repeat(Math.max(0, STATE.lives));
    if (els.ui.timeFill) {
        const pct = Math.max(0, Math.min(100, (STATE.timeRemaining / STATE.roundDuration) * 100));
        els.ui.timeFill.style.width = pct + '%';
    }
}

// Mechanics
function shuffle(arr) {
    let array = [...arr];
    for(let i = array.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [array[i], array[j]] = [array[j], array[i]]; }
    return array;
}

function spawnCardFlow() {
    if (!STATE.isPlaying || STATE.phase !== 'playing') return;
    if (STATE.activeCard) return;
    if (STATE.deck.length === 0) STATE.deck = getRoundCards();
    const data = STATE.deck.pop();
    spawnCard(data);
}

function spawnCard(data) {
    STATE.totalCards++;
    const cardEl = document.createElement('div');
    cardEl.className = 'risk-card';
    cardEl.dataset.bucket = data.bucket;
    cardEl.dataset.source = JSON.stringify(data); // for realtime translation update
    
    // Matched color for border glow
    const bucketMeta = buckets.find(b => b.id === data.bucket);
    cardEl.style.setProperty('--card-color', bucketMeta ? bucketMeta.color : '#00ffff');
    
    cardEl.innerHTML = `
        <div class="card-tag" style="background:${bucketMeta.color}; color:#fff;">${data[`tag_${currentLang}`]}</div>
        <div class="card-text">${data[`text_${currentLang}`]}</div>
    `;
    
    els.ui.dropZone.appendChild(cardEl);
    STATE.activeCard = cardEl;

    cardEl.style.top = '-160px';
    startCardFall(cardEl);
    makeDraggable(cardEl);
}

function stopCardFall() {
    STATE.fallRun++;
    if (STATE.fallFrame !== null) cancelAnimationFrame(STATE.fallFrame);
    STATE.fallFrame = null;
}

function resetActiveCard() {
    stopCardFall();
    if (STATE.activeCard) STATE.activeCard.remove();
    STATE.activeCard = null;
}

function startCardFall(cardEl) {
    if (!cardEl || cardEl !== STATE.activeCard) return;

    stopCardFall();
    const fallRun = STATE.fallRun;
    let lastTime = performance.now();

    function fall(time) {
        if (!STATE.isPlaying || cardEl !== STATE.activeCard || !cardEl.isConnected || fallRun !== STATE.fallRun) {
            if (fallRun === STATE.fallRun) STATE.fallFrame = null;
            return;
        }

        const delta = Math.min(64, time - lastTime);
        lastTime = time;
        if (!cardEl.classList.contains('dragging')) {
            const currentY = Number.parseFloat(cardEl.style.top) || 0;
            const nextY = currentY + (STATE.fallSpeed * (delta / 16));
            cardEl.style.top = `${nextY}px`;
            const missThreshold = els.ui.dropZone.clientHeight + 170;
            if (nextY > missThreshold) {
                handleDrop(null);
                return;
            }
        }
        STATE.fallFrame = requestAnimationFrame(fall);
    }

    STATE.fallFrame = requestAnimationFrame(fall);
}

// 3D Tilt Drag & Drop Physics
function makeDraggable(el) {
    let isDragging = false;
    let startY = 0, startX = 0, initialTop = 0, initialLeft = 0;

    function onPointerDown(e) {
        if(!STATE.isPlaying) return;
        isDragging = true;
        el.classList.add('dragging');
        if (typeof e.pointerId === 'number' && el.setPointerCapture) el.setPointerCapture(e.pointerId);
        startX = e.clientX; startY = e.clientY;
        initialTop = parseInt(window.getComputedStyle(el).top, 10);
        initialLeft = parseInt(window.getComputedStyle(el).left, 10) || (els.ui.dropZone.clientWidth / 2);
        el.style.left = initialLeft + 'px';
        el.style.margin = '0';
        el.style.transform = `translate(-50%, -50%) scale(1.05)`;
    }

    function onPointerMove(e) {
        if(!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (initialLeft + dx) + 'px';
        el.style.top = (initialTop + dy) + 'px';
        
        // 3D Tilt effect based on drag direction speed
        let rotateTilt = Math.max(-15, Math.min(15, dx * 0.15));
        el.style.transform = `translate(-50%, -50%) rotateZ(${rotateTilt}deg) rotateY(${rotateTilt}deg) scale(1.05)`;
        
        checkHover(e.clientX, e.clientY);
    }

    function onPointerUp(e) {
        if(!isDragging) return;
        isDragging = false;
        el.classList.remove('dragging');
        if (typeof e.pointerId === 'number' && el.releasePointerCapture) el.releasePointerCapture(e.pointerId);
        el.style.transform = `translate(-50%, 0)`;
        handleDrop(getTargetBucket(e.clientX, e.clientY), e.clientX, e.clientY);
    }

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    // Touch fallback for environments with inconsistent pointer events.
    el.addEventListener('touchstart', (e) => {
        if (!e.touches || !e.touches[0]) return;
        const t = e.touches[0];
        onPointerDown({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches || !e.touches[0]) return;
        e.preventDefault();
        const t = e.touches[0];
        onPointerMove({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: false });

    el.addEventListener('touchend', (e) => {
        const t = (e.changedTouches && e.changedTouches[0]) || null;
        if (!t) return;
        onPointerUp({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: true });
}

function checkHover(x, y) {
    document.querySelectorAll('.bucket').forEach(b => b.classList.remove('drag-over'));
    const t = getTargetBucket(x, y);
    if(t) t.classList.add('drag-over');
}

function getTargetBucket(x, y) {
    const bucketsNode = document.querySelectorAll('.bucket');
    for(let b of bucketsNode) {
        const r = b.getBoundingClientRect();
        if(x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b;
    }
    return null;
}

// Resolution & Particles
function handleDrop(bucketEl, dropX, dropY) {
    if (!STATE.isPlaying || STATE.phase !== 'playing' || !STATE.activeCard) return;
    const card = STATE.activeCard;
    const sData = JSON.parse(card.dataset.source);
    document.querySelectorAll('.bucket').forEach(b => b.classList.remove('drag-over'));
    
    STATE.activeCard = null;
    stopCardFall();
    const targetId = getCardTargetId(sData);
    const targetBucket = STATE.activeBuckets.find((bucket) => bucket.id === targetId);
    let bColor = targetBucket?.color || buckets.find(b=>b.id === sData.bucket)?.color || '#fff';

    if(bucketEl && bucketEl.dataset.id === targetId) {
        // CORRECT
        STATE.score += 100 + (STATE.combo * 20); STATE.correctDrops++; STATE.combo++;
        if(STATE.combo > STATE.maxCombo) STATE.maxCombo = STATE.combo;
        
        bucketEl.classList.add('correct'); setTimeout(()=>bucketEl.classList.remove('correct'), 300);
        showFeedback('✓ ' + sData[`feedback_${currentLang}`], true);
        checkComboMilestone();
        createParticles(dropX, dropY, bColor);
    } else {
        // WRONG OR MISSED
        STATE.combo = 0;
        applyLifePenalty();
        els.app.classList.add('shake'); setTimeout(()=>els.app.classList.remove('shake'), 400);
        showFeedback(bucketEl ? '✗ ' + sData[`feedback_${currentLang}`] : (currentLang === 'zh' ? '漏接：' : 'Miss: ') + sData[`feedback_${currentLang}`], false);
    }
    
    card.style.transition = 'all 0.3s ease'; card.style.opacity = '0';
    card.style.transform = `translate(-50%, 50px) scale(0.2)`;
    setTimeout(() => { card.remove(); updateUI(); setTimeout(spawnCardFlow, 100); }, 300);
}

function applyLifePenalty() {
    STATE.lives = Math.max(0, STATE.lives - 1);
    updateUI();
    if (STATE.lives <= 0) {
        endGame('lives');
    }
}

function createParticles(x, y, color) {
    const parentRect = els.app.getBoundingClientRect();
    const relX = x - parentRect.left;
    const relY = y - parentRect.top;
    
    for(let i=0; i<20; i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        p.style.backgroundColor = color;
        p.style.left = relX + 'px'; p.style.top = relY + 'px';
        let angle = Math.random() * Math.PI * 2;
        let diff = Math.random() * 80 + 30; // expand distance
        p.style.setProperty('--dx', (Math.cos(angle)*diff) + 'px');
        p.style.setProperty('--dy', (Math.sin(angle)*diff) + 'px');
        els.app.appendChild(p);
        setTimeout(()=>p.remove(), 700);
    }
}

function showFeedback(txt, isCorrect) {
    const t = els.ui.feedbackToast;
    t.innerText = txt; t.className = `feedback-toast ${isCorrect?'correct':'wrong'}`;
    setTimeout(()=>t.classList.add('hidden'), 1200);
}

function checkComboMilestone() {
    const c = STATE.combo;
    if(c === 3 || c === 5 || c === 8 || c === 12) {
        const msgsEn = {3:'Nice Drop!', 5:'Hot Streak!', 8:'Risk Radar!', 12:'Unstoppable!'};
        const msgsZh = {3:'漂亮！', 5:'手感火熱！', 8:'風險雷達！', 12:'無人能擋！'};
        const txt = currentLang === 'zh' ? msgsZh[c] : msgsEn[c];
        
        const t = els.ui.comboToast;
        t.innerText = `${c} Combo: ${txt}`; t.classList.remove('hidden');
        t.style.animation = 'none'; t.offsetHeight; t.style.animation = 'megaFloat 1.2s ease-out forwards';
    }
}

// QR
function getShareUrl() {
    return window.location.href;
}

function setupQRLink() {
    const parent = els.qrWrapper.parentElement;
    if (!parent || document.getElementById('qr-link')) return;

    const link = document.createElement('a');
    link.id = 'qr-link';
    link.className = 'qr-link';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const hint = document.createElement('p');
    hint.id = 'qr-hint';
    hint.className = 'qr-hint';

    parent.appendChild(link);
    parent.appendChild(hint);
    refreshQRMeta();
}

function refreshQRMeta() {
    const url = getShareUrl();
    const link = document.getElementById('qr-link');
    const hint = document.getElementById('qr-hint');
    if (link) {
        link.href = url;
        link.innerText = url;
    }
    if (hint) {
        const isLocal = /^(localhost|127\\.0\\.0\\.1)$/i.test(window.location.hostname);
        hint.innerText = isLocal
            ? (currentLang === 'zh' ? '目前是本機位址，手機無法直接連入。請改用可外網存取網址再分享。' : 'This is a local URL and is not reachable by phone. Use a public URL before sharing.')
            : (currentLang === 'zh' ? '若無法掃碼，點擊上方連結可直接開啟。' : 'If QR scan fails, open the link above directly.');
    }
}

function generateQR() {
    if (!els.qrWrapper) return;
    refreshQRMeta();
    els.qrWrapper.innerHTML = '';

    if (typeof QRCode !== 'function') {
        const fallback = document.createElement('p');
        fallback.className = 'qr-hint';
        fallback.innerText = currentLang === 'zh' ? '未載入 QR 函式庫，請直接使用下方連結。' : 'QR library unavailable, please use the link below.';
        els.qrWrapper.appendChild(fallback);
        return;
    }

    new QRCode(els.qrWrapper, {
        text: getShareUrl(),
        width: 180,
        height: 180,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

function showQR() {
    generateQR();
    els.qrModal.classList.remove('hidden');
}
function hideQR() { els.qrModal.classList.add('hidden'); }

window.addEventListener('DOMContentLoaded', init);

// ============================================
// 背景設定功能 (Background Setting Feature)
// ============================================
(function initBgSetting() {
    const body = document.body;
    const btnOpen = document.getElementById('btn-bg-setting');
    const panel = document.getElementById('bg-setting-panel');
    const overlay = document.getElementById('bg-setting-overlay');
    const fileInput = document.getElementById('bg-file-input');
    const urlInput = document.getElementById('bg-url-input');
    const overlaySlider = document.getElementById('bg-overlay-slider');
    const overlayValue = document.getElementById('bg-overlay-value');
    const btnApply = document.getElementById('bg-btn-apply');
    const btnClear = document.getElementById('bg-btn-clear');
    const presetStrip = document.getElementById('bg-preset-strip');

    if (!btnOpen || !panel) return;

    // 從 localStorage 恢復上次的背景設定
    let pendingBgUrl = null;
    const savedBg = localStorage.getItem('marketday_bg_url');
    const savedOpacity = parseFloat(localStorage.getItem('marketday_bg_opacity') || '0.45');

    if (savedBg) {
        applyBackground(savedBg, savedOpacity);
    } else {
        // 無自訂背景時，根據視圖模式載入預設背景圖片
        const viewMode = localStorage.getItem('marketDayViewMode') || 'phone';
        const defaultBg = viewMode === 'laptop' ? 'assets/clp-scoc-bg-landscape.png' : 'assets/clp-scoc-bg-portrait.png';
        applyBackground(defaultBg, savedOpacity);
    }

    if (overlaySlider) {
        overlaySlider.value = savedOpacity;
        updateOverlayValueLabel(savedOpacity);
    }

    // 開關面板
    function openPanel() {
        panel.classList.add('open');
        overlay.classList.add('visible');
    }

    function closePanel() {
        panel.classList.remove('open');
        overlay.classList.remove('visible');
        pendingBgUrl = null;
        if (fileInput) fileInput.value = '';
    }

    btnOpen.addEventListener('click', openPanel);
    overlay.addEventListener('click', closePanel);

    // 遠明度滑桿事件
    function updateOverlayValueLabel(val) {
        if (overlayValue) overlayValue.textContent = Math.round(val * 100) + '%';
    }

    if (overlaySlider) {
        overlaySlider.addEventListener('input', function () {
            updateOverlayValueLabel(parseFloat(this.value));
            // 即時預覽
            if (body.classList.contains('has-bg-image')) {
                body.style.setProperty('--bg-overlay-opacity', this.value);
            }
        });
    }

    // 選擇本地圖片
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                pendingBgUrl = e.target.result;
                // 將圖片加入縮圖列
                addToPresetStrip(pendingBgUrl, true);
            };
            reader.readAsDataURL(file);
        });
    }

    // 套用按鈕
    if (btnApply) {
        btnApply.addEventListener('click', function () {
            const urlVal = urlInput ? urlInput.value.trim() : '';
            const bgUrl = pendingBgUrl || (urlVal ? urlVal : null);
            const opacityVal = overlaySlider ? parseFloat(overlaySlider.value) : 0.45;

            if (bgUrl) {
                applyBackground(bgUrl, opacityVal);
                localStorage.setItem('marketday_bg_url', bgUrl);
                localStorage.setItem('marketday_bg_opacity', opacityVal);
            } else {
                // 如果沒有輸入但頂部資料更改恰更新遠明度
                const currentBg = localStorage.getItem('marketday_bg_url');
                if (currentBg) {
                    applyBackground(currentBg, opacityVal);
                    localStorage.setItem('marketday_bg_opacity', opacityVal);
                }
            }
            closePanel();
        });
    }

    // 清除按鈕
    if (btnClear) {
        btnClear.addEventListener('click', function () {
            clearBackground();
            localStorage.removeItem('marketday_bg_url');
            localStorage.removeItem('marketday_bg_opacity');
            closePanel();
        });
    }

    // URL 輸入
    if (urlInput) {
        urlInput.addEventListener('input', function () {
            if (this.value.trim()) {
                pendingBgUrl = null; // 優先使用 URL
            }
        });
    }

    // 套用背景
    function applyBackground(bgUrl, opacity) {
        body.style.setProperty('--bg-image', `url('${bgUrl}')`);
        body.style.setProperty('--bg-overlay-opacity', opacity);
        body.classList.add('has-bg-image');
        // 更新預設縮圖選中狀態
        updateActivePreset(bgUrl);
    }

    // 清除背景
    function clearBackground() {
        body.style.removeProperty('--bg-image');
        body.classList.remove('has-bg-image');
        // 歸復預設頂部選中
        const noBgThumb = presetStrip ? presetStrip.querySelector('[data-preset="none"]') : null;
        if (noBgThumb) setActiveThumb(noBgThumb);
    }

    // 新增縮圖到預設列
    function addToPresetStrip(bgUrl, makeActive) {
        if (!presetStrip) return;
        // 如果已存在相同 URL 則不重複添加
        const existing = presetStrip.querySelector(`[data-preset="${CSS.escape(bgUrl)}"]`);
        if (existing) {
            if (makeActive) setActiveThumb(existing);
            return;
        }
        const thumb = document.createElement('div');
        thumb.className = 'bg-preset-thumb';
        thumb.dataset.preset = bgUrl;
        thumb.style.backgroundImage = `url('${bgUrl}')`;
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');
        thumb.addEventListener('click', () => {
            pendingBgUrl = bgUrl;
            setActiveThumb(thumb);
        });
        presetStrip.appendChild(thumb);
        if (makeActive) setActiveThumb(thumb);
    }

    // 更新預設縮圖選中狀態
    function updateActivePreset(bgUrl) {
        if (!presetStrip) return;
        const thumb = presetStrip.querySelector(`[data-preset="${CSS.escape(bgUrl)}"]`);
        if (thumb) {
            setActiveThumb(thumb);
        } else {
            // 如果沒有對應縮圖，新增一個
            addToPresetStrip(bgUrl, true);
        }
    }

    function setActiveThumb(activeThumb) {
        if (!presetStrip) return;
        presetStrip.querySelectorAll('.bg-preset-thumb').forEach(t => t.classList.remove('active'));
        activeThumb.classList.add('active');
    }

    // 預設縮圖點擊事件—「無背景」預設
    const noBgThumb = presetStrip ? presetStrip.querySelector('[data-preset="none"]') : null;
    if (noBgThumb) {
        noBgThumb.addEventListener('click', function () {
            pendingBgUrl = null;
            if (urlInput) urlInput.value = '';
            setActiveThumb(noBgThumb);
        });
    }

    // 如果已有儲存的背景，將其加入縮圖列
    if (savedBg) {
        addToPresetStrip(savedBg, true);
    } else {
        if (noBgThumb) noBgThumb.classList.add('active');
    }
})();
