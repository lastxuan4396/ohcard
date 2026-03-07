const MODES = {
  focus: {
    name: "单卡聚焦",
    badge: "1 张核心洞察",
    count: 1,
    labels: ["核心线索"],
    goal: "在复杂情绪里快速抓住一个最重要的信号，适合当下卡顿、决策前的自检。",
    description: "抽 1 张，先描述，再联想，最后把洞察落到一个行动。",
    when: "时间少、问题散、需要先看清当前关键点时。",
    steps: [
      "描述你最先看到的元素，不解释意义。",
      "联想这个画面与你最近的现实事件。",
      "探究这张牌在提醒你坚持什么、放下什么。"
    ]
  },
  timeline: {
    name: "时间线三张",
    badge: "过去 / 现在 / 未来",
    count: 3,
    labels: ["过去", "现在", "未来"],
    goal: "梳理事件发展脉络，看清模式如何形成、当下卡点是什么、下一步趋势可能去向哪里。",
    description: "3 张牌按时序解读，适合职业选择、关系变化、阶段复盘。",
    when: "需要理解“我是怎么走到这一步”的时候。",
    steps: [
      "过去位：识别曾经形成的习惯、信念或情境。",
      "现在位：指出当前最真实的处境与情绪。",
      "未来位：不是预言，而是当前路径延续下的可能方向。"
    ]
  },
  mirror: {
    name: "关系镜像",
    badge: "我 / 对方 / 连接",
    count: 3,
    labels: ["我", "对方", "连接桥梁"],
    goal: "帮助你看见关系里的双向投射，避免只站在单一视角理解冲突。",
    description: "从双方与关系本身三个角度看同一议题。",
    when: "沟通不顺、关系拉扯、想修复互动质量时。",
    steps: [
      "我位：我带着怎样的期待、担忧和防御。",
      "对方位：对方可能在保护什么、表达什么。",
      "桥梁位：关系需要建立什么新规则或新沟通方式。"
    ]
  },
  diamond: {
    name: "四维钻石",
    badge: "事实 / 感受 / 需求 / 行动",
    count: 4,
    labels: ["事实", "感受", "需求", "行动"],
    goal: "把模糊问题拆成可行动结构，避免一直停留在情绪旋涡。",
    description: "常用于高压情境、拖延循环、职业选择焦虑。",
    when: "你知道有问题，但不知道怎么落地解决时。",
    steps: [
      "事实位：确认客观发生了什么，不做评价。",
      "感受位：承认真实情绪，而不是压抑。",
      "需求位：厘清被忽略的核心需要。",
      "行动位：给出 72 小时内可执行的最小动作。"
    ]
  },
  strategy: {
    name: "五点策略阵",
    badge: "现状 / 资源 / 阻碍 / 突破 / 下一步",
    count: 5,
    labels: ["现状", "资源", "阻碍", "突破口", "下一步"],
    goal: "把问题从“我很乱”变成“我知道下一步怎么做”，适合目标推进和阶段规划。",
    description: "强调资源盘点与障碍转化，结果导向很强。",
    when: "你准备行动，需要具体策略地图时。",
    steps: [
      "现状位：定义你眼前的真实挑战。",
      "资源位：列出你已经拥有但未充分使用的支持。",
      "阻碍位：识别最关键的内外阻力。",
      "突破口位：找到可以撬动局面的杠杆点。",
      "下一步位：写下今天就能执行的动作。"
    ]
  }
};

const DECK_TYPES = {
  pair: {
    name: "图字配对",
    desc: "每个位置抽 1 张图卡 + 1 张字卡"
  },
  image: {
    name: "图卡模式",
    desc: "只抽图卡，强化画面联想"
  },
  word: {
    name: "字卡模式",
    desc: "只抽字卡，强化语义触发"
  }
};

const LAYOUT_DIRECTIONS = {
  up: {
    name: "上",
    desc: "整体 0°",
    rotationClass: "rot-0"
  },
  right: {
    name: "右",
    desc: "整体 90°",
    rotationClass: "rot-90"
  },
  down: {
    name: "下",
    desc: "整体 180°",
    rotationClass: "rot-180"
  },
  left: {
    name: "左",
    desc: "整体 270°",
    rotationClass: "rot-270"
  }
};

const ROTATION_CLASSES = ["rot-0", "rot-90", "rot-180", "rot-270"];

const PROMPT_LAYERS = [
  {
    id: "description",
    name: "描述性问题",
    hint: "先描述眼前画面，不急着解释含义。把“看到什么”与“它像什么”分开说。"
  },
  {
    id: "association",
    name: "联想性问题",
    hint: "把牌面连接到你的真实生活和成长经验，找到反复出现的场景模式。"
  },
  {
    id: "inquiry",
    name: "探究性问题",
    hint: "进入情绪和需求层面，找出你真正想改变的部分与行动方向。"
  }
];

const PROMPT_POOL = {
  description: [
    "你看到了什么？",
    "看上去像什么？",
    "你认为这是什么？",
    "最先吸引你注意力的是哪个元素？",
    "如果用三个词描述这张牌，你会怎么说？"
  ],
  association: [
    "这使你想起什么？",
    "这是你生活里经常见过的场景吗？",
    "这在你成长经历中有类似的情境么？",
    "它像你最近哪个真实事件的缩影？",
    "这张牌让你想到哪段关系或角色？"
  ],
  inquiry: [
    "你的感觉是什么？",
    "在这个情境中你的感受是什么？",
    "你最想保护的需求是什么？",
    "如果这张牌在提醒你一件事，那会是什么？",
    "你愿意为改变做的第一个动作是什么？"
  ]
};

const DEFAULT_WORD_DECK = [
  { name: "钥匙", glyph: "✦", tone: "sand", keywords: ["开启", "机会", "方法"], cue: "眼前某扇门需要主动试探，而不是等待许可。" },
  { name: "桥", glyph: "▤", tone: "ocean", keywords: ["连接", "过渡", "对话"], cue: "两端都存在价值，重点是如何搭建可通行的路径。" },
  { name: "门", glyph: "▣", tone: "sand", keywords: ["边界", "进出", "抉择"], cue: "不是所有门都要进，关键是你要对入口负责。" },
  { name: "镜子", glyph: "◍", tone: "night", keywords: ["投射", "自我", "觉察"], cue: "你看到的他人反应，可能也在映照自己的状态。" },
  { name: "楼梯", glyph: "⋰", tone: "moss", keywords: ["进阶", "过程", "耐心"], cue: "真正的变化像爬楼梯，不是一次跃迁。" },
  { name: "迷宫", glyph: "⌘", tone: "night", keywords: ["复杂", "试错", "方向"], cue: "你不是没能力，而是需要新的观察路径。" },
  { name: "灯塔", glyph: "⚑", tone: "ocean", keywords: ["指引", "稳定", "信号"], cue: "你可以先做那个最稳定、最可见的动作。" },
  { name: "船", glyph: "⛵", tone: "ocean", keywords: ["旅程", "承载", "探索"], cue: "离岸是风险，也是成长必要阶段。" },
  { name: "雨伞", glyph: "☂", tone: "night", keywords: ["保护", "边界", "照顾"], cue: "请区分真实风险与想象中的灾难。" },
  { name: "风筝", glyph: "◬", tone: "fire", keywords: ["理想", "牵引", "平衡"], cue: "自由需要一条稳定的线来支撑高度。" },
  { name: "树", glyph: "✳", tone: "moss", keywords: ["扎根", "成长", "生命力"], cue: "先照顾根系，再谈枝叶的扩展。" },
  { name: "种子", glyph: "•", tone: "moss", keywords: ["起点", "潜力", "等待"], cue: "你正在做的事还在发芽期，不必急于结果。" },
  { name: "石头", glyph: "◼", tone: "night", keywords: ["现实", "重量", "沉着"], cue: "让你不舒服的限制，也可能是稳定支点。" },
  { name: "河流", glyph: "≈", tone: "ocean", keywords: ["流动", "顺势", "变化"], cue: "对抗流向会消耗，你可以找更顺势的走法。" },
  { name: "山峰", glyph: "▲", tone: "sand", keywords: ["目标", "挑战", "视野"], cue: "越接近目标越需要节奏，而不是蛮力。" },
  { name: "时钟", glyph: "◴", tone: "night", keywords: ["节奏", "期限", "优先级"], cue: "你要先决定什么重要，再安排时间。" },
  { name: "地图", glyph: "⌖", tone: "sand", keywords: ["路径", "定位", "决策"], cue: "先确认你在哪，再决定去哪里。" },
  { name: "背包", glyph: "▢", tone: "sand", keywords: ["资源", "准备", "负担"], cue: "不是带得越多越安全，轻装也能更远。" },
  { name: "猫", glyph: "◠", tone: "moss", keywords: ["直觉", "敏感", "独立"], cue: "信号很细微，但你的身体已经先感知到了。" },
  { name: "鸟", glyph: "⌯", tone: "ocean", keywords: ["视角", "自由", "迁移"], cue: "抬高视角后，困境会呈现不同结构。" },
  { name: "杯子", glyph: "◖", tone: "sand", keywords: ["容纳", "情绪", "关系"], cue: "先看容器是否够稳，再决定要装什么。" },
  { name: "锁", glyph: "⛒", tone: "night", keywords: ["限制", "安全", "秘密"], cue: "你在保护重要东西，同时也可能困住自己。" },
  { name: "火焰", glyph: "♨", tone: "fire", keywords: ["热情", "转化", "能量"], cue: "这股能量需要出口，否则会反噬。" },
  { name: "窗", glyph: "▦", tone: "ocean", keywords: ["观察", "机会", "边界"], cue: "你不必立刻跳出去，先看清外部环境。" },
  { name: "路标", glyph: "➤", tone: "sand", keywords: ["方向", "选择", "提示"], cue: "答案可能早就在路上，只是你没停下来读它。" },
  { name: "面具", glyph: "◑", tone: "night", keywords: ["角色", "防御", "真实"], cue: "你戴着的角色帮过你，也可能限制了你。" },
  { name: "沙漏", glyph: "⌛", tone: "sand", keywords: ["等待", "过程", "节律"], cue: "有些事不是拖延，而是还在沉淀周期里。" },
  { name: "剪刀", glyph: "✂", tone: "fire", keywords: ["切断", "聚焦", "取舍"], cue: "清晰来自删减，不来自叠加。" },
  { name: "线团", glyph: "∞", tone: "moss", keywords: ["纠缠", "线索", "梳理"], cue: "慢慢拉开线头，你会找到可解的起点。" },
  { name: "指南针", glyph: "✪", tone: "ocean", keywords: ["方向感", "价值", "校准"], cue: "先定义你的北方，再决定速度。" },
  { name: "锚", glyph: "⚓", tone: "night", keywords: ["稳定", "落地", "停靠"], cue: "你可以先让自己稳定，再处理外部波浪。" },
  { name: "隧道", glyph: "◍", tone: "night", keywords: ["未知", "过渡", "勇气"], cue: "黑暗阶段不等于走错，可能只是未见出口。" },
  { name: "花园", glyph: "✿", tone: "moss", keywords: ["滋养", "关系", "长期"], cue: "你投入在哪里，哪里就会慢慢繁盛。" },
  { name: "舞台", glyph: "▵", tone: "fire", keywords: ["表达", "看见", "影响"], cue: "被看见并不危险，压抑表达才会积压能量。" },
  { name: "信封", glyph: "✉", tone: "sand", keywords: ["消息", "沟通", "澄清"], cue: "把想法说清楚，比猜测更省力。" },
  { name: "电话", glyph: "☎", tone: "ocean", keywords: ["联系", "回应", "连接"], cue: "一通真实沟通可能比长时间内耗更有效。" },
  { name: "帆", glyph: "⧉", tone: "ocean", keywords: ["风向", "调整", "推进"], cue: "改变角度比硬顶风阻更有用。" },
  { name: "羽毛", glyph: "❧", tone: "moss", keywords: ["轻盈", "灵感", "感受"], cue: "不是每个决定都要沉重，你也可以轻一点。" },
  { name: "相机", glyph: "◉", tone: "night", keywords: ["聚焦", "叙事", "取景"], cue: "你选择看见什么，就会放大什么。" },
  { name: "火车", glyph: "▣", tone: "fire", keywords: ["轨道", "惯性", "时机"], cue: "先上车再微调路线，也是一种策略。" },
  { name: "轮盘", glyph: "◎", tone: "sand", keywords: ["循环", "概率", "选择"], cue: "重复不是命运，而是未更新的选择机制。" },
  { name: "云", glyph: "☁", tone: "ocean", keywords: ["情绪", "模糊", "变化"], cue: "不清楚不是错误，它提醒你先停下来感受。" },
  { name: "小路", glyph: "⤳", tone: "moss", keywords: ["探索", "试步", "弹性"], cue: "先走出一小步，路会边走边显现。" },
  { name: "灯", glyph: "✺", tone: "fire", keywords: ["看见", "清晰", "勇气"], cue: "当你照亮盲区，选择会自然变清晰。" },
  { name: "帘幕", glyph: "▧", tone: "night", keywords: ["遮蔽", "等待", "揭示"], cue: "此刻不必强行揭开一切，节奏同样重要。" },
  { name: "望远镜", glyph: "⎈", tone: "ocean", keywords: ["远景", "格局", "规划"], cue: "你需要看更远，才能理解当下动作的价值。" },
  { name: "画框", glyph: "▢", tone: "sand", keywords: ["边界", "定义", "意义"], cue: "改变框架，你对问题的解释会一起改变。" },
  { name: "琴弦", glyph: "𝄞", tone: "moss", keywords: ["张力", "共振", "调音"], cue: "不是越紧越好，合适张力才有好声音。" },
  { name: "拼图", glyph: "▱", tone: "sand", keywords: ["整合", "碎片", "全局"], cue: "缺失的一块会在行动中出现，不只在思考里出现。" },
  { name: "天秤", glyph: "⚖", tone: "night", keywords: ["平衡", "判断", "取舍"], cue: "你可以接受权衡，而不是追求完美兼得。" },
  { name: "钥匙孔", glyph: "◌", tone: "fire", keywords: ["入口", "视角", "专注"], cue: "先从一个小入口切入，局面就会开始松动。" }
].map((card) => normalizeWordCard(card));

