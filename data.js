const i18n = {
    en: {
        title: "SCoC Matching Game",
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
        langBtn: "繁體",
        phoneView: "Phone",
        laptopView: "Laptop"
    },
    zh: {
        title: "SCoC 配對遊戲",
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
        langBtn: "EN",
        phoneView: "手機",
        laptopView: "桌面"
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
    { id: 'LC01', text_en: 'Business Licences', text_zh: '營業牌照', topic: 'Legal Compliance' },
    { id: 'LC02', text_en: 'Sanctions', text_zh: '制裁', topic: 'Legal Compliance' },

    { id: 'BE01', text_en: 'Gifts to CLP Staff', text_zh: '向中電員工提供饋贈', topic: 'Business Ethics' },
    { id: 'BE02', text_en: 'Conflict of Interest', text_zh: '利益衝突', topic: 'Business Ethics' },

    { id: 'CY01', text_en: 'CLP Digital Assets', text_zh: '中電數碼資產', topic: 'Cybersecurity' },
    { id: 'CY02', text_en: 'Data Privacy', text_zh: '資料私隱', topic: 'Cybersecurity' },

    { id: 'QS01', text_en: 'Product Recall', text_zh: '產品召回', topic: 'Quality and Safety' },
    { id: 'QS02', text_en: 'Quality Defect', text_zh: '品質缺陷', topic: 'Quality and Safety' },

    { id: 'EM01', text_en: 'Environmental Management System', text_zh: '環境管理系統', topic: 'Environmental Management' },
    { id: 'EM02', text_en: 'Waste Impact', text_zh: '廢棄物影響', topic: 'Environmental Management' },

    { id: 'CC01', text_en: 'GHG Emissions', text_zh: '溫室氣體排放', topic: 'Climate Change' },
    { id: 'CC02', text_en: 'Decarbonisation Targets', text_zh: '減碳目標', topic: 'Climate Change' },

    { id: 'EH01', text_en: 'Working at Heights', text_zh: '高處工作', topic: 'Employee Health and Safety' },
    { id: 'EH02', text_en: 'Hazardous Chemicals exposure during working', text_zh: '工作期間接觸危險化學品', topic: 'Employee Health and Safety' },

    { id: 'LH01', text_en: 'Child Labour', text_zh: '童工', topic: 'Labour Practices and Human Rights' },
    { id: 'LH02', text_en: 'Forced Labour', text_zh: '強迫勞動', topic: 'Labour Practices and Human Rights' },

    { id: 'DI01', text_en: 'Discrimination', text_zh: '歧視', topic: 'Diversity and Inclusion' },
    { id: 'DI02', text_en: 'Harassment', text_zh: '騷擾', topic: 'Diversity and Inclusion' },

    { id: 'CR01', text_en: 'Community Grievance', text_zh: '社區申訴', topic: 'Community Relations' },
    { id: 'CR02', text_en: 'Local Community Support', text_zh: '本地社區支援', topic: 'Community Relations' },

    { id: 'SC01', text_en: 'Supplier Risk Ranking', text_zh: '供應商風險分級', topic: 'Supply Chain Management' },
    { id: 'SC02', text_en: 'Supplier Sustainability Audit', text_zh: '供應商可持續發展審核', topic: 'Supply Chain Management' }
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