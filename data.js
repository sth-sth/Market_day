const i18n = {
    en: {
        title: "SCoC Drop Match",
        subtitle: "Catch the Risk. Match the Right Code.",
        launchDesc: "Master the 11 key topics of CLP's Supplier Code of Conduct!",
        start: "Start Mission",
        shareBtn: "Share via QR",
        howTo: "Mission Briefing",
        tutDesc1: "Drag falling events into the correct SCoC bucket below.",
        tutDesc2: "11 Categories. 60 Seconds. Build combos for massive points!",
        gotIt: "Let's Go!",
        score: "SCORE",
        time: "TIME",
        acc: "ACCURACY",
        combo: "COMBO",
        paused: "Mission Paused",
        resume: "Resume",
        quit: "Quit to Menu",
        settleTitle: "Challenge Complete",
        playAgain: "Play Again",
        qrTitle: "Scan & Play",
        langBtn: "繁體"
    },
    zh: {
        title: "SCoC 墜落配對",
        subtitle: "捕捉風險，精準配對。",
        launchDesc: "掌握 CLP 供應商行為準則的 11 大主題！",
        start: "開始任務",
        shareBtn: "分享遊戲",
        howTo: "任務簡報",
        tutDesc1: "將掉落的危險事件卡快速拖拽到對應的準則類別中。",
        tutDesc2: "11個主題，60秒挑戰。連續答對獲取超高分！",
        gotIt: "出發！",
        score: "分數",
        time: "時間",
        acc: "準確率",
        combo: "連擊",
        paused: "任務暫停",
        resume: "繼續",
        quit: "返回主選單",
        settleTitle: "挑戰完成",
        playAgain: "再玩一次",
        qrTitle: "掃碼挑戰",
        langBtn: "EN"
    }
};

const TOPICS = [
    'Legal Compliance',
    'Business Ethics',
    'Cybersecurity',
    'Quality and Safety',
    'Environmental Management',
    'Climate Change',
    'Employee Health and Safety',
    'Labour Practices and Human Rights',
    'Diversity and Inclusion',
    'Community Relations',
    'Supply Chain Management'
];

const CARD_BANK = [
    { id: 'LC01', text_en: 'Follow local laws where you operate.', text_zh: '遵守營運地法律法規。', topic: 'Legal Compliance', type: 'Must' },
    { id: 'LC02', text_en: 'Ensure exports meet destination regulations.', text_zh: '出口產品符合目的地法規。', topic: 'Legal Compliance', type: 'Must' },

    { id: 'BE01', text_en: 'Operate honestly, transparently, and professionally.', text_zh: '以誠信、透明、專業方式營運。', topic: 'Business Ethics', type: 'Must' },
    { id: 'BE02', text_en: 'Do not offer gifts or benefits to CLP staff.', text_zh: '不得向 CLP 員工提供金錢或利益。', topic: 'Business Ethics', type: 'Must' },

    { id: 'CY01', text_en: "Help protect CLP's digital assets.", text_zh: '共同保護 CLP 數碼資產。', topic: 'Cybersecurity', type: 'Must' },
    { id: 'CY02', text_en: 'Comply with privacy and information security laws.', text_zh: '遵守私隱及資訊安全法規。', topic: 'Cybersecurity', type: 'Must' },

    { id: 'QS01', text_en: 'Follow applicable safety laws in operations.', text_zh: '業務運作須遵守安全法規。', topic: 'Quality and Safety', type: 'Must' },
    { id: 'QS02', text_en: 'Run product recall or rectification programs.', text_zh: '發現缺陷時啟動召回或整改。', topic: 'Quality and Safety', type: 'Expectation' },

    { id: 'EM01', text_en: 'Follow environmental laws where you operate.', text_zh: '遵守營運地環境法律法規。', topic: 'Environmental Management', type: 'Must' },
    { id: 'EM02', text_en: 'Assess environmental aspects and risks.', text_zh: '識別並評估環境因素與風險。', topic: 'Environmental Management', type: 'Expectation' },

    { id: 'CC01', text_en: 'Measure and disclose greenhouse gas emissions.', text_zh: '量度並披露溫室氣體排放。', topic: 'Climate Change', type: 'Expectation' },
    { id: 'CC02', text_en: 'Set a decarbonisation plan with targets.', text_zh: '制定減碳策略及減排目標。', topic: 'Climate Change', type: 'Expectation' },

    { id: 'EH01', text_en: 'Follow health and safety laws in operations.', text_zh: '業務運作須遵守職安健法規。', topic: 'Employee Health and Safety', type: 'Must' },
    { id: 'EH02', text_en: 'Identify workplace hazards and mitigate risks.', text_zh: '識別工作危害並落實風險控制。', topic: 'Employee Health and Safety', type: 'Expectation' },

    { id: 'LH01', text_en: 'Zero tolerance for child or forced labour.', text_zh: '對童工及強迫勞動零容忍。', topic: 'Labour Practices and Human Rights', type: 'Must' },
    { id: 'LH02', text_en: 'Do not hire below legal minimum working age.', text_zh: '不得聘用低於法定最低年齡人士。', topic: 'Labour Practices and Human Rights', type: 'Must' },

    { id: 'DI01', text_en: 'Zero tolerance for discrimination and harassment.', text_zh: '對歧視及騷擾行為零容忍。', topic: 'Diversity and Inclusion', type: 'Must' },
    { id: 'DI02', text_en: 'Use fair systems for hiring and evaluation.', text_zh: '招聘、薪酬及考核須公平無歧視。', topic: 'Diversity and Inclusion', type: 'Expectation' },

    { id: 'CR01', text_en: 'Keep grievance channels open to communities.', text_zh: '向社區保持公開申訴溝通渠道。', topic: 'Community Relations', type: 'Expectation' },
    { id: 'CR02', text_en: 'Actively support local communities.', text_zh: '積極支持業務所在地社區。', topic: 'Community Relations', type: 'Expectation' },

    { id: 'SC01', text_en: 'Track upstream suppliers against this Code.', text_zh: '按本守則監察上游供應商表現。', topic: 'Supply Chain Management', type: 'Expectation' },
    { id: 'SC02', text_en: 'Implement robust upstream supplier programs.', text_zh: '建立完善上游供應商管理計劃。', topic: 'Supply Chain Management', type: 'Expectation' }
];