const IMAGE_SCENE_POOL = [
  { name: "清晨窗台", tone: "sand", symbol: "□", colors: ["#efd8ad", "#f9f3e8", "#d69f64"], keywords: ["安静", "观察"], cue: "也许你只需要静下来观察，而不是立刻定论。" },
  { name: "雨中街口", tone: "ocean", symbol: "◇", colors: ["#87b7c5", "#d7ebf1", "#4f7994"], keywords: ["流动", "选择"], cue: "你站在岔路口，先判断方向再迈步会更稳。" },
  { name: "夜色楼梯", tone: "night", symbol: "△", colors: ["#7f879f", "#d7dae6", "#4e5568"], keywords: ["进阶", "过程"], cue: "黑暗里也有台阶，重点是一步一步向上。" },
  { name: "旧港船坞", tone: "ocean", symbol: "◌", colors: ["#82a7a3", "#d5ebe8", "#436d67"], keywords: ["停靠", "启航"], cue: "你可以先停靠整顿，再出发不迟。" },
  { name: "黄昏山坡", tone: "sand", symbol: "▲", colors: ["#e5b880", "#f7e2c7", "#ac7441"], keywords: ["视野", "目标"], cue: "把目光放远，眼前阻力就不再是全部。" },
  { name: "镜湖倒影", tone: "ocean", symbol: "◎", colors: ["#79adb5", "#def0f2", "#4f7f84"], keywords: ["投射", "自我"], cue: "你看到的画面，也许是内心的倒影。" },
  { name: "荒野灯塔", tone: "fire", symbol: "✶", colors: ["#edb180", "#ffe8d1", "#c37740"], keywords: ["信号", "方向"], cue: "先点亮一盏灯，你就有了方向锚点。" },
  { name: "古桥薄雾", tone: "night", symbol: "⊓", colors: ["#9b9fa9", "#e8eaef", "#6f7480"], keywords: ["连接", "过渡"], cue: "你正在过桥，别把雾当成终点。" },
  { name: "林间小径", tone: "moss", symbol: "≈", colors: ["#8ab082", "#e2f0de", "#5f8157"], keywords: ["探索", "弹性"], cue: "路未必一开始就清晰，走着走着才会显现。" },
  { name: "旧城广场", tone: "sand", symbol: "▦", colors: ["#d7b093", "#f7eadd", "#986e4e"], keywords: ["关系", "互动"], cue: "问题常发生在人与人的互动结构里。" },
  { name: "沙丘风线", tone: "sand", symbol: "⋯", colors: ["#ebc48f", "#fbeedb", "#bd8d4f"], keywords: ["时间", "痕迹"], cue: "时间会留下纹理，你需要读取这些变化。" },
  { name: "晨雾花园", tone: "moss", symbol: "✿", colors: ["#a4c895", "#edf5e8", "#6f9961"], keywords: ["滋养", "长期"], cue: "长期被滋养的关系，会慢慢开花。" },
  { name: "深夜车站", tone: "night", symbol: "⧉", colors: ["#8a93ac", "#e3e6f2", "#5b6177"], keywords: ["等待", "转场"], cue: "等待不是停滞，可能是在换乘。" },
  { name: "风中高塔", tone: "fire", symbol: "✧", colors: ["#e6aa75", "#fce8d6", "#af6734"], keywords: ["稳定", "适应"], cue: "稳定不是不动，而是能在风中调整。" },
  { name: "午后河岸", tone: "ocean", symbol: "∿", colors: ["#86b7b1", "#dff1ee", "#588b85"], keywords: ["顺势", "变化"], cue: "与其对抗流向，不如找到顺势路线。" },
  { name: "云上观景", tone: "ocean", symbol: "☁", colors: ["#98bed0", "#eaf3f9", "#5f87a4"], keywords: ["远景", "抽离"], cue: "拉高视角后，细节会重新排列。" },
  { name: "舞台幕布", tone: "fire", symbol: "▵", colors: ["#e89f82", "#fde7dd", "#bf6140"], keywords: ["表达", "看见"], cue: "你可以尝试更真实地表达，而不是只演角色。" },
  { name: "断崖回声", tone: "night", symbol: "◢", colors: ["#8e9099", "#e5e6ea", "#5f626d"], keywords: ["边界", "风险"], cue: "先确认边界，再做跃迁。" },
  { name: "曙光平原", tone: "moss", symbol: "✺", colors: ["#b3cb95", "#f0f7e7", "#7a9861"], keywords: ["希望", "起点"], cue: "再小的光，也可以成为重新开始的信号。" },
  { name: "旧书房间", tone: "sand", symbol: "▤", colors: ["#dcb28d", "#f8e8db", "#9e6f4f"], keywords: ["记忆", "整理"], cue: "过去的经验需要被重新整理，而不是堆积。" },
  { name: "海边栈桥", tone: "ocean", symbol: "⛶", colors: ["#78a8bf", "#dcebf3", "#4f7489"], keywords: ["连接", "选择"], cue: "选择不是对错，而是你愿意走哪段栈桥。" },
  { name: "森林转角", tone: "moss", symbol: "⤳", colors: ["#95bc8d", "#e7f2e3", "#678d5f"], keywords: ["线索", "转机"], cue: "转角处未必是终点，也可能是转机。" },
  { name: "微光隧道", tone: "night", symbol: "◉", colors: ["#8891ab", "#dfe2ee", "#5a6278"], keywords: ["未知", "勇气"], cue: "看不到全貌时，先走向微光。" },
  { name: "风筝草地", tone: "fire", symbol: "◬", colors: ["#e5b07f", "#fae8d8", "#b97943"], keywords: ["自由", "牵引"], cue: "自由和牵引不是对立，可以同时存在。" }
];

const DEFAULT_IMAGE_DECK = IMAGE_SCENE_POOL.map((scene) => normalizeImageCard({
  name: scene.name,
  tone: scene.tone,
  keywords: scene.keywords,
  cue: scene.cue,
  image: buildSceneImage(scene)
}));

const STORAGE_KEY = "oh-card-lab-history-v1";
const CUSTOM_DECK_STORAGE_KEY = "oh-card-custom-decks-v1";
const OVERLAY_TUNE_STORAGE_KEY = "oh-card-overlay-tune-v1";
const BUNDLED_IMAGE_DECK_PATH = "./data/oh-image-deck.json";
const BUNDLED_WORD_DECK_PATH = "./data/oh-word-deck.json";

const DEFAULT_OVERLAY_TUNE = {
  left: 11.8,
  right: 11.8,
  top: 12.6,
  bottom: 10.8
};

