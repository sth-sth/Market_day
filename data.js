const i18n = {
    en: {
        title: "SCoC Drop Match",
        subtitle: "Catch the Risk. Match the Right Code.",
        launchDesc: "Master the 11 key topics of CLP's Supplier Code of Conduct!",
        start: "Start Mission",
        shareBtn: "Share via QR",
        precheckTitle: "Supplier Declaration",
        precheckDesc: "Assume you are a supplier. Will you follow CLP's Supplier Code of Conduct (SCoC)?",
        precheckNote: "Choose Yes to start the game. Choose No to fail immediately.",
        precheckYes: "Yes, I Will Follow",
        precheckNo: "No, I Will Not",
        score: "SCORE",
        time: "TIME",
        lives: "LIVES",
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
        precheckTitle: "供應商聲明",
        precheckDesc: "假設你是一名供應商，你是否願意遵守 CLP 供應商行為守則（SCoC）？",
        precheckNote: "選擇「願意」即可開始遊戲；選擇「不願意」會直接失敗。",
        precheckYes: "願意遵守",
        precheckNo: "不願意遵守",
        score: "分數",
        time: "時間",
        lives: "生命",
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

const EASY_CARD_BANK = [
    { id: 'LC01', text_en: 'Licenses', text_zh: '牌照', topic: 'Legal Compliance' },
    { id: 'LC02', text_en: 'Sanctions', text_zh: '制裁', topic: 'Legal Compliance' },

    { id: 'BE01', text_en: 'Gifts', text_zh: '饋贈', topic: 'Business Ethics' },
    { id: 'BE02', text_en: 'Conflict of Interest', text_zh: '利益衝突', topic: 'Business Ethics' },

    { id: 'CY01', text_en: 'Data Privacy', text_zh: '資料私隱', topic: 'Cybersecurity' },
    { id: 'CY02', text_en: 'Digital Assets', text_zh: '數碼資產', topic: 'Cybersecurity' },

    { id: 'QS01', text_en: 'Product Recall', text_zh: '產品召回', topic: 'Quality and Safety' },
    { id: 'QS02', text_en: 'Product Quality', text_zh: '產品品質', topic: 'Quality and Safety' },

    { id: 'EM01', text_en: 'Waste', text_zh: '廢棄物', topic: 'Environmental Management' },
    { id: 'EM02', text_en: 'Environmental Risk', text_zh: '環境風險', topic: 'Environmental Management' },

    { id: 'CC01', text_en: 'GHG Emissions', text_zh: '溫室氣體排放', topic: 'Climate Change' },
    { id: 'CC02', text_en: 'Clean Energy', text_zh: '清潔能源', topic: 'Climate Change' },

    { id: 'EH01', text_en: 'Workplace Hazards', text_zh: '工作場所危害', topic: 'Employee Health and Safety' },
    { id: 'EH02', text_en: 'Safety Training', text_zh: '安全培訓', topic: 'Employee Health and Safety' },

    { id: 'LH01', text_en: 'Child Labour', text_zh: '童工', topic: 'Labour Practices and Human Rights' },
    { id: 'LH02', text_en: 'Forced Labour', text_zh: '強迫勞動', topic: 'Labour Practices and Human Rights' },

    { id: 'DI01', text_en: 'Harassment', text_zh: '騷擾', topic: 'Diversity and Inclusion' },
    { id: 'DI02', text_en: 'Discrimination', text_zh: '歧視', topic: 'Diversity and Inclusion' },

    { id: 'CR01', text_en: 'Grievance Channel', text_zh: '申訴渠道', topic: 'Community Relations' },
    { id: 'CR02', text_en: 'Community Support', text_zh: '社區支援', topic: 'Community Relations' },

    { id: 'SC01', text_en: 'Supplier Audit', text_zh: '供應商審核', topic: 'Supply Chain Management' },
    { id: 'SC02', text_en: 'Risk Ranking', text_zh: '風險分級', topic: 'Supply Chain Management' }
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

const cardsData = EASY_CARD_BANK.map((card) => {
    const bucketMeta = TOPIC_META[card.topic];
    return {
        bucket: bucketMeta.id,
        tag_en: card.id,
        tag_zh: card.id,
        text_en: card.text_en,
        text_zh: card.text_zh,
        feedback_en: `Answer: ${card.topic}`,
        feedback_zh: `答案：${bucketMeta.label_zh}（${card.id}）`
    };
});