/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Boost Point gain based on Incremental Points": "提升点数增益基于增量点",
    "Double your point gain.": "双倍你的点数增益。",
    "Incremental Game?": "增量游戏？",
    "incremental points": " 增量点",
    "It's a Great Idea": "这是个好主意",
    "The Beginning of the Idea": "想法的开始",
    "Triple your point gain.": "三倍你的点数增益。",
    "Boost Point gain based on Points": "提升点数增益基于点数",
    "Or Maybe Idle Game": "或者也许是放置游戏",
    "Boost Incremental Points based on Incremental Points": "提升增量点增益基于增量点",
    "I should start making the game?": "我应该开始制作游戏吗？",
    "Learn Coding": "学习编码",
    "Passively Generate Cookies": "被动生成饼干",
    "Start making the game": "开始制作游戏",
    "Upgrades": "升级",
    "You are gaining NaN incremental points per second": "您每秒获得 NaN 增量点",
    "Autobuys all the upgrades": "自动购买所有升级",
    "Autobuys the first 4 buyables and it does not deduct your Incremental Points": "自动购买前 4 个可购买，并且不会扣除您的增量点",
    "Automated Coding Lessons": "自动编码课程",
    "Clicker": "点击器",
    "Cookies": "饼干",
    "Free Points": "免费点数",
    "Gather Ideas": "收集想法",
    "Get 1e14 Incremental Points per second and autobuys the rest of the buyables": "每秒获得 1e14 增量点 并自动购买剩余的可购买",
    "Gain 100% of Incremental Points per second, and unlocks cool stuff": "每秒获得 100% 的增量点，并解锁很酷的东西",
    "Automates the second row of buyables": "自动化 第2行 可购买",
    "Boosts Incremental Points Based On Points": "提升增量点增益基于点数",
    "Make Developing Faster": "让开发更快",
    "Passive Income": "被动收入",
    "Pure Automation": "纯自动化",
    "Resets Sound Like a good idea!": "重置听起来是个好主意！",
    "Unlocks more cool stuff": "解锁更多酷的东西",
    "Prestige Function": "声望功能",
    "Time for rest can help right?": "休息时间可以帮助吗？",
    "Boost to Points and Incremental Points based on Time Played": "根据游戏时间提升点数和增量点",
    "Finish Coding": "完成编码",
    "Buying Prestige Functions doesnt reset anything": "购买声望功能不会重置任何东西",
    "Make the game look good": "让游戏看起来不错",
    "Non Resetting Layers": "非重置层",
    "Test The Game": "测试游戏",
    "Publish the Game": "发布游戏",
    "Unlocks a new layer (Finally": "解锁新层（最后",
    "Cookie Clicker": "饼干点击器",
    "Cursor": "游标",
    "A Revolutionary Idea": "一个革命性的想法",
    "Add a Timewall": "添加时间墙",
    "Adds ^46 to the Cookie Time Effect": "将 ^46 添加到 饼干 时间效果",
    "Advertise Your Patreon": "宣传你的 Patreon",
    "Apartment": "公寓",
    "Ascended Heavenly Chip Shoes": "升天筹码鞋",
    "Automates buying Dimensional Grandmas and Dimensional Wrinklers": "自动购买 维度老奶奶 和 维度皱纹",
    "Automatic Timewalls": "自动时间墙",
    "Automatically buys Church Buyables": "自动购买教堂可购买物品",
    "Automatically gets Timewalls": "自动获取时间墙",
    "Automatically sends 10% of your $ to your savings account without losing any of your $": "自动将 10% 的美元存入您的储蓄账户，而不会损失任何美元",
    "Automatically Walks 10 Meters Per Second": "每秒自动行走 10 米",
    "Autowalks Forward Faster based on Sugar Lumps": "基于 超级糖块 更快地自动行走",
    "Autowalks Right Faster based on Heavenly Chips": "基于 天堂筹码 的自动行走更快",
    "Big Mac": "巨无霸",
    "Blood Donation": "献血",
    "Boost all Dimensional Cookie gain by 10 and unlocks a new tab": "将所有 维度饼干 增益提高 10 并解锁新标签",
    "Boost Cultists based on Cultists": "基于邪教徒提升邪教徒",
    "Boosts $ based on $": "基于 $ 提升 $",
    "Boosts $ based on Research Points": "根据研究点增加 $",
    "Boosts Antimatter based on $": "基于 $ 提升反物质",
    "Boosts autobuyer.js based on $": "基于 $ 提升 autobuyer.js",
    "Boosts autobuyer.js based on Research Points": "基于研究点提升 autobuyer.js",
    "Boosts Autowalking Speed based on time played": "根据播放时间提高自动行走速度",
    "Boosts breakinfinity.js based on $": "基于 $ 提升 breakinfinity.js",
    "Boosts breakinfinity.js based on Research Points": "基于研究点提升 breakinfinity.js",
    "Boosts Cookie Bibles based on $": "基于 $ 提升 饼干 圣经",
    "Boosts Cookie Blood based on $": "基于 $ 提升 饼干之血",
    "Boosts Cookie Blood Gain based on Cookie Bibles": "根据曲奇圣经提高曲奇血量",
    "Boosts Cookie Blood Gain based on Cultists": "增加基于邪教徒的饼干血量",
    "Boosts Cookie Time based on Research Points": "根据研究点增加 饼干 时间",
    "Boosts Cookies based on $": "基于 $ 提升 饼干",
    "Boosts Cookies based on Cookie Ascensions, and start producing dimensional cookies": "基于 饼干转生 提升 饼干，并开始制作立体 饼干",
    "Boosts Cookies Based on Patreon Subscribers": "提升基于 Patreon 订阅者的 饼干",
    "Boosts Cookies based on Research Points": "根据研究点提升 饼干",
    "Boosts Cultists based on $": "基于 $ 提升邪教徒",
    "Boosts Dimensional Cookies based on Research Points": "根据研究点提升立体饼干",
    "Boosts Dimensional Sugar Lumps based on Research Points": "根据研究点提升立体糖块",
    "Boosts game.js based on $": "基于 $ 提升 game.js",
    "Boosts game.js based on Research Points": "基于研究点提升 game.js",
    "Boosts Heavenly Chips based on Research Points": "根据研究点提升天堂筹码",
    "Boosts Heavenly Chips based on Y Cookies": "基于 Y 饼干 提升天堂筹码",
    "Boosts Hevipelle Points based on $": "基于 $ 提升 赫维佩尔 点数",
    "Boosts Incremental Points based on $": "增加基于 $ 的增量点",
    "Boosts Incremental Points based on Research Points": "根据研究点增加增量点",
    "Boosts Patreon Subscribers based on $": "基于 $ 提升 Patreon 订阅者",
    "Boosts Patreon Subscribers based on Research Points": "根据研究点增加 Patreon 订阅者",
    "Boosts Points based on $": "根据 $ 提升点数",
    "Boosts Points based on Research Points": "根据研究点提升点",
    "Boosts Research Points based on $": "基于 $ 提升研究点数",
    "Boosts Sugar Lumps based on Research Points": "根据研究点增加糖块",
    "Boosts Sugar Lumps based on X Cookies": "基于 X 饼干 增加糖块",
    "Boosts X and Y Cookies based on Z Cookies": "基于 Z 饼干 提升 X 和 Y 饼干",
    "Boosts X Cookies based on X Cookie Grandmas": "基于 X 饼干老奶奶 提升 X 饼干",
    "Boosts X Cookies based on X Sugar Lumps": "基于 X 超级糖块 提升 X 饼干",
    "Boosts Y Cookies based on Y Cookie Grandmas": "基于 Y 饼干老奶奶 提升 Y 饼干",
    "Boosts Y Cookies based on Y Sugar Lumps": "基于 Y 糖块提升 Y 饼干",
    "Boosts Z Cookies based on Z Cookie Grandmas": "基于 Z 饼干老奶奶 提升 Z 饼干",
    "Boosts Z Cookies based on Z Sugar Lumps": "基于 Z 糖块提升 Z 饼干",
    "Break the laws of Cookie Physics": "打破饼干物理定律",
    "Cheap TV": "廉价电视",
    "Chromebook": "铬本",
    "Cookie Church": "饼干教堂",
    "Unlocks the Church": "解锁教堂",
    "Walk Forward": "向前走",
    "Walk Right": "向右走",
    "Week Long Vacation": "一周长假",
    "which multiplies Research Point and Cookie Time gain by x22,937": "将研究点数和 饼干 时间增益乘以 x22,937",
    "X cookie booster": "X 饼干助推器",
    "X Cookie Grandma": "X 饼干老奶奶",
    "X cookie synergy": "X 饼干协同作用",
    "X Cookie Wrinkler": "X 饼干皱纹机",
    "X Sugar Lumps are gained based on how much you traveled right, Y Sugar Lumps are gained based on how much you traveled forward, Z Sugar Lumps are gained based on both positions": "X 糖块是根据您正确行驶的距离获得的，Y 糖块是根据您前进的距离获得的，Z 糖块是根据两个位置获得的",
    "X sugar lumps booster": "X 糖块助推器",
    "Y cookie booster": "Y饼干助推器",
    "Y Cookie Grandma": "Y饼干奶奶",
    "Y cookie synergy": "Y 饼干协同作用",
    "Y Cookie Wrinkler": "Y 饼干皱纹机",
    "Y sugar lumps booster": "Y糖块助推器",
    "You Gain Dollars Based on the Log10(Log10)^0.5/250 of Points you have": "您根据您拥有的点数的 Log10(Log10)^0.5/250 获得 $",
    "Start Creating for autobuyer.js": "开始创建 autobuyer.js",
    "Start Creating for breakinfinity.js": "开始创建 breakinfinity.js",
    "Start Creating for game.js": "开始创建 game.js",
    "Timewalls": "时间墙",
    "Timewalls?": "时间墙？",
    "Unlock Timewalls": "解锁时间墙",
    "Life": "生活",
    "Multiplies Cookie Clicker Time gain by 1000x": "将 饼干点击器 时间增益乘以 1000 倍",
    "Polynomial Growth?": "多项式增长？",
    "Different from Cookie Clicker": "不同于 饼干点击器",
    "Game Development": "游戏开发",
    "Gives you Lines of Code for autobuyer.js based on Hevipelle Points": "为您提供基于 赫维佩尔 点数的 autobuyer.js 代码行",
    "Gives you Lines of Code for breakinfinity.js based on Hevipelle Points": "为您提供基于 赫维佩尔 点的 breakinfinity.js 代码行",
    "Gives you Lines of Code for game.js based on Hevipelle Points": "为您提供基于 赫维佩尔 点数的 game.js 代码行",
    "hevipelle points": "赫维佩尔点",
    "Antimatter Dimensions": "反物质维度",
    "Hevi Timewalls": "赫维时间墙",
    "Speed up the Timewalls": "加速时间墙",
    "Speeds up Timewall Seconds gain by 3x and Automatically generate Hevipelle points": "将 时间墙 秒数提高 3 倍并自动生成 赫维佩尔点数",
    "Timewalls boost Hevipelle points": "时间墙提升 赫维佩尔点数",
    "Unlocks a new Tab": "解锁新标签页",
    "Z cookie booster": "Z 饼干助推器",
    "Z Cookie Grandma": "Z 饼干奶奶",
    "Z cookie synergy": "Z 饼干协同作用",
    "Z Cookie Wrinkler": "Z 饼干起皱机",
    "The Final Cookie": "最后的饼干",
    "The New Testament": "新约",
    "Train your mind to make you automatically run": "训练你的头脑，让你自动奔跑",
    "Unlock the third quarter of this layer": "解锁本层的第三部分",
    "Exploration": "探索",
    "Extended Cookie Clicker": "扩展的饼干点击器",
    "Heralds": "使者",
    "Look for Dimensional Sugar Lumps?": "寻找维度糖块？",
    "Money is Power": "金钱就是力量",
    "Patreon (SUS": "Patreon (SUS",
    "Sorry no more cool function OmegaNum is STUPID and doesnt allow negatives! NOT COOL OMEGANUM": "抱歉，没有更酷的功能 OmegaNum 是愚蠢的，不允许否定！ 不酷的OMEGANUM",
    "Sugar Lump flavored Gatorade": "糖块味的佳得乐",
    "The Big Boost": "大提升",
    "Z sugar lumps booster": "Z 糖块助推器",
    "Cookie Ritual Activation": "饼干仪式激活",
    "Cookie Ritual Deactivation": "饼干仪式停用",
    "Cookie Trollge": "饼干小精灵",
    "Priest Grandma": "牧师老奶奶",
    "Revelation": "启示",
    "Sacrifice Cultists": "牺牲邪教徒",
    "SUMMON THE COOKIE GOD OF GODS": "召唤众神的饼干之神",
    "2000 Server Boosts to the Cookie Clicker discord server": "2000 服务器提升到 饼干点击器 discord服务器",
    "Research game.js Boost": "研究game.js 提升",
    "Research Heavenly Chips Boost": "研究天堂芯片助推器",
    "Research Incremental Point Boost": "研究增量点提升",
    "Research Patreon Boost": "研究 Patreon 提升",
    "Research Point Boost": "研究点提升",
    "Research Sugar Lumps Point Boost": "研究糖块点提升",
    "Research Tree": "研究树",
    "Router": "路由器",
    "Speed things up a bit": "加快速度",
    "Supermarket": "超级市场",
    "The List of Games Made": "制作的游戏列表",
    "Unlocks a new layer": "解锁新图层",
    "Unlocks a new tab": "解锁新标签",
    "Unlocks a new tab in the Cookie Clicker layer": "解锁 饼干点击器 层中的新选项卡",
    "Deposit Money into Savings Account": "将钱存入储蓄账户",
    "Finance": "金融",
    "Gaming PC": "游戏电脑",
    "Get Ready for another layer...": "准备好下一层...",
    "Gold Bar": "金条",
    "Grand Piano": "三角钢琴",
    "Headphones": "耳机",
    "Make another Game": "制作另一个游戏",
    "Notebook": "笔记本",
    "Oven": "烤箱",
    "Research $ Boost": "研究 $ 提升",
    "Research autobuyer.js Boost": "研究 autobuyer.js 提升",
    "Research breakinfinity.js Boost": "研究breakinfinity.js 提升",
    "Research Cookie Boost": "研究饼干提升",
    "Research Dimensional Cookies Boost": "研究 维度饼干 提升",
    "Research Dimensional Sugar Lumps Boost": "研究 维度糖块 提升",
    "1st Dimension": "第 1 维度",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Python': 'Python',
    'Git游戏': 'Git游戏',
    'Javascript': 'Javascript',
    "Github": "Github",
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "which multiplies incremental point gain by x": "它将增量点增益乘以 x",
    "Automation^": "自动化^",
    "Cookie Blood effect boosts Cultist, but exponentially drains Cookie Blood. Ritual Active: ": "饼干之血 效果会增强 邪教徒，但会以指数方式消耗 饼干之血。仪式活动：",
    "which multiplies Research Point and Cookie Time gain by x": "将研究点数和 饼干时间增益乘以 x",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    " Timewall Seconds": " 时间墙秒",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^Cost: (.+) Incremental Points\n(.+)Clicked: (.+) \n(.+) boost to 3rd, 4th, and 5th upgrades$/, '成本: $1 增量点\n$2点击数: $3 \n$4 提升到 第3、4、5 个升级'],
    [/^Cost: (.+) Incremental Points\n(.+)Ideas: (.+) \n(.+) boost to Incremental Points$/, '成本: $1 增量点\n$2想法: $3 \n$4 提升到 增量点'],
    [/^Cost: (.+) Incremental Points\n(.+)Art Added: (.+) \n(.+) boost to incremental points$/, '成本: $1 增量点\n$2添加艺术: $3 \n$4 提升到 增量点'],
    [/^Cost: (.+) Incremental Points\n(.+)Layers: (.+) \n(.+) boost to points\nResets everything but Upgrades$/, '成本: $1 增量点\n$2层: $3 \n$4 提升到 点数\n重置所有东西，除了升级'],
    [/^Cost: (.+) Incremental Points\n(.+)Different Industries: (.+) \n(.+) boost to the first (.+) buyables$/, '成本: $1 增量点\n$2不同产业: $3 \n$4 提升到 前 $5 可购买'],
    [/^Cost: (.+) Incremental Points\n(.+)Different Upgrades: (.+) \n(.+) boost to the fifth buyable$/, '成本: $1 增量点\n$2不同升级: $3 \n$4 提升到 第 5 可购买'],
    [/^Cost: (.+) Incremental Points\n(.+)Hours of Practice: (.+) \n(.+) boost to Points$/, '成本: $1 增量点\n$2练习时间: $3 \n$4 提升到 点数'],
    [/^Cost: (.+) Incremental Points\n(.+)Hours of Testing: (.+) \n(.+) boost to points$/, '成本: $1 增量点\n$2测试时间: $3 \n$4 提升到 点数'],
    [/^Cost: (.+) Incremental Points\n(.+)Lines of Code: (.+) \n(.+) boost to 3rd upgrade$/, '成本: $1 增量点\n$2代码行数: $3 \n$4 提升到 第3个 升级'],
    [/^Cost: (.+) Incremental Points\n(.+)Lines of Code: (.+) \n(.+) boost to (.+)th upgrade$/, '成本: $1 增量点\n$2代码行数: $3 \n$4 提升到 第$5个 升级'],
    [/^Cost: (.+) Antimatter\n(.+)Amount: (.+) 1st Dimensions\n(.+) multiplier$/, '成本: $1 反物质\n$2数量: $3 第 1 维度\n$4 乘数'],
    [/^Cost: (.+) Sugar Lumps\n(.+)Amount: (.+) \n(.+) boost to Dimensional Grandmas$/, '成本: $1 糖块\n$2数量: $3 \n$4 提升到 维度老奶奶'],
    [/^Cost: (.+) Sugar Lumps\n(.+)Amount: (.+) \n(.+) boost to autowalking$/, '成本: $1 糖块\n$2数量: $3 \n$4 提升到 自动行走'],
    [/^Cost: (.+) Sugar Lumps\n(.+)Amount: (.+) \n(.+) boost to Dimensional Cookies$/, '成本: $1 糖块\n$2数量: $3 \n$4 提升到 维度饼干'],
    [/^Cost: (.+) Cultists\n(.+)Amount: (.+) \n(.+) Cookie Blood per second$/, '成本: $1 邪教徒\n$2数量: $3 \n$4 提升到 饼干之血每秒'],
    [/^Cost: (.+) Cookie Bibles\n(.+)Amount: (.+) \n(.+) boost to Cookie Bible income$/, '成本: $1 饼干圣经\n$2数量: $3 \n$4 提升到 饼干圣经收入'],
    [/^Cost: (.+) Cookies\n(.+)Amount: (.+) \n(.+) boost to Cookies$/, '成本: $1 饼干\n$2数量: $3 \n$4 提升到 饼干'],
    [/^Cost: (.+) Cookies\n(.+)Amount: (.+) \n(.+) boost to Heavenly Chips$/, '成本: $1 饼干\n$2数量: $3 \n$4 提升到 天堂筹码'],
    [/^Cost: (.+) Cookies\n(.+)Amount: (.+) \n(.+) boost to X and Y Cookies$/, '成本: $1 饼干\n$2数量: $3 \n$4 提升到  X 和 Y 饼干'],
    [/^Cost: (.+)\$\n(.+)Amount: (.+) \n(.+) Patreon Subscribers per Second$/, '成本: $1 \$\n$2数量: $3 \n$4 Patreon 订阅者每秒'],
    [/^You have written (.+) Lines of Code for autobuyer.js and a (.+) boost to game.js Lines of Code$/, '您为 autobuyer.js 编写了 $1 行代码，并为 game.js 提升了 $2 代码行'],
    [/^You Have (.+) in your Savings Account and a (.+) boost to Points$/, '您的储蓄账户中有 $1，点数获得 $2 提升'],
    [/^You have (.+) Cookie Bibles and a (.+) boost to all layer 1 buyables except the last one$/, '您有 $1 饼干圣经和 $2 提升到所有第 1 层可购买，除了最后一个'],
    [/^You have written (.+) Lines of Code for breakinfinity.js and a (.+) boost to autobuyer.js Lines of Code$/, '您已经为 breakinfinity.js 编写了 $1 行代码，并且对 autobuyer.js 代码行进行了 $2 提升'],
    [/^You have written (.+) Lines of Code for game.js and a (.+) boost to Hevipelle points$/, '您已经为 game.js 编写了 $1 行代码，并且对 赫维佩尔点 提升了 $2 '],
    [/^You have developed (.+) Timewalls a (.+) boost to all Antimatter Dimensions lines of code$/, '您已经开发了 $1 时间墙，对所有 反物质维度 代码行进行了 $2 提升'],
    [/^You have (.+) Cookie Blood and a (.+) boost to Cookie Bible production$/, '你有 $1 饼干之血 和 $2 的 饼干圣经 产量提升'],
    [/^You have (.+) Patreon Subscribers and a (.+) boost to \$ gain$/, '您有 $1 名 Patreon 订阅者和 $2 \$收益提升'],
    [/^You have (.+) Cultists and a (.+) boost to all layer all Dimensional cookies and Lumps$/, '你有 $1 个 邪教徒 和 $2 提升到所有层，所有维度饼干 和 糖块'],
    [/^You walked (.+) Meters Right$/, '你向右走了 $1 米'],
    [/^You walked (.+) Meters Forward$/, '你向前走了 $1 米'],
    [/^Your Salary is (.+) per hour$/, '你的薪水是每小时 $1'],
    [/^You Specifically Have (.+)$/, '你具体来说有 $1'],
    [/^Cookie Clicker Time: (.+) years (.+) boost to Points$/, '饼干点击器 时间：$1 年 $2 提升到点数'],
    [/^You have (.+) Antimatter and a (.+) boost to Cookie Time$/, '您有 $1 反物质和 $2 的 饼干时间提升'],
    [/^You have (.+) Cookies$/, '你有 $1 饼干'],
    [/^You have (.+) Research Points$/, '你有 $1 研究点'],
    [/^You have (.+) Heavenly Chips$/, '你有 $1 天堂筹码'],
    [/^You have (.+) Sugar Lumps$/, '你有 $1 糖块'],
    [/^You have (.+) Wrinkler Juice, which produces free Grandmas$/, '你有 $1 皱纹果汁，产生免费的 老奶奶'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOM(.+)\/sec$/, '$1 OOM$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) per Second$/, '$1 每秒'],
    [/^([\d\.]+) incremental points$/, '$1 增量点'],
    [/^([\d\.]+) Cookies$/, '$1 饼干'],
    [/^([\d\.]+)\$ per second$/, '$1\$ 每秒'],
    [/^([\d\.]+)e([\d\.,]+) Cookies$/, '$1e$2 饼干'],
    [/^([\d\.]+)e([\d\.,]+) hevipelle points$/, '$1e$2 赫维佩尔点'],
    [/^([\d\.]+)e([\d\.,]+) incremental points$/, '$1e$2 增量点'],
    [/^([\d\.,]+) hevipelle points$/, '$1 赫维佩尔点'],
    [/^([\d\.,]+) per Second$/, '$1 每秒'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^\^(.+) boost to Point gain$/, '\*$1 提升到点数增益'],
    [/^x(.+) boost to Point gain, and unlock new stuff$/, 'x$1 提升到点数增益，并解锁新东西'],
    [/^Cost: (.+) Cultists$/, '成本：$1 邪教徒'],
    [/^Cost: (.+) Patreon Subscribers$/, '成本：$1 Patreon 订阅者'],
    [/^Cost: (.+) Research Points$/, '成本：$1 研究点'],
    [/^Cost: (.+) Heavenly Chips$/, '成本：$1 天堂筹码'],
    [/^Cost: (.+) Wrinkler Juice$/, '成本：$1 皱纹果汁'],
    [/^Cost: (.+) Cookie Bibles$/, '成本：$1 饼干圣经'],
    [/^Cost: (.+) Sugar Lumps$/, '成本：$1 糖块'],
    [/^Cost: (.+) Hevipelle Points$/, '成本：$1 赫维佩尔点数'],
    [/^Cost: (.+) hevipelle points$/, '成本：$1 赫维佩尔点数'],
    [/^Cost: (.+) incremental points$/, '成本：$1 增量点数'],
    [/^Cost: (.+) \$$/, '成本：$1 \$'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Cost: (.+) Cookies$/, '成本：$1 饼干'],
    [/^Req: (.+) \/ (.+) elves$/, '成本：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);