const refs = {
  questionInput: document.getElementById("questionInput"),
  modeBadge: document.getElementById("modeBadge"),
  modeSwitch: document.getElementById("modeSwitch"),
  deckTypeSwitch: document.getElementById("deckTypeSwitch"),
  layoutDirectionSwitch: document.getElementById("layoutDirectionSwitch"),
  deckStatus: document.getElementById("deckStatus"),
  overlayLeftInput: document.getElementById("overlayLeftInput"),
  overlayRightInput: document.getElementById("overlayRightInput"),
  overlayTopInput: document.getElementById("overlayTopInput"),
  overlayBottomInput: document.getElementById("overlayBottomInput"),
  overlayLeftValue: document.getElementById("overlayLeftValue"),
  overlayRightValue: document.getElementById("overlayRightValue"),
  overlayTopValue: document.getElementById("overlayTopValue"),
  overlayBottomValue: document.getElementById("overlayBottomValue"),
  resetOverlayBtn: document.getElementById("resetOverlayBtn"),
  importImageDeckBtn: document.getElementById("importImageDeckBtn"),
  importWordDeckBtn: document.getElementById("importWordDeckBtn"),
  importImageDeckInput: document.getElementById("importImageDeckInput"),
  importWordDeckInput: document.getElementById("importWordDeckInput"),
  resetDeckBtn: document.getElementById("resetDeckBtn"),
  drawBtn: document.getElementById("drawBtn"),
  reshuffleBtn: document.getElementById("reshuffleBtn"),
  immersiveBtn: document.getElementById("immersiveBtn"),
  deck: document.getElementById("deck"),
  spreadSummary: document.getElementById("spreadSummary"),
  spreadBoard: document.getElementById("spreadBoard"),
  modeGoal: document.getElementById("modeGoal"),
  modeSteps: document.getElementById("modeSteps"),
  promptTabs: document.getElementById("promptTabs"),
  promptHint: document.getElementById("promptHint"),
  promptList: document.getElementById("promptList"),
  regenPromptBtn: document.getElementById("regenPromptBtn"),
  copyReportBtn: document.getElementById("copyReportBtn"),
  noteInput: document.getElementById("noteInput"),
  saveNoteBtn: document.getElementById("saveNoteBtn"),
  clearNoteBtn: document.getElementById("clearNoteBtn"),
  exportPngBtn: document.getElementById("exportPngBtn"),
  exportPdfBtn: document.getElementById("exportPdfBtn"),
  historyList: document.getElementById("historyList"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  playbookGrid: document.getElementById("playbookGrid"),
  timerMinutes: document.getElementById("timerMinutes"),
  timerToggle: document.getElementById("timerToggle"),
  timerText: document.getElementById("timerText"),
  imagePreviewModal: document.getElementById("imagePreviewModal"),
  previewCloseBtn: document.getElementById("previewCloseBtn"),
  previewImage: document.getElementById("previewImage"),
  previewPairWrap: document.getElementById("previewPairWrap"),
  previewPairViewport: document.getElementById("previewPairViewport"),
  previewPairComposite: document.getElementById("previewPairComposite"),
  previewPairImage: document.getElementById("previewPairImage"),
  previewPairWord: document.getElementById("previewPairWord"),
  previewPairTools: document.getElementById("previewPairTools"),
  previewRotateLeftBtn: document.getElementById("previewRotateLeftBtn"),
  previewRotateRightBtn: document.getElementById("previewRotateRightBtn"),
  previewSyncRotation: document.getElementById("previewSyncRotation"),
  previewTitle: document.getElementById("previewTitle")
};

const state = {
  modeId: "focus",
  deckTypeId: "pair",
  layoutDirection: "up",
  layerId: "description",
  drawVersion: 0,
  isDrawing: false,
  currentCards: [],
  currentSession: null,
  history: loadHistory(),
  wordDeck: cloneCards(DEFAULT_WORD_DECK),
  imageDeck: cloneCards(DEFAULT_IMAGE_DECK),
  deckSource: {
    word: "built-in",
    image: "built-in"
  },
  overlayTune: { ...DEFAULT_OVERLAY_TUNE },
  immersive: false,
  previewSourceViewport: null,
  preloadedImageUrls: new Set(),
  bundledWebpAvailable: false,
  timer: {
    duration: 180,
    remaining: 180,
    running: false,
    intervalId: null
  }
};

init();

function init() {
  hydrateCustomDecks();
  hydrateOverlayTune();
  renderModeSwitch();
  renderModeDetail();
  renderDeckTypeSwitch();
  renderLayoutDirectionSwitch();
  renderDeckStatus();
  renderOverlayTuneControls();
  renderPromptTabs();
  renderPlaybook();
  renderHistory();
  applyOverlayTuneToElement(refs.previewPairComposite);
  setSummary("已启用图卡 + 字卡玩法。你可以直接抽，也可以先导入自己的卡组。", false);
  bindEvents();
  updateTimerDisplay();
  autoLoadBundledDecks();
  setupPreviewPairGestures();
  warmupPreload();
}

function bindEvents() {
  refs.modeSwitch.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-mode]");
    if (!button) {
      return;
    }
    setMode(button.dataset.mode);
  });

  refs.deckTypeSwitch.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-deck-type]");
    if (!button) {
      return;
    }
    setDeckType(button.dataset.deckType);
  });

  refs.layoutDirectionSwitch.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-layout-direction]");
    if (!button) {
      return;
    }
    setLayoutDirection(button.dataset.layoutDirection);
  });

  refs.promptTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-layer]");
    if (!button) {
      return;
    }
    state.layerId = button.dataset.layer;
    renderPromptTabs();
    renderPrompts();
  });

  refs.drawBtn.addEventListener("click", runDraw);
  refs.reshuffleBtn.addEventListener("click", resetBoard);
  refs.regenPromptBtn.addEventListener("click", renderPrompts);
  refs.saveNoteBtn.addEventListener("click", saveCurrentNote);
  refs.clearNoteBtn.addEventListener("click", () => {
    refs.noteInput.value = "";
  });
  refs.exportPngBtn.addEventListener("click", () => exportSessionAsset("png"));
  refs.exportPdfBtn.addEventListener("click", () => exportSessionAsset("pdf"));
  refs.copyReportBtn.addEventListener("click", copyCurrentReport);
  refs.clearHistoryBtn.addEventListener("click", clearHistory);
  refs.historyList.addEventListener("click", handleHistoryAction);
  refs.deck.addEventListener("click", runDraw);
  refs.spreadBoard.addEventListener("click", handlePreviewImageClick);
  refs.timerToggle.addEventListener("click", toggleTimer);
  refs.immersiveBtn.addEventListener("click", toggleImmersiveMode);

  refs.overlayLeftInput.addEventListener("input", () => updateOverlayTune("left", refs.overlayLeftInput.value));
  refs.overlayRightInput.addEventListener("input", () => updateOverlayTune("right", refs.overlayRightInput.value));
  refs.overlayTopInput.addEventListener("input", () => updateOverlayTune("top", refs.overlayTopInput.value));
  refs.overlayBottomInput.addEventListener("input", () => updateOverlayTune("bottom", refs.overlayBottomInput.value));
  refs.resetOverlayBtn.addEventListener("click", resetOverlayTuneToDefault);

  refs.importImageDeckBtn.addEventListener("click", () => {
    refs.importImageDeckInput.click();
  });
  refs.importWordDeckBtn.addEventListener("click", () => {
    refs.importWordDeckInput.click();
  });
  refs.importImageDeckInput.addEventListener("change", (event) => {
    importDeckFromFile(event.target.files[0], "image");
    event.target.value = "";
  });
  refs.importWordDeckInput.addEventListener("change", (event) => {
    importDeckFromFile(event.target.files[0], "word");
    event.target.value = "";
  });
  refs.resetDeckBtn.addEventListener("click", resetDecksToBuiltIn);

  refs.previewCloseBtn.addEventListener("click", closeImagePreview);
  refs.previewRotateLeftBtn.addEventListener("click", () => rotatePreviewPair(-1));
  refs.previewRotateRightBtn.addEventListener("click", () => rotatePreviewPair(1));
  refs.imagePreviewModal.addEventListener("click", (event) => {
    if (event.target === refs.imagePreviewModal || event.target.dataset.action === "close") {
      closeImagePreview();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !refs.imagePreviewModal.hidden) {
      closeImagePreview();
    }
    if (event.key === "Escape" && state.immersive) {
      toggleImmersiveMode(false);
    }
  });
}

function renderModeSwitch() {
  refs.modeSwitch.innerHTML = "";
  Object.entries(MODES).forEach(([modeId, mode]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-btn ${modeId === state.modeId ? "active" : ""}`;
    button.dataset.mode = modeId;
    button.innerHTML = `<strong>${mode.name}</strong><span>${mode.description}</span>`;
    refs.modeSwitch.appendChild(button);
  });
  refs.modeBadge.textContent = `${MODES[state.modeId].badge} / ${DECK_TYPES[state.deckTypeId].name} / ${LAYOUT_DIRECTIONS[state.layoutDirection].name}`;
}

function renderDeckTypeSwitch() {
  refs.deckTypeSwitch.innerHTML = "";
  Object.entries(DECK_TYPES).forEach(([deckTypeId, deckType]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `deck-type-btn ${deckTypeId === state.deckTypeId ? "active" : ""}`;
    button.dataset.deckType = deckTypeId;
    button.innerHTML = `<strong>${deckType.name}</strong><span>${deckType.desc}</span>`;
    refs.deckTypeSwitch.appendChild(button);
  });
}

function renderLayoutDirectionSwitch() {
  refs.layoutDirectionSwitch.innerHTML = "";
  Object.entries(LAYOUT_DIRECTIONS).forEach(([directionId, direction]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `direction-btn ${directionId === state.layoutDirection ? "active" : ""}`;
    button.dataset.layoutDirection = directionId;
    button.innerHTML = `<strong>${direction.name}</strong><span>${direction.desc}</span>`;
    refs.layoutDirectionSwitch.appendChild(button);
  });
}

function renderDeckStatus() {
  const sourceLabel = {
    custom: "已导入",
    bundled: "实卡包",
    "built-in": "内置"
  };
  const wordSource = sourceLabel[state.deckSource.word] || "内置";
  const imageSource = sourceLabel[state.deckSource.image] || "内置";
  refs.deckStatus.textContent = `字卡 ${state.wordDeck.length} 张（${wordSource}） / 图卡 ${state.imageDeck.length} 张（${imageSource}）`;
}

function renderOverlayTuneControls() {
  refs.overlayLeftInput.value = String(state.overlayTune.left);
  refs.overlayRightInput.value = String(state.overlayTune.right);
  refs.overlayTopInput.value = String(state.overlayTune.top);
  refs.overlayBottomInput.value = String(state.overlayTune.bottom);
  refs.overlayLeftValue.textContent = `${state.overlayTune.left.toFixed(1)}%`;
  refs.overlayRightValue.textContent = `${state.overlayTune.right.toFixed(1)}%`;
  refs.overlayTopValue.textContent = `${state.overlayTune.top.toFixed(1)}%`;
  refs.overlayBottomValue.textContent = `${state.overlayTune.bottom.toFixed(1)}%`;
}

function updateOverlayTune(key, value) {
  if (!(key in state.overlayTune)) {
    return;
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return;
  }
  state.overlayTune[key] = Math.round(numeric * 10) / 10;
  renderOverlayTuneControls();
  persistOverlayTune();
  refreshOverlayTuneStyles();
}

function resetOverlayTuneToDefault() {
  state.overlayTune = { ...DEFAULT_OVERLAY_TUNE };
  renderOverlayTuneControls();
  persistOverlayTune();
  refreshOverlayTuneStyles();
  setSummary("已恢复图三复刻默认比例。", false);
}

function applyOverlayTuneToElement(element) {
  if (!element) {
    return;
  }
  element.style.setProperty("--overlay-left", `${state.overlayTune.left}%`);
  element.style.setProperty("--overlay-right", `${state.overlayTune.right}%`);
  element.style.setProperty("--overlay-top", `${state.overlayTune.top}%`);
  element.style.setProperty("--overlay-bottom", `${state.overlayTune.bottom}%`);
}

function refreshOverlayTuneStyles() {
  document.querySelectorAll(".pair-composite").forEach((element) => {
    applyOverlayTuneToElement(element);
  });
  applyOverlayTuneToElement(refs.previewPairComposite);
}

function renderModeDetail() {
  const mode = MODES[state.modeId];
  refs.modeGoal.textContent = mode.goal;
  refs.modeSteps.innerHTML = "";
  mode.steps.forEach((stepText) => {
    const item = document.createElement("li");
    item.textContent = stepText;
    refs.modeSteps.appendChild(item);
  });
}

function renderPromptTabs() {
  refs.promptTabs.innerHTML = "";
  PROMPT_LAYERS.forEach((layer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `prompt-tab ${layer.id === state.layerId ? "active" : ""}`;
    button.dataset.layer = layer.id;
    button.textContent = layer.name;
    refs.promptTabs.appendChild(button);
  });
  const layer = PROMPT_LAYERS.find((entry) => entry.id === state.layerId);
  refs.promptHint.textContent = layer ? layer.hint : "";
}

function renderPlaybook() {
  refs.playbookGrid.innerHTML = "";
  Object.values(MODES).forEach((mode) => {
    const box = document.createElement("article");
    box.className = "playbook-item";
    const title = document.createElement("h3");
    title.textContent = `${mode.name} (${mode.count} 张)`;
    const when = document.createElement("p");
    when.textContent = `适用场景：${mode.when}`;
    const labels = document.createElement("p");
    labels.textContent = `位置定义：${mode.labels.join(" / ")}`;
    const steps = document.createElement("ol");
    mode.steps.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      steps.appendChild(item);
    });
    box.append(title, when, labels, steps);
    refs.playbookGrid.appendChild(box);
  });
}

function runDraw() {
  if (state.isDrawing) {
    return;
  }

  const mode = MODES[state.modeId];
  if (!ensureDeckReady(mode.count)) {
    return;
  }

  const cards = drawCards(mode.count);
  const drawToken = Date.now();
  state.drawVersion = drawToken;
  state.isDrawing = true;

  refs.drawBtn.disabled = true;
  refs.deck.classList.remove("shuffling");
  void refs.deck.offsetWidth;
  refs.deck.classList.add("shuffling");

  setTimeout(() => {
    if (state.drawVersion !== drawToken) {
      return;
    }
    refs.deck.classList.remove("shuffling");
    state.currentCards = cards;
    state.layerId = "description";
    renderPromptTabs();
    renderSpread(cards, mode.labels);
    renderPrompts();

    const session = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      time: new Date().toISOString(),
      modeId: state.modeId,
      deckTypeId: state.deckTypeId,
      layoutDirection: state.layoutDirection,
      question: refs.questionInput.value.trim(),
      cards,
      note: ""
    };

    state.currentSession = session;
    refs.noteInput.value = "";
    prependHistory(session);
    setSummary(
      `已完成「${mode.name} / ${DECK_TYPES[state.deckTypeId].name}」抽卡：${cards.map((card) => getCardShortName(card)).join(" / ")}`,
      false
    );
    preloadCards(cards);
    preloadNextRoundCandidates(mode.count);
    refs.drawBtn.disabled = false;
    state.isDrawing = false;
  }, 860);
}

function ensureDeckReady(count) {
  if (state.deckTypeId === "pair") {
    if (state.wordDeck.length < count || state.imageDeck.length < count) {
      setSummary(`当前玩法需要至少 ${count} 张图卡和 ${count} 张字卡，请先导入卡组或切换卡组模式。`, true);
      return false;
    }
    return true;
  }
  if (state.deckTypeId === "image" && state.imageDeck.length < count) {
    setSummary(`当前玩法需要至少 ${count} 张图卡，当前只有 ${state.imageDeck.length} 张。`, true);
    return false;
  }
  if (state.deckTypeId === "word" && state.wordDeck.length < count) {
    setSummary(`当前玩法需要至少 ${count} 张字卡，当前只有 ${state.wordDeck.length} 张。`, true);
    return false;
  }
  return true;
}

function drawCards(count) {
  if (state.deckTypeId === "pair") {
    const words = pickUnique(state.wordDeck, count);
    const images = pickUnique(state.imageDeck, count);
    return words.map((wordCard, index) => {
      const imageCard = images[index];
      return {
        kind: "pair",
        name: `${wordCard.name} × ${imageCard.name}`,
        tone: normalizeTone(imageCard.tone || wordCard.tone),
        keywords: uniqueValues([...(wordCard.keywords || []), ...(imageCard.keywords || [])]),
        cue: [imageCard.cue, wordCard.cue].filter(Boolean).join(" "),
        imageCard: { ...imageCard, kind: "image" },
        wordCard: { ...wordCard, kind: "word" }
      };
    });
  }

  if (state.deckTypeId === "image") {
    return pickUnique(state.imageDeck, count).map((card) => ({ ...card, kind: "image" }));
  }

  return pickUnique(state.wordDeck, count).map((card) => ({ ...card, kind: "word" }));
}

function renderSpread(cards, slotLabels) {
  refs.spreadBoard.className = "spread-board";
  const cols = Math.min(cards.length, 5);
  refs.spreadBoard.classList.add(`cols-${cols}`);
  refs.spreadBoard.innerHTML = "";

  cards.forEach((card, index) => {
    const tile = document.createElement("article");
    tile.className = `card-tile ${getCardKind(card)}-card`;
    tile.style.setProperty("--delay", `${index * 120}ms`);

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const backLabel = document.createElement("span");
    backLabel.textContent = state.deckTypeId === "pair" ? "OH+" : "OH";
    back.appendChild(backLabel);

    const front = document.createElement("div");
    front.className = `card-face card-front ${normalizeTone(card.tone)} ${getCardKind(card)}-front`;

    fillCardFront(front, card, slotLabels[index] || `位置 ${index + 1}`);

    tile.append(back, front);
    refs.spreadBoard.appendChild(tile);

    setTimeout(() => {
      tile.classList.add("revealed");
    }, 80 + index * 120);
  });
}

function fillCardFront(front, card, slotLabel) {
  const slot = document.createElement("p");
  slot.className = "slot-label";
  slot.textContent = `${slotLabel} / ${getCardKindName(card)}`;
  front.appendChild(slot);

  if (getCardKind(card) === "pair") {
    const pairTitle = document.createElement("h3");
    pairTitle.className = "card-title";
    pairTitle.textContent = `${card.imageCard.name} + ${card.wordCard.name}`;

    const pairViewport = document.createElement("div");
    pairViewport.className = "pair-viewport";
    applyPairRotation(pairViewport, directionToQuarter(state.layoutDirection));

    const pairComposite = document.createElement("div");
    pairComposite.className = "pair-composite";
    applyOverlayTuneToElement(pairComposite);

    const wordBase = document.createElement("div");
    wordBase.className = "pair-word-base";
    if (card.wordCard.image) {
      const wordImage = document.createElement("img");
      wordImage.src = card.wordCard.image;
      wordImage.alt = card.wordCard.name;
      wordImage.loading = "lazy";
      wordBase.appendChild(wordImage);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "pair-word-fallback";
      fallback.textContent = card.wordCard.name;
      wordBase.appendChild(fallback);
    }

    const imageOverlay = document.createElement("div");
    imageOverlay.className = "pair-image-overlay";
    const image = document.createElement("img");
    image.src = card.imageCard.image;
    image.alt = card.imageCard.name;
    image.loading = "lazy";
    imageOverlay.appendChild(image);

    pairComposite.append(wordBase, imageOverlay);
    pairViewport.appendChild(pairComposite);

    const rotateControls = document.createElement("div");
    rotateControls.className = "pair-rotate-controls";

    const rotateLeftBtn = document.createElement("button");
    rotateLeftBtn.type = "button";
    rotateLeftBtn.className = "pair-rotate-btn";
    rotateLeftBtn.textContent = "↶";
    rotateLeftBtn.title = "逆时针旋转";
    rotateLeftBtn.addEventListener("click", () => {
      rotatePairViewport(pairViewport, -1);
    });

    const rotateRightBtn = document.createElement("button");
    rotateRightBtn.type = "button";
    rotateRightBtn.className = "pair-rotate-btn";
    rotateRightBtn.textContent = "↷";
    rotateRightBtn.title = "顺时针旋转";
    rotateRightBtn.addEventListener("click", () => {
      rotatePairViewport(pairViewport, 1);
    });

    rotateControls.append(rotateLeftBtn, rotateRightBtn);

    const pairInteractive = document.createElement("div");
    pairInteractive.className = "pair-interactive";
    pairInteractive.dataset.previewImageSrc = card.imageCard.image || "";
    pairInteractive.dataset.previewWordSrc = card.wordCard.image || "";
    pairInteractive.dataset.previewTitle = `${card.imageCard.name} + ${card.wordCard.name}`;
    pairInteractive.append(pairViewport, rotateControls);
    setupPairViewportGestures(pairViewport);

    const line = document.createElement("p");
    line.className = "card-line";
    line.textContent = card.cue || "把图卡和字卡放在一起，说说它们共同指向了什么。";

    front.append(pairTitle, pairInteractive, line);
    return;
  }

  if (getCardKind(card) === "image") {
    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = card.name;

    const imageBlock = document.createElement("div");
    imageBlock.className = "image-block";
    const image = document.createElement("img");
    image.src = card.image;
    image.alt = card.name;
    image.loading = "lazy";
    makePreviewableImage(image, `${card.name}（图卡）`);
    imageBlock.appendChild(image);

    const meta = document.createElement("p");
    meta.className = "card-meta";
    meta.textContent = `关键词：${(card.keywords || []).join(" · ")}`;

    const line = document.createElement("p");
    line.className = "card-line";
    line.textContent = card.cue || "描述这个画面正在发生什么。";

    front.append(title, imageBlock, meta, line);
    return;
  }

  const title = document.createElement("h3");
  title.className = "card-title";
  const glyph = card.glyph ? `${card.glyph} ` : "";
  title.textContent = `${glyph}${card.name}`;

  if (card.image) {
    const wordImageBlock = document.createElement("div");
    wordImageBlock.className = "image-block word-image-block";
    const image = document.createElement("img");
    image.src = card.image;
    image.alt = card.name;
    image.loading = "lazy";
    makePreviewableImage(image, `${card.name}（字卡）`);
    wordImageBlock.appendChild(image);

    const line = document.createElement("p");
    line.className = "card-line";
    line.textContent = card.cue || "说说这个词触发了你怎样的联想。";

    front.append(title, wordImageBlock, line);
    return;
  }

  const meta = document.createElement("p");
  meta.className = "card-meta";
  meta.textContent = `关键词：${(card.keywords || []).join(" · ")}`;

  const line = document.createElement("p");
  line.className = "card-line";
  line.textContent = card.cue || "说说这个词触发了你怎样的联想。";

  front.append(title, meta, line);
}

function renderPrompts() {
  refs.promptList.innerHTML = "";
  if (state.currentCards.length === 0) {
    const item = document.createElement("li");
    item.textContent = "你还没有抽卡，先抽卡后系统会生成分层引导问题。";
    refs.promptList.appendChild(item);
    return;
  }

  const mode = MODES[state.modeId];
  const layerPrompts = buildPrompts(state.layerId, state.currentCards, mode);

  layerPrompts.forEach((prompt) => {
    const item = document.createElement("li");
    item.textContent = prompt;
    refs.promptList.appendChild(item);
  });
}

function buildPrompts(layerId, cards, mode) {
  const base = shuffle(PROMPT_POOL[layerId]).slice(0, 3);

  const cardPrompts = cards.map((card, index) => {
    const slot = mode.labels[index] || `位置 ${index + 1}`;
    const cardName = getCardPromptName(card);

    if (layerId === "description") {
      if (getCardKind(card) === "pair") {
        return `在「${slot}」里，图卡「${card.imageCard.name}」你先看见了什么？字卡「${card.wordCard.name}」又强化了什么？`;
      }
      return `在「${slot}」这张「${cardName}」里，你最先注意到的是形状、动作还是关系？`;
    }

    if (layerId === "association") {
      return `「${slot} - ${cardName}」让你想到最近哪个具体事件或人物？`;
    }

    return `如果「${slot} - ${cardName}」是一条行动建议，你今天愿意做什么最小动作？`;
  });

  const relationPrompt =
    cards.length > 1
      ? layerId === "description"
        ? `把这 ${cards.length} 张牌放在一起看，哪两张最像同一条故事线？`
        : layerId === "association"
        ? `这组牌最像你人生里哪个重复循环？它通常在什么情境出现？`
        : "这组牌共同指向的核心冲突是什么？你准备如何改写它？"
      : layerId === "description"
      ? `请把「${getCardPromptName(cards[0])}」描述成一个场景：地点、人物、动作分别是什么？`
      : layerId === "association"
      ? `这张「${getCardPromptName(cards[0])}」像你哪段记忆？那段记忆与你当前问题有什么联系？`
      : `这张「${getCardPromptName(cards[0])}」触发了你什么感受？你需要被满足的核心需求是什么？`;

  return [...base, ...shuffle(cardPrompts).slice(0, 2), relationPrompt];
}

function prependHistory(session) {
  state.history = [session, ...state.history].slice(0, 30);
  persistHistory();
  renderHistory();
}

function renderHistory() {
  refs.historyList.innerHTML = "";
  if (state.history.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "还没有历史记录。每次抽卡后会自动保存在本机浏览器。";
    refs.historyList.appendChild(empty);
    return;
  }

  state.history.forEach((session) => {
    const item = document.createElement("article");
    item.className = "history-item";
    const mode = MODES[session.modeId];
    const deckType = DECK_TYPES[session.deckTypeId] || DECK_TYPES[inferDeckTypeFromCards(session.cards)] || DECK_TYPES.word;
    const layoutDirection = LAYOUT_DIRECTIONS[session.layoutDirection] || LAYOUT_DIRECTIONS.up;

    const time = new Date(session.time);
    const localTime = `${time.getFullYear()}-${pad2(time.getMonth() + 1)}-${pad2(time.getDate())} ${pad2(
      time.getHours()
    )}:${pad2(time.getMinutes())}`;

    item.innerHTML = `
      <strong>${escapeHTML(mode ? mode.name : "未知玩法")} · ${escapeHTML(deckType.name)} · ${escapeHTML(layoutDirection.name)} · ${escapeHTML(localTime)}</strong>
      <p>问题：${escapeHTML(session.question || "（未填写）")}</p>
      <p>牌面：${escapeHTML((session.cards || []).map((card) => getCardShortName(card)).join(" / "))}</p>
      <p>笔记：${escapeHTML(session.note || "（未记录）")}</p>
      <div class="actions compact">
        <button class="btn btn-ghost" data-action="replay" data-id="${escapeHTML(session.id)}">回看此局</button>
        <button class="btn btn-danger" data-action="remove" data-id="${escapeHTML(session.id)}">删除</button>
      </div>
    `;
    refs.historyList.appendChild(item);
  });
}

function handleHistoryAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const { action, id } = button.dataset;
  if (action === "remove") {
    state.history = state.history.filter((entry) => entry.id !== id);
    if (state.currentSession && state.currentSession.id === id) {
      state.currentSession = null;
    }
    persistHistory();
    renderHistory();
    return;
  }
  if (action === "replay") {
    const session = state.history.find((entry) => entry.id === id);
    if (!session) {
      return;
    }
    state.modeId = session.modeId in MODES ? session.modeId : "focus";
    state.deckTypeId = session.deckTypeId in DECK_TYPES ? session.deckTypeId : inferDeckTypeFromCards(session.cards);
    state.layoutDirection = session.layoutDirection in LAYOUT_DIRECTIONS ? session.layoutDirection : "up";
    state.currentSession = session;
    state.currentCards = session.cards || [];
    state.layerId = "description";
    refs.questionInput.value = session.question || "";
    refs.noteInput.value = session.note || "";
    renderModeSwitch();
    renderModeDetail();
    renderDeckTypeSwitch();
    renderLayoutDirectionSwitch();
    renderPromptTabs();
    renderSpread(state.currentCards, MODES[state.modeId].labels);
    renderPrompts();
    setSummary(
      `已回看历史：${MODES[state.modeId].name} / ${DECK_TYPES[state.deckTypeId].name} / ${LAYOUT_DIRECTIONS[state.layoutDirection].name}`,
      false
    );
  }
}

function saveCurrentNote() {
  if (!state.currentSession) {
    setSummary("请先完成一次抽卡，再保存本次洞察记录。", true);
    return;
  }
  const noteText = refs.noteInput.value.trim();
  state.currentSession.note = noteText;
  state.history = state.history.map((entry) => {
    if (entry.id === state.currentSession.id) {
      return { ...entry, note: noteText };
    }
    return entry;
  });
  persistHistory();
  renderHistory();
  setSummary("本次记录已保存到浏览器本地。", false);
}

async function copyCurrentReport() {
  if (state.currentCards.length === 0) {
    setSummary("请先抽卡，再复制引导文本。", true);
    return;
  }
  const mode = MODES[state.modeId];
  const promptItems = Array.from(refs.promptList.querySelectorAll("li")).map((item) => item.textContent || "");
  const report = [
    "【OH 卡引导记录】",
    `问题：${refs.questionInput.value.trim() || "（未填写）"}`,
    `玩法：${mode.name}`,
    `卡组：${DECK_TYPES[state.deckTypeId].name}`,
    `方向：${LAYOUT_DIRECTIONS[state.layoutDirection].name}`,
    "牌面：",
    ...state.currentCards.map((card, index) => formatCardLineForReport(card, mode.labels[index] || `位置 ${index + 1}`)),
    `当前提问层：${PROMPT_LAYERS.find((layer) => layer.id === state.layerId)?.name || ""}`,
    "引导问题：",
    ...promptItems.map((line) => `- ${line}`),
    `笔记：${refs.noteInput.value.trim() || "（未填写）"}`
  ].join("\n");

  const copied = await copyText(report);
  setSummary(copied ? "本次引导文本已复制，可直接粘贴到笔记工具。" : "复制失败，请手动复制页面内容。", !copied);
}

function formatCardLineForReport(card, slot) {
  const kind = getCardKind(card);
  if (kind === "pair") {
    return `- ${slot}: 图卡「${card.imageCard.name}」 + 字卡「${card.wordCard.name}」`;
  }
  if (kind === "image") {
    return `- ${slot}: 图卡「${card.name}」`;
  }
  return `- ${slot}: 字卡「${card.name}」`;
}

function resetBoard() {
  state.currentCards = [];
  state.currentSession = null;
  refs.noteInput.value = "";
  refs.spreadBoard.className = "spread-board empty";
  refs.spreadBoard.innerHTML = '<p class="placeholder">牌面已重置。点击“开始抽卡”开始新一局。</p>';
  refs.promptList.innerHTML = "";
  const promptItem = document.createElement("li");
  promptItem.textContent = "你已重置牌面。可先输入问题，再开始抽卡。";
  refs.promptList.appendChild(promptItem);
  setSummary("牌组已重置，准备开始新一局。", false);
}

function clearHistory() {
  state.history = [];
  persistHistory();
  renderHistory();
  setSummary("历史记录已清空。", false);
}

function setMode(modeId) {
  if (!(modeId in MODES)) {
    return;
  }
  state.modeId = modeId;
  renderModeSwitch();
  renderModeDetail();
  if (state.currentCards.length > 0 && state.currentCards.length === MODES[modeId].count) {
    renderSpread(state.currentCards, MODES[modeId].labels);
    renderPrompts();
  } else if (state.currentCards.length > 0) {
    state.currentCards = [];
    refs.spreadBoard.className = "spread-board empty";
    refs.spreadBoard.innerHTML = '<p class="placeholder">玩法已切换，请重新抽卡以匹配新的牌阵结构。</p>';
    refs.promptList.innerHTML = "";
    const promptItem = document.createElement("li");
    promptItem.textContent = "当前玩法结构已更新，请抽卡后再进行引导提问。";
    refs.promptList.appendChild(promptItem);
  }
  setSummary(`已切换玩法：${MODES[modeId].name}`, false);
}

function setDeckType(deckTypeId) {
  if (!(deckTypeId in DECK_TYPES)) {
    return;
  }
  state.deckTypeId = deckTypeId;
  renderDeckTypeSwitch();
  renderModeSwitch();

  if (state.currentCards.length > 0) {
    state.currentCards = [];
    refs.spreadBoard.className = "spread-board empty";
    refs.spreadBoard.innerHTML = '<p class="placeholder">卡组模式已切换，请重新抽卡。</p>';
    refs.promptList.innerHTML = "";
    const promptItem = document.createElement("li");
    promptItem.textContent = "卡组模式变化后需要重新抽卡，才能得到正确引导。";
    refs.promptList.appendChild(promptItem);
  }

  setSummary(`已切换卡组：${DECK_TYPES[deckTypeId].name}`, false);
}

function setLayoutDirection(directionId) {
  if (!(directionId in LAYOUT_DIRECTIONS)) {
    return;
  }
  state.layoutDirection = directionId;
  renderModeSwitch();
  renderLayoutDirectionSwitch();

  if (state.currentSession) {
    state.currentSession.layoutDirection = directionId;
    state.history = state.history.map((entry) => {
      if (entry.id === state.currentSession.id) {
        return { ...entry, layoutDirection: directionId };
      }
      return entry;
    });
    persistHistory();
    renderHistory();
  }

  if (state.currentCards.length > 0) {
    renderSpread(state.currentCards, MODES[state.modeId].labels);
    renderPrompts();
  }

  setSummary(`已切换方向：${LAYOUT_DIRECTIONS[directionId].name}`, false);
}

async function importDeckFromFile(file, type) {
  if (!file) {
    return;
  }
  try {
    const text = await file.text();
    const raw = JSON.parse(text);
    if (!Array.isArray(raw)) {
      throw new Error("JSON 顶层必须是数组。");
    }

    if (type === "word") {
      const parsed = raw.map((entry) => normalizeWordCard(entry)).filter(Boolean);
      if (parsed.length < 5) {
        throw new Error("字卡数量太少，至少需要 5 张。");
      }
      state.wordDeck = parsed;
      state.deckSource.word = "custom";
      setSummary(`已导入字卡 ${parsed.length} 张。`, false);
    } else {
      const parsed = raw.map((entry) => normalizeImageCard(entry)).filter(Boolean);
      if (parsed.length < 5) {
        throw new Error("图卡数量太少，至少需要 5 张。");
      }
      state.imageDeck = parsed;
      state.deckSource.image = "custom";
      setSummary(`已导入图卡 ${parsed.length} 张。`, false);
    }

    persistCustomDecks();
    renderDeckStatus();
    warmupPreload();
  } catch (error) {
    console.error("import deck failed", error);
    setSummary(`导入失败：${error.message || "请检查 JSON 格式"}`, true);
  }
}

function resetDecksToBuiltIn() {
  state.wordDeck = cloneCards(DEFAULT_WORD_DECK);
  state.imageDeck = cloneCards(DEFAULT_IMAGE_DECK);
  state.deckSource.word = "built-in";
  state.deckSource.image = "built-in";
  persistCustomDecks();
  renderDeckStatus();
  setSummary("已恢复内置图卡和字卡，正在尝试自动加载实卡素材。", false);
  autoLoadBundledDecks();
}

function hydrateCustomDecks() {
  try {
    const raw = localStorage.getItem(CUSTOM_DECK_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return;
    }

    if (Array.isArray(parsed.wordDeck)) {
      const wordDeck = parsed.wordDeck.map((entry) => normalizeWordCard(entry)).filter(Boolean);
      if (wordDeck.length >= 5) {
        state.wordDeck = wordDeck;
        state.deckSource.word = "custom";
      }
    }

    if (Array.isArray(parsed.imageDeck)) {
      const imageDeck = parsed.imageDeck.map((entry) => normalizeImageCard(entry)).filter(Boolean);
      if (imageDeck.length >= 5) {
        state.imageDeck = imageDeck;
        state.deckSource.image = "custom";
      }
    }
  } catch (error) {
    console.error("hydrate custom decks failed", error);
  }
}

async function autoLoadBundledDecks() {
  const hasCustomWordImages =
    state.deckSource.word === "custom" && state.wordDeck.filter((card) => card && card.image).length >= 5;
  const hasCustomImageCards =
    state.deckSource.image === "custom" && state.imageDeck.filter((card) => card && card.image).length >= 5;

  if (hasCustomWordImages && hasCustomImageCards) {
    return;
  }

  try {
    const [imageRes, wordRes] = await Promise.all([fetch(BUNDLED_IMAGE_DECK_PATH), fetch(BUNDLED_WORD_DECK_PATH)]);
    if (!imageRes.ok || !wordRes.ok) {
      return;
    }

    const [imageRaw, wordRaw] = await Promise.all([imageRes.json(), wordRes.json()]);
    let imageDeck = Array.isArray(imageRaw) ? imageRaw.map((entry) => normalizeImageCard(entry)).filter(Boolean) : [];
    let wordDeck = Array.isArray(wordRaw) ? wordRaw.map((entry) => normalizeWordCard(entry)).filter(Boolean) : [];
    const webpReady = await probeBundledWebp(imageDeck, wordDeck);
    if (webpReady) {
      imageDeck = applyWebpDeck(imageDeck);
      wordDeck = applyWebpDeck(wordDeck);
    }

    let changed = false;

    if (imageDeck.length >= 5 && !hasCustomImageCards) {
      state.imageDeck = imageDeck;
      state.deckSource.image = "bundled";
      changed = true;
    }

    if (wordDeck.length >= 5 && !hasCustomWordImages) {
      state.wordDeck = wordDeck;
      state.deckSource.word = "bundled";
      changed = true;
    }

    if (!changed) {
      return;
    }

    renderDeckStatus();
    warmupPreload();
    setSummary(
      `已自动加载实卡素材：图卡 ${state.imageDeck.length} 张 / 字卡 ${state.wordDeck.length} 张。${state.bundledWebpAvailable ? " WebP 已启用。" : ""}`,
      false
    );
  } catch (error) {
    console.warn("autoLoadBundledDecks failed", error);
  }
}

function persistCustomDecks() {
  localStorage.setItem(
    CUSTOM_DECK_STORAGE_KEY,
    JSON.stringify({
      wordDeck: state.deckSource.word === "custom" ? state.wordDeck : null,
      imageDeck: state.deckSource.image === "custom" ? state.imageDeck : null
    })
  );
}

function normalizeWordCard(input) {
  if (!input || typeof input !== "object") {
    return null;
  }
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) {
    return null;
  }
  return {
    name,
    glyph: typeof input.glyph === "string" ? input.glyph.trim().slice(0, 4) : "",
    image: typeof input.image === "string" ? input.image.trim() : "",
    tone: normalizeTone(input.tone),
    keywords: normalizeKeywords(input.keywords, ["联想"]),
    cue: typeof input.cue === "string" ? input.cue.trim() : ""
  };
}

function normalizeImageCard(input) {
  if (!input || typeof input !== "object") {
    return null;
  }
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) {
    return null;
  }

  const tone = normalizeTone(input.tone);
  const keywords = normalizeKeywords(input.keywords, ["画面", "情境"]);
  const cue = typeof input.cue === "string" ? input.cue.trim() : "";

  let image = typeof input.image === "string" ? input.image.trim() : "";
  if (!image) {
    image = buildSceneImage({
      name,
      tone,
      symbol: "◌",
      colors: toneColors(tone),
      keywords,
      cue
    });
  }

  return {
    name,
    image,
    tone,
    keywords,
    cue
  };
}

function normalizeKeywords(value, fallback) {
  if (Array.isArray(value)) {
    const result = value.map((item) => String(item).trim()).filter(Boolean).slice(0, 6);
    if (result.length > 0) {
      return result;
    }
  }
  if (typeof value === "string") {
    const result = value
      .split(/[、,，/|]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 6);
    if (result.length > 0) {
      return result;
    }
  }
  return fallback;
}

function normalizeTone(value) {
  const tone = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (["sand", "moss", "ocean", "fire", "night"].includes(tone)) {
    return tone;
  }
  return "sand";
}

function toneColors(tone) {
  if (tone === "moss") {
    return ["#9dc08f", "#edf6e7", "#648a56"];
  }
  if (tone === "ocean") {
    return ["#86b8c8", "#e7f2f8", "#557d96"];
  }
  if (tone === "fire") {
    return ["#e2a377", "#fbe8d9", "#b56e3d"];
  }
  if (tone === "night") {
    return ["#8d95ae", "#e6e9f3", "#5b637b"];
  }
  return ["#e7bb89", "#fceeda", "#b48350"];
}

function buildSceneImage(scene) {
  const [c1, c2, c3] = Array.isArray(scene.colors) && scene.colors.length >= 3 ? scene.colors : toneColors(scene.tone || "sand");
  const symbol = scene.symbol || "◌";
  const name = scene.name || "图卡";
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="360" fill="url(#g)"/>
  <circle cx="510" cy="72" r="52" fill="rgba(255,255,255,0.25)"/>
  <path d="M0 300 C 110 260 220 320 300 286 C 375 252 475 268 600 236 L600 360 L0 360Z" fill="rgba(255,255,255,0.28)"/>
  <path d="M0 260 C 90 228 188 286 278 252 C 360 220 460 238 600 194" stroke="rgba(255,255,255,0.36)" stroke-width="4" fill="none"/>
  <text x="54" y="96" font-size="72" fill="rgba(35,32,28,0.52)" font-family="serif">${escapeSVG(symbol)}</text>
  <text x="36" y="332" font-size="36" fill="rgba(34,30,26,0.72)" font-family="serif">${escapeSVG(name)}</text>
</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSVG(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function pickUnique(deck, count) {
  return shuffle(deck).slice(0, count).map((card) => ({ ...card }));
}

function shuffle(list) {
  const clone = list.slice();
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function setSummary(text, isError) {
  refs.spreadSummary.textContent = text;
  refs.spreadSummary.style.color = isError ? "#9f3326" : "";
}

function getCardKind(card) {
  if (!card || typeof card !== "object") {
    return "word";
  }
  if (card.kind === "pair" || (card.imageCard && card.wordCard)) {
    return "pair";
  }
  if (card.kind === "image" || card.image) {
    return "image";
  }
  return "word";
}

function getCardKindName(card) {
  const kind = getCardKind(card);
  if (kind === "pair") {
    return "图字配对";
  }
  if (kind === "image") {
    return "图卡";
  }
  return "字卡";
}

function getCardPromptName(card) {
  const kind = getCardKind(card);
  if (kind === "pair") {
    return `${card.imageCard.name} + ${card.wordCard.name}`;
  }
  if (kind === "image") {
    return `${card.name}(图卡)`;
  }
  return `${card.name}(字卡)`;
}

function getCardShortName(card) {
  const kind = getCardKind(card);
  if (kind === "pair") {
    return `${card.imageCard.name}+${card.wordCard.name}`;
  }
  return card.name;
}

function inferDeckTypeFromCards(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return "word";
  }
  const kind = getCardKind(cards[0]);
  if (kind === "pair") {
    return "pair";
  }
  if (kind === "image") {
    return "image";
  }
  return "word";
}

function directionToQuarter(directionId) {
  if (directionId === "right") {
    return 1;
  }
  if (directionId === "down") {
    return 2;
  }
  if (directionId === "left") {
    return 3;
  }
  return 0;
}

function normalizeQuarter(value) {
  return ((Number(value) % 4) + 4) % 4;
}

function applyPairRotation(viewport, quarter) {
  const normalized = normalizeQuarter(quarter);
  viewport.dataset.rotationQuarter = String(normalized);
  viewport.classList.remove(...ROTATION_CLASSES);
  viewport.classList.add(ROTATION_CLASSES[normalized]);
}

function rotatePairViewport(viewport, deltaQuarter) {
  const current = Number(viewport.dataset.rotationQuarter || 0);
  const delta = Number(deltaQuarter || 0);
  applyPairRotation(viewport, current + delta);
  if (!refs.previewPairWrap.hidden && refs.previewSyncRotation.checked && state.previewSourceViewport === viewport) {
    applyPreviewPairRotation(Number(refs.previewPairComposite.dataset.rotationQuarter || 0) + delta);
  }
}

function makePreviewableImage(imageElement, titleText) {
  if (!imageElement) {
    return;
  }
  imageElement.classList.add("previewable-image");
  imageElement.dataset.previewSrc = imageElement.src || "";
  imageElement.dataset.previewTitle = titleText || imageElement.alt || "";
}

function handlePreviewImageClick(event) {
  if (event.target.closest(".pair-rotate-btn")) {
    return;
  }

  const pairInteractive = event.target.closest(".pair-interactive");
  if (pairInteractive) {
    const imageSrc = pairInteractive.dataset.previewImageSrc || "";
    const wordSrc = pairInteractive.dataset.previewWordSrc || "";
    const title = pairInteractive.dataset.previewTitle || "";
    const viewport = pairInteractive.querySelector(".pair-viewport");
    const quarter = normalizeQuarter(Number(viewport?.dataset.rotationQuarter || 0));
    if (imageSrc && wordSrc) {
      openPairPreview(imageSrc, wordSrc, title, quarter, viewport || null);
      return;
    }
  }

  const image = event.target.closest("img.previewable-image");
  if (!image) {
    return;
  }
  openImagePreview(image.dataset.previewSrc || image.currentSrc || image.src, image.dataset.previewTitle || image.alt || "");
}

function setPreviewMode(mode) {
  const isPair = mode === "pair";
  refs.previewImage.hidden = isPair;
  refs.previewPairWrap.hidden = !isPair;
  refs.previewPairTools.hidden = !isPair;
}

function openImagePreview(src, title) {
  if (!src) {
    return;
  }
  setPreviewMode("single");
  refs.previewImage.src = src;
  refs.previewImage.alt = title || "卡牌放大预览";
  refs.previewTitle.textContent = title || "";
  refs.imagePreviewModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function openPairPreview(imageSrc, wordSrc, title, quarter, sourceViewport = null) {
  if (!imageSrc || !wordSrc) {
    openImagePreview(imageSrc || wordSrc, title);
    return;
  }
  setPreviewMode("pair");
  state.previewSourceViewport = sourceViewport;
  refs.previewPairImage.src = imageSrc;
  refs.previewPairWord.src = wordSrc;
  applyOverlayTuneToElement(refs.previewPairComposite);
  applyPreviewPairRotation(quarter);
  setCompositeGestureScale(refs.previewPairComposite, 1);
  refs.previewTitle.textContent = title || "图卡 + 字卡";
  refs.imagePreviewModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function applyPreviewPairRotation(quarter) {
  const normalized = normalizeQuarter(quarter);
  refs.previewPairComposite.dataset.rotationQuarter = String(normalized);
  refs.previewPairComposite.classList.remove(...ROTATION_CLASSES);
  refs.previewPairComposite.classList.add(ROTATION_CLASSES[normalized]);
}

function rotatePreviewPair(deltaQuarter) {
  if (refs.previewPairWrap.hidden) {
    return;
  }
  const current = Number(refs.previewPairComposite.dataset.rotationQuarter || 0);
  const normalizedDelta = Number(deltaQuarter) || 0;
  applyPreviewPairRotation(current + normalizedDelta);
  if (refs.previewSyncRotation.checked && state.previewSourceViewport) {
    rotatePairViewport(state.previewSourceViewport, normalizedDelta);
  }
}

function closeImagePreview() {
  refs.imagePreviewModal.hidden = true;
  setPreviewMode("single");
  state.previewSourceViewport = null;
  refs.previewImage.src = "";
  refs.previewPairImage.src = "";
  refs.previewPairWord.src = "";
  applyPreviewPairRotation(0);
  setCompositeGestureScale(refs.previewPairComposite, 1);
  refs.previewTitle.textContent = "";
  document.body.style.overflow = "";
}

function setCompositeGestureScale(element, scale) {
  if (!element) {
    return;
  }
  const clamped = Math.max(0.75, Math.min(2.6, Number(scale) || 1));
  element.dataset.gestureScale = String(clamped);
  element.style.setProperty("--gesture-scale", String(clamped));
}

function setupPairViewportGestures(viewport) {
  if (!viewport || viewport.dataset.gestureBound === "1") {
    return;
  }
  viewport.dataset.gestureBound = "1";
  attachTouchGestures(viewport, {
    onScale: (scale) => {
      setCompositeGestureScale(viewport.querySelector(".pair-composite"), scale);
    },
    onSwipe: (direction) => {
      rotatePairViewport(viewport, direction > 0 ? 1 : -1);
    },
    onReset: () => {
      setCompositeGestureScale(viewport.querySelector(".pair-composite"), 1);
    },
    getScale: () => {
      const composite = viewport.querySelector(".pair-composite");
      return Number(composite?.dataset.gestureScale || 1);
    }
  });
}

function setupPreviewPairGestures() {
  attachTouchGestures(refs.previewPairViewport, {
    onScale: (scale) => {
      setCompositeGestureScale(refs.previewPairComposite, scale);
    },
    onSwipe: (direction) => {
      rotatePreviewPair(direction > 0 ? 1 : -1);
    },
    onReset: () => {
      setCompositeGestureScale(refs.previewPairComposite, 1);
    },
    getScale: () => Number(refs.previewPairComposite.dataset.gestureScale || 1)
  });
}

function attachTouchGestures(target, options) {
  if (!target || target.dataset.touchGestureBound === "1") {
    return;
  }
  target.dataset.touchGestureBound = "1";
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let lastTapTime = 0;
  let moved = false;

  target.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length === 2) {
        pinchStartDistance = touchDistance(event.touches[0], event.touches[1]);
        pinchStartScale = Number(options.getScale?.() || 1);
        moved = true;
        return;
      }
      if (event.touches.length !== 1) {
        return;
      }
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      moved = false;
    },
    { passive: true }
  );

  target.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length === 2 && pinchStartDistance > 0) {
        event.preventDefault();
        const currentDistance = touchDistance(event.touches[0], event.touches[1]);
        if (currentDistance <= 0) {
          return;
        }
        const nextScale = pinchStartScale * (currentDistance / pinchStartDistance);
        options.onScale?.(nextScale);
        return;
      }
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const dx = Math.abs(touch.clientX - touchStartX);
        const dy = Math.abs(touch.clientY - touchStartY);
        moved = moved || dx > 8 || dy > 8;
      }
    },
    { passive: false }
  );

  target.addEventListener(
    "touchend",
    (event) => {
      if (pinchStartDistance > 0 && event.touches.length < 2) {
        pinchStartDistance = 0;
      }
      const changed = event.changedTouches[0];
      if (!changed) {
        return;
      }
      const duration = Date.now() - touchStartTime;
      const dx = changed.clientX - touchStartX;
      const dy = changed.clientY - touchStartY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (!moved && duration < 260) {
        const now = Date.now();
        if (now - lastTapTime < 280) {
          options.onReset?.();
          lastTapTime = 0;
        } else {
          lastTapTime = now;
        }
      }

      if (duration < 480 && absX > 64 && absX > absY * 1.2) {
        options.onSwipe?.(dx > 0 ? 1 : -1);
      }
    },
    { passive: true }
  );
}

function touchDistance(touchA, touchB) {
  const dx = touchA.clientX - touchB.clientX;
  const dy = touchA.clientY - touchB.clientY;
  return Math.hypot(dx, dy);
}

function toggleImmersiveMode(force) {
  const next = typeof force === "boolean" ? force : !state.immersive;
  state.immersive = next;
  document.body.classList.toggle("immersive-mode", next);
  refs.immersiveBtn.textContent = next ? "退出沉浸" : "沉浸模式";
  setSummary(next ? "已进入沉浸模式（Esc 可退出）。" : "已退出沉浸模式。", false);
}

function persistOverlayTune() {
  localStorage.setItem(OVERLAY_TUNE_STORAGE_KEY, JSON.stringify(state.overlayTune));
}

function hydrateOverlayTune() {
  try {
    const raw = localStorage.getItem(OVERLAY_TUNE_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return;
    }
    state.overlayTune = {
      left: normalizeOverlayValue(parsed.left, DEFAULT_OVERLAY_TUNE.left),
      right: normalizeOverlayValue(parsed.right, DEFAULT_OVERLAY_TUNE.right),
      top: normalizeOverlayValue(parsed.top, DEFAULT_OVERLAY_TUNE.top),
      bottom: normalizeOverlayValue(parsed.bottom, DEFAULT_OVERLAY_TUNE.bottom)
    };
  } catch (error) {
    console.warn("hydrateOverlayTune failed", error);
  }
}

function normalizeOverlayValue(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.max(6, Math.min(24, Math.round(numeric * 10) / 10));
}

function preloadImageUrl(url) {
  if (!url || state.preloadedImageUrls.has(url)) {
    return;
  }
  state.preloadedImageUrls.add(url);
  const image = new Image();
  image.decoding = "async";
  image.loading = "eager";
  image.src = url;
}

function preloadCards(cards) {
  (cards || []).forEach((card) => {
    const kind = getCardKind(card);
    if (kind === "pair") {
      preloadImageUrl(card.imageCard?.image);
      preloadImageUrl(card.wordCard?.image);
      return;
    }
    preloadImageUrl(card.image);
  });
}

function preloadNextRoundCandidates(count) {
  try {
    const nextCards = drawCards(Math.max(1, count));
    preloadCards(nextCards);
  } catch (error) {
    console.warn("preloadNextRoundCandidates failed", error);
  }
}

function warmupPreload() {
  const imageWarmup = state.imageDeck.slice(0, 12).map((card) => ({ ...card, kind: "image" }));
  const wordWarmup = state.wordDeck.slice(0, 12).map((card) => ({ ...card, kind: "word" }));
  preloadCards([...imageWarmup, ...wordWarmup]);
}

function toWebpPath(url) {
  if (typeof url !== "string") {
    return "";
  }
  return url.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, ".webp$2");
}

function shouldProbeWebp(url) {
  return typeof url === "string" && /^\.\/cards\//.test(url) && /\.(jpg|jpeg|png)(\?.*)?$/i.test(url);
}

async function probeBundledWebp(imageDeck, wordDeck) {
  if (state.bundledWebpAvailable) {
    return true;
  }
  const sampleImage = imageDeck.find((card) => shouldProbeWebp(card.image))?.image;
  const sampleWord = wordDeck.find((card) => shouldProbeWebp(card.image))?.image;
  if (!sampleImage || !sampleWord) {
    return false;
  }
  try {
    const [imageRes, wordRes] = await Promise.all([
      fetch(toWebpPath(sampleImage), { cache: "no-store" }),
      fetch(toWebpPath(sampleWord), { cache: "no-store" })
    ]);
    state.bundledWebpAvailable = imageRes.ok && wordRes.ok;
  } catch (error) {
    state.bundledWebpAvailable = false;
  }
  return state.bundledWebpAvailable;
}

function applyWebpDeck(deck) {
  return deck.map((card) => {
    if (!shouldProbeWebp(card.image)) {
      return card;
    }
    return { ...card, image: toWebpPath(card.image) };
  });
}

async function exportSessionAsset(type) {
  if (state.currentCards.length === 0) {
    setSummary("请先抽卡，再导出复盘。", true);
    return;
  }
  try {
    const canvas = await buildSessionCanvas();
    if (type === "png") {
      canvas.toBlob((blob) => {
        if (!blob) {
          setSummary("导出 PNG 失败。", true);
          return;
        }
        downloadBlob(blob, buildExportFilename("png"));
        setSummary("已导出复盘 PNG。", false);
      }, "image/png");
      return;
    }
    const PdfClass = window.jspdf?.jsPDF;
    if (!PdfClass) {
      setSummary("PDF 组件未加载，已建议先导出 PNG。", true);
      return;
    }
    const pdf = new PdfClass({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(buildExportFilename("pdf"));
    setSummary("已导出复盘 PDF。", false);
  } catch (error) {
    console.error("exportSessionAsset failed", error);
    setSummary(`导出失败：${error.message || "未知错误"}`, true);
  }
}

function buildExportFilename(ext) {
  const stamp = new Date();
  const time = `${stamp.getFullYear()}${pad2(stamp.getMonth() + 1)}${pad2(stamp.getDate())}-${pad2(stamp.getHours())}${pad2(
    stamp.getMinutes()
  )}`;
  return `oh-report-${time}.${ext}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function buildSessionCanvas() {
  const cards = state.currentCards.slice();
  const mode = MODES[state.modeId];
  const prompts = Array.from(refs.promptList.querySelectorAll("li")).map((item) => item.textContent || "");
  const questionText = refs.questionInput.value.trim() || "（未填写）";
  const noteText = refs.noteInput.value.trim() || "（未填写）";
  const cardCount = cards.length;

  const cardWidth = 320;
  const cardHeight = Math.round((cardWidth * 1312) / 1045);
  const cardGap = 24;
  const boardCols = Math.max(1, Math.min(3, cardCount));
  const boardWidth = boardCols * cardWidth + (boardCols - 1) * cardGap;
  const canvasWidth = Math.max(1300, boardWidth + 120);

  const baseLines = [
    "【OH 卡复盘】",
    `问题：${questionText}`,
    `玩法：${mode.name} / ${DECK_TYPES[state.deckTypeId].name} / ${LAYOUT_DIRECTIONS[state.layoutDirection].name}`,
    `牌面：${cards.map((card) => getCardShortName(card)).join(" / ")}`
  ];
  const promptLines = prompts.map((line, index) => `${index + 1}. ${line}`);
  const noteLines = wrapTextLines(noteText, 52);
  const textLineCount = baseLines.length + promptLines.length + noteLines.length + 4;
  const textHeight = textLineCount * 26;
  const canvasHeight = 120 + cardHeight + 40 + textHeight + 80;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("画布上下文创建失败");
  }

  ctx.fillStyle = "#fbf8f1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#2b241d";
  ctx.font = "700 34px 'Noto Serif SC', serif";
  ctx.fillText("OH 卡复盘导出", 44, 56);
  ctx.font = "400 18px 'Noto Serif SC', serif";
  ctx.fillStyle = "#5a4b3f";
  ctx.fillText(new Date().toLocaleString(), 44, 86);

  const boardX = Math.floor((canvas.width - boardWidth) / 2);
  const boardY = 120;
  for (let i = 0; i < cards.length; i += 1) {
    const card = cards[i];
    const x = boardX + i * (cardWidth + cardGap);
    const y = boardY;
    await drawExportCard(ctx, card, x, y, cardWidth, cardHeight);
    ctx.fillStyle = "#3e3228";
    ctx.font = "600 17px 'Noto Serif SC', serif";
    ctx.fillText(mode.labels[i] || `位置 ${i + 1}`, x, y - 10);
  }

  let textY = boardY + cardHeight + 38;
  ctx.font = "500 20px 'Noto Serif SC', serif";
  ctx.fillStyle = "#2f261f";
  baseLines.forEach((line) => {
    ctx.fillText(line, 44, textY);
    textY += 30;
  });
  ctx.fillText("引导问题：", 44, textY);
  textY += 30;
  ctx.font = "400 18px 'Noto Serif SC', serif";
  promptLines.forEach((line) => {
    ctx.fillText(line, 60, textY);
    textY += 26;
  });
  ctx.font = "600 20px 'Noto Serif SC', serif";
  ctx.fillText("行动笔记：", 44, textY);
  textY += 30;
  ctx.font = "400 18px 'Noto Serif SC', serif";
  noteLines.forEach((line) => {
    ctx.fillText(line, 60, textY);
    textY += 26;
  });

  return canvas;
}

async function drawExportCard(ctx, card, x, y, width, height) {
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "rgba(126, 98, 69, 0.35)";
  ctx.lineWidth = 2;
  roundedRectPath(ctx, x, y, width, height, 16);
  ctx.fill();
  ctx.stroke();

  const kind = getCardKind(card);
  if (kind === "pair") {
    const wordImage = await loadImageForCanvas(card.wordCard.image);
    if (wordImage) {
      drawImageContain(ctx, wordImage, x, y, width, height);
    }
    const overlayX = x + (state.overlayTune.left / 100) * width;
    const overlayY = y + (state.overlayTune.top / 100) * height;
    const overlayW = width - ((state.overlayTune.left + state.overlayTune.right) / 100) * width;
    const overlayH = height - ((state.overlayTune.top + state.overlayTune.bottom) / 100) * height;
    const image = await loadImageForCanvas(card.imageCard.image);
    if (image) {
      roundedClip(ctx, overlayX, overlayY, overlayW, overlayH, 10);
      drawImageCover(ctx, image, overlayX, overlayY, overlayW, overlayH);
      ctx.restore();
    }
    return;
  }
  if (card.image) {
    const image = await loadImageForCanvas(card.image);
    if (image) {
      drawImageContain(ctx, image, x, y, width, height);
    }
  }
}

const exportImageCache = new Map();

async function loadImageForCanvas(url) {
  if (!url) {
    return null;
  }
  if (exportImageCache.has(url)) {
    return exportImageCache.get(url);
  }
  const promise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
  });
  exportImageCache.set(url, promise);
  return promise;
}

