# OH Card Studio（动态网页版）

## 你会得到什么
- 多玩法融合：单卡聚焦、时间线三张、关系镜像、四维钻石、五点策略阵
- 三种卡组模式：图字配对 / 图卡模式 / 字卡模式
- 方向切换：上 / 右 / 下 / 左（图卡在上、字卡在下，作为整体四向旋转）
- 开场协议：意图输入、探索同意、情绪强度与安全提醒
- 稳定工具：高强度时可用 60 秒呼吸 / 五感落地 / 支持语
- 主持人模式：分阶段推进（描述 -> 联想 -> 探究 -> 行动）
- 快速预设：暖场单卡 / 决策拆解 / 关系对话 / 推进策略
- 提问风格：温和 / 平衡 / 深挖
- 抽卡防重复：默认尽量避开最近 3 局已出现卡牌
- 抽卡动画：牌堆洗牌 + 卡牌翻转 + 分步出现
- 引导提问：描述性 / 联想性 / 探究性三层问题引导
- 功能增强：专注计时、本地历史、回看、删除、导出引导文本、笔记保存、结束整合、会话质量分、导入自定义卡组
- 响应式布局：桌面与手机均可使用

## 运行方式
1. 直接用浏览器打开 `index.html`
2. 或在目录启动静态服务（可选）：
   - `python3 -m http.server 8080`
   - 浏览器访问 `http://localhost:8080`

## 文件说明
- `index.html`: 页面结构
- `styles.css`: 页面视觉与动画
- `script.js`: 抽卡与引导逻辑（含内置图卡 + 字卡）
- `data/word-deck-template.json`: 字卡导入模板
- `data/image-deck-template.json`: 图卡导入模板

## 导入真实 OH 图卡 / 字卡
项目启动时会优先自动加载：
- `data/oh-image-deck.json`
- `data/oh-word-deck.json`

如果你手动点击导入，导入内容会覆盖自动加载结果并保存在浏览器本地。

1. 先准备 JSON 文件（可复制 `data/` 下模板修改）
2. 页面中点击：
   - `导入图卡 JSON`
   - `导入字卡 JSON`
3. 导入成功后会显示当前卡组数量（保存在浏览器本地）

字卡 JSON 格式（数组）：
```json
[
  {
    "name": "边界",
    "glyph": "▣",
    "tone": "night",
    "keywords": ["保护", "规则"],
    "cue": "你在哪个关系里需要重新定义边界？"
  }
]
```

图卡 JSON 格式（数组）：
```json
[
  {
    "name": "夜色楼梯",
    "image": "https://example.com/your-image.jpg",
    "tone": "night",
    "keywords": ["进阶", "过程"],
    "cue": "你现在处于哪一级台阶？"
  }
]
```

说明：
- `image` 支持 `https URL`、相对路径（如 `./cards/01.jpg`）、`base64 data URL`
- 单个卡组建议至少 20 张；最低必须 5 张（才能运行全部玩法）

## GitHub Positioning

- Suggested description: `Interactive OH card studio with guided prompts, facilitation modes, and custom card decks.`
- Suggested topics: `reflection-tool`, `card-game`, `facilitation`, `creative-coding`, `html`, `css`, `javascript`
- Metadata notes: see [`docs/repo-metadata.md`](docs/repo-metadata.md)