const TOPIC_META = {
    'Legal Compliance': { id: 'leg', label_zh: '法律合規', icon: '⚖️', color: '#ff4d4d' },
    'Business Ethics': { id: 'eth', label_zh: '商業道德', icon: '🤝', color: '#ff9f43' },
    'Cybersecurity': { id: 'cyb', label_zh: '網絡安全', icon: '💻', color: '#0abde3' },
    'Quality and Safety': { id: 'qas', label_zh: '質量與安全', icon: '🛡️', color: '#10ac84' },
    'Environmental Management': { id: 'env', label_zh: '環境管理', icon: '🌿', color: '#1dd1a1' },
    'Climate Change': { id: 'cli', label_zh: '氣候變化', icon: '🌡️', color: '#feca57' },
    'Employee Health and Safety': { id: 'ehs', label_zh: '員工健康與安全', icon: '👷', color: '#ff6b6b' },
    'Labour Practices and Human Rights': { id: 'lab', label_zh: '勞工實務與人權', icon: '👥', color: '#ee5253' },
    'Diversity and Inclusion': { id: 'div', label_zh: '多元與共融', icon: '🌈', color: '#f368e0' },
    'Community Relations': { id: 'com', label_zh: '社區關係', icon: '🏘️', color: '#82ccdd' },
    'Supply Chain Management': { id: 'sup', label_zh: '供應鏈管理', icon: '🔗', color: '#9b59b6' }
};

const buckets = TOPICS.map((topic) => {
    const meta = TOPIC_META[topic];
    return {
        id: meta.id,
        label_en: topic,
        label_zh: meta.label_zh,
        icon: meta.icon,
        color: meta.color
    };
});

const cardsData = CARD_BANK.map((card) => {
    const bucketMeta = TOPIC_META[card.topic];
    const zhType = card.type === 'Must' ? '必須' : '期望';
    return {
        bucket: bucketMeta.id,
        tag_en: card.type,
        tag_zh: zhType,
        text_en: card.text_en,
        text_zh: card.text_zh,
        feedback_en: `Answer: ${card.topic} (${card.id})`,
        feedback_zh: `答案：${bucketMeta.label_zh}（${card.id}）`
    };
});