function drawImageContain(ctx, image, x, y, width, height) {
  const ratio = Math.min(width / image.width, height / image.height);
  const drawW = image.width * ratio;
  const drawH = image.height * ratio;
  const dx = x + (width - drawW) / 2;
  const dy = y + (height - drawH) / 2;
  ctx.drawImage(image, dx, dy, drawW, drawH);
}

function drawImageCover(ctx, image, x, y, width, height) {
  const ratio = Math.max(width / image.width, height / image.height);
  const drawW = image.width * ratio;
  const drawH = image.height * ratio;
  const dx = x + (width - drawW) / 2;
  const dy = y + (height - drawH) / 2;
  ctx.drawImage(image, dx, dy, drawW, drawH);
}

function wrapTextLines(text, maxChars) {
  const lines = [];
  const paragraphs = String(text || "").split(/\n+/);
  paragraphs.forEach((paragraph) => {
    let cursor = paragraph.trim();
    if (!cursor) {
      lines.push("");
      return;
    }
    while (cursor.length > maxChars) {
      lines.push(cursor.slice(0, maxChars));
      cursor = cursor.slice(maxChars);
    }
    lines.push(cursor);
  });
  return lines.length ? lines : ["（未填写）"];
}

function roundedRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function roundedClip(ctx, x, y, width, height, radius) {
  ctx.save();
  roundedRectPath(ctx, x, y, width, height, radius);
  ctx.clip();
}

