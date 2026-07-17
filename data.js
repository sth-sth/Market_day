const i18n = {
    en: {
        title: "SCoC Matching Game",
        subtitle: "Catch the Risk. Match the Right Code.",
        launchDesc: "Master the 11 key topics of CLP's Supplier Code of Conduct!",
        topicGuideBarTitle: "Before you play",
        topicGuideKicker: "CLP Supplier Code of Conduct",
        topicGuideTitle: "Topics & scenario examples",
        topicGuideIntro: "Review every SCoC topic below. Each card explains its scope and the scenario examples that can appear in the game.",
        topicGuideSectionLabel: "11 SCoC topics",
        topicGuideExamples: "Example cards",
        topicGuideReady: "Finished reviewing all 11 topics?",
        topicGuideContinue: "Continue to declaration",
        topicGuideClose: "Return to start",
        start: "Start Mission",
        shareBtn: "Share via QR",
        precheckTitle: "Supplier Declaration",
        precheckDesc: "Assume you are a supplier. Will you follow CLP's Supplier Code of Conduct (SCoC)?",
        precheckNote: "Choosing 「Willing」 allows you to bid; choosing 「Unwilling」 prevents you from CLP's bidding process through the Oracle Platform.",
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
        laptopView: "Laptop",
        modePrompt: "Choose a mode",
        modeEasy: "Easy",
        modeEasyDesc: "2 broad groups",
        modeMedium: "Standard",
        modeMediumDesc: "6 random topics",
        modeFull: "Full",
        modeFullDesc: "All 11 topics",
        durationPrompt: "Round duration",
        durationOne: "1 min",
        durationOneHint: "Focused round",
        durationTwo: "2 min",
        durationTwoHint: "More time",
        selectedDurationLabel: "Round duration"
    },
    zh: {
        title: "SCoC 配對遊戲",
        subtitle: "捕捉風險，精準配對。",
        launchDesc: "掌握 CLP 供應商行為準則的 11 大主題！",
        topicGuideBarTitle: "開始前導讀",
        topicGuideKicker: "CLP 供應商行為守則",
        topicGuideTitle: "重點主題與情境例子",
        topicGuideIntro: "先了解 SCoC 的主要主題。每張卡都說明其涵蓋範圍，以及遊戲中可能出現的情境例子。",
        topicGuideSectionLabel: "11 個 SCoC 主題",
        topicGuideExamples: "情境例子",
        topicGuideReady: "已了解全部 11 個主題？",
        topicGuideContinue: "前往供應商聲明",
        topicGuideClose: "返回開始畫面",
        start: "開始任務",
        shareBtn: "分享遊戲",
        precheckTitle: "供應商聲明",
        precheckDesc: "假設你是一名供應商，你是否願意遵守 CLP 供應商行為守則（SCoC）？",
        precheckNote: "選擇「願意」,可以參加招標;選擇「不願意」,無法通過 Oracle Platform參加 CLP 的招標。",
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
        laptopView: "桌面",
        modePrompt: "選擇難度",
        modeEasy: "簡單",
        modeEasyDesc: "2 個大分類",
        modeMedium: "中等",
        modeMediumDesc: "6 個隨機主題",
        modeFull: "最終",
        modeFullDesc: "完整 11 個主題",
        durationPrompt: "每輪時長",
        durationOne: "1 分鐘",
        durationOneHint: "快速挑戰",
        durationTwo: "2 分鐘",
        durationTwoHint: "從容配對",
        selectedDurationLabel: "本輪時長"
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
    'Legal Compliance': { id: 'leg', label_zh: '法律合規', short_en: 'Legal', short_zh: '法律', icon: '01', guideIcon: '⚖️', color: '#ea6952', description_en: 'Meet applicable laws, licences and regulatory requirements before and throughout work with CLP.', description_zh: '在與中電合作前及合作期間，符合相關法律、牌照及監管要求。' },
    'Business Ethics': { id: 'eth', label_zh: '商業道德', short_en: 'Ethics', short_zh: '道德', icon: '02', guideIcon: '🤝', color: '#e99a45', description_en: 'Act with integrity and avoid bribery, improper gifts, conflicts of interest and undue influence.', description_zh: '以誠信行事，避免賄賂、不當餽贈、利益衝突及不當影響。' },
    'Cybersecurity': { id: 'cyb', label_zh: '網絡安全', short_en: 'Cyber', short_zh: '網安', icon: '03', guideIcon: '🔐', color: '#438bc7', description_en: 'Protect CLP information, systems and digital assets from unauthorised access, misuse or loss.', description_zh: '保護中電資料、系統及數碼資產，避免未授權存取、誤用或遺失。' },
    'Quality and Safety': { id: 'qas', label_zh: '質量與安全', short_en: 'Quality', short_zh: '質安', icon: '04', guideIcon: '🛡️', color: '#3f9d82', description_en: 'Deliver products, services and work practices that meet expected quality and safety standards.', description_zh: '確保產品、服務與工作方式符合應有的質量和安全標準。' },
    'Environmental Management': { id: 'env', label_zh: '環境管理', short_en: 'Environment', short_zh: '環境', icon: '05', guideIcon: '🌿', color: '#5db56e', description_en: 'Manage resources, waste and the environmental impact of operations responsibly.', description_zh: '負責任地管理資源、廢棄物及營運對環境造成的影響。' },
    'Climate Change': { id: 'cli', label_zh: '氣候變化', short_en: 'Climate', short_zh: '氣候', icon: '06', guideIcon: '☀️', color: '#d5a53d', description_en: 'Measure, manage and reduce greenhouse-gas emissions in support of a low-carbon transition.', description_zh: '量度、管理並減少溫室氣體排放，支持低碳轉型。' },
    'Employee Health and Safety': { id: 'ehs', label_zh: '員工健康與安全', short_en: 'Workplace', short_zh: '職安', icon: '07', guideIcon: '⛑️', color: '#dc6a5e', description_en: 'Provide a safe, healthy workplace and identify and control risks from work activities.', description_zh: '提供安全健康的工作環境，識別並控制工作活動帶來的風險。' },
    'Labour Practices and Human Rights': { id: 'lab', label_zh: '勞工實務與人權', short_en: 'Labour / Rights', short_zh: '勞工人權', icon: '08', guideIcon: '✊', color: '#c65e67', description_en: 'Respect labour rights and prohibit child labour, forced labour and unfair treatment.', description_zh: '尊重勞工權益，禁止童工、強迫勞動及不公平待遇。' },
    'Diversity and Inclusion': { id: 'div', label_zh: '多元與共融', short_en: 'Inclusion', short_zh: '共融', icon: '09', guideIcon: '🌈', color: '#a66ec4', description_en: 'Build a respectful, diverse and inclusive workplace free from discrimination and harassment.', description_zh: '營造尊重、多元和共融的工作環境，防止歧視與騷擾。' },
    'Community Relations': { id: 'com', label_zh: '社區關係', short_en: 'Community', short_zh: '社區', icon: '10', guideIcon: '🏘️', color: '#4f9eb3', description_en: 'Respect community views, address grievances and support local communities responsibly.', description_zh: '尊重社區意見，妥善回應申訴，並負責任地支持本地社區。' },
    'Supply Chain Management': { id: 'sup', label_zh: '供應鏈管理', short_en: 'Supply Chain', short_zh: '供應鏈', icon: '11', guideIcon: '🔗', color: '#717cba', description_en: 'Assess and manage supply-chain risk while building sustainable partnerships with suppliers.', description_zh: '評估和管理供應鏈風險，與供應商建立可持續的合作關係。' }
};

const buckets = TOPICS.map((topic) => {
    const meta = TOPIC_META[topic];
    return {
        id: meta.id,
        label_en: topic,
        label_zh: meta.label_zh,
        short_en: meta.short_en,
        short_zh: meta.short_zh,
        icon: meta.icon,
        color: meta.color
    };
});

const EASY_BUCKETS = [
    {
        id: 'responsible-business',
        label_en: 'Responsible Business',
        label_zh: '責任營運',
        short_en: 'Business',
        short_zh: '營運',
        icon: 'A',
        color: '#e96c52',
        topics: ['leg', 'eth', 'cyb', 'qas', 'sup']
    },
    {
        id: 'people-and-planet',
        label_en: 'People & Planet',
        label_zh: '人與環境',
        short_en: 'People & Planet',
        short_zh: '人與環境',
        icon: 'B',
        color: '#3f9d82',
        topics: ['env', 'cli', 'ehs', 'lab', 'div', 'com']
    }
];

const GAME_MODES = {
    easy: { id: 'easy', labelKey: 'modeEasy', descriptionKey: 'modeEasyDesc' },
    medium: { id: 'medium', labelKey: 'modeMedium', descriptionKey: 'modeMediumDesc' },
    full: { id: 'full', labelKey: 'modeFull', descriptionKey: 'modeFullDesc' }
};

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