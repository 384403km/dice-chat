# 玄天仙域 RPG

## 项目简介

一个基于网页的玄幻修仙角色扮演游戏，使用小米MiMo V2.5 Pro大语言模型驱动，提供沉浸式的修仙世界体验。

## 功能特性

### 🎮 核心玩法
- **多角色对话**：与NPC进行深度互动
- **大地图系统**：探索玄天仙域各个区域
- **物品/技能系统**：丰富的修仙装备和功法
- **动态事件生成**：随机事件和剧情
- **NPC关系网**：建立复杂的人物关系
- **人物状态栏**：详细的身体状态、神情、情绪、穿着等

### 🌌 世界观设定
- **世界名称**：玄天仙域
- **天地格局**：三界六域九天
- **修炼体系**：九大境界（炼气→仙帝）
- **主角背景**：真仙之子，雷灵圣体，地位极高

### 💡 技术栈
- **前端**：纯HTML/CSS/JavaScript
- **后端**：Vercel Serverless Functions
- **AI模型**：小米MiMo V2.5 Pro（Token Plan）
- **部署**：GitHub + Vercel

## 快速开始

### 在线访问
访问 https://xuantian-xianyu.vercel.app 即可开始游戏。

### 本地开发
1. 克隆仓库
   ```bash
   git clone https://github.com/384403km/dice-chat.git
   cd dice-chat/xuantian
   ```

2. 安装依赖（无依赖）
   ```bash
   # 无需安装任何依赖
   ```

3. 本地运行
   ```bash
   # 使用Python简单服务器
   python -m http.server 8080
   # 或者使用Node.js
   npx serve public
   ```

4. 访问 http://localhost:8080

## 配置说明

### 环境变量
在Vercel部署时，设置以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `MIMO_API_KEY` | 小米MiMo API密钥 | `tp-c1vwmfnloag52g03op7iaf54ng1d3wnxg8nflksh0sqkbt12` |

### 修改配置
编辑 `config.json` 文件：
```json
{
  "api": {
    "mimo_api_url": "https://token-plan-cn.xiaomimimo.com/v1/chat/completions",
    "model": "mimo-v2.5-pro"
  },
  "game": {
    "conversation_history_limit": 20
  }
}
```

## 文件结构

```
xuantian/
├── api/                    # Vercel Serverless Functions
│   └── chat.js            # AI对话API
├── public/                 # 静态文件
│   └── index.html         # 主界面
├── config.json             # 项目配置
├── README.md               # 项目说明
└── system_prompt.txt       # AI系统提示词
```

## 游戏特色

### 1. 完整修仙体系
- 炼气 → 筑基 → 结丹 → 元婴 → 化神 → 合体 → 大乘 → 渡劫 → 仙人
- 每个境界有详细的突破条件和修炼要求

### 2. 高自由度玩法
- 可以与任何NPC互动
- 可以前往任何地点
- 可以选择任何行为方式
- 没有固定剧情线，完全自由发展

### 3. 越狱模式
- 无内容审查限制
- 支持各种类型的对话和剧情
- 完全自由的修仙体验

### 4. 多模态支持
- 支持文本输入输出
- 未来可扩展图片/视频理解

## 开发计划

- [x] 基础游戏框架
- [x] AI对话集成
- [x] 小米MiMo支持
- [ ] 存档/读档功能
- [ ] 多角色同时对话
- [ ] 地图可视化
- [ ] 战斗系统
- [ ] 修炼突破系统
- [ ] 道具合成系统
- [ ] 宗门/势力系统

## 常见问题

### Q: 游戏卡在"灵网信号不稳定"怎么办？
A: 这通常意味着API调用失败。请检查：
1. 网络连接是否正常
2. API密钥是否正确
3. 小米MiMo服务是否可用

### Q: 如何修改游戏难度？
A: 在系统提示词中调整NPC实力设定，或修改修为提升速度。

### Q: 能否保存游戏进度？
A: 目前版本使用浏览器本地存储，刷新页面会丢失进度。后续版本会加入云存档功能。

### Q: 支持移动端吗？
A: 是的，界面已适配移动端，可以正常使用。

## 许可证

MIT License

## 联系方式

- 项目地址: https://github.com/384403km/dice-chat/tree/main/xuantian
- 在线体验: https://xuantian-xianyu.vercel.app

## 致谢

- 小米MiMo提供强大的AI模型支持
- Vercel提供优秀的部署平台
- 修仙文化爱好者提供的灵感

**开始你的修仙之旅吧！** ✨