function uniqueValues(list) {
  return Array.from(new Set(list.filter(Boolean)));
}

function cloneCards(cards) {
  return cards.map((card) => ({ ...card, keywords: Array.isArray(card.keywords) ? card.keywords.slice() : [] }));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((entry) => entry && Array.isArray(entry.cards) && typeof entry.id === "string");
  } catch (error) {
    console.error("loadHistory failed", error);
    return [];
  }
}

function persistHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const hidden = document.createElement("textarea");
    hidden.value = text;
    hidden.setAttribute("readonly", "");
    hidden.style.position = "absolute";
    hidden.style.left = "-9999px";
    document.body.appendChild(hidden);
    hidden.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(hidden);
    return copied;
  }
}

function toggleTimer() {
  if (state.timer.running) {
    stopTimer("继续");
    return;
  }
  if (state.timer.remaining <= 0 || state.timer.remaining === state.timer.duration) {
    const minutes = Math.max(1, Math.min(20, Number(refs.timerMinutes.value) || 3));
    state.timer.duration = minutes * 60;
    state.timer.remaining = state.timer.duration;
  }
  state.timer.running = true;
  refs.timerToggle.textContent = "暂停";
  state.timer.intervalId = setInterval(() => {
    state.timer.remaining -= 1;
    updateTimerDisplay();
    if (state.timer.remaining <= 0) {
      stopTimer("开始");
      refs.timerText.textContent = "00:00";
      setSummary("计时结束。请回看你的牌面洞察并写下行动。", false);
    }
  }, 1000);
}

function stopTimer(buttonText) {
  state.timer.running = false;
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
  }
  refs.timerToggle.textContent = buttonText;
}

function updateTimerDisplay() {
  const remaining = Math.max(0, state.timer.remaining);
  const minute = Math.floor(remaining / 60);
  const second = remaining % 60;
  refs.timerText.textContent = `${pad2(minute)}:${pad2(second)}`;
}
