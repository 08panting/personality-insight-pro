export const LIKERT_LABELS = [
  '完全不符合',
  '不太符合',
  '一般',
  '比较符合',
  '完全符合',
];

export const SECTIONS = {
  bigfive: { label: '大五人格', order: 0, desc: 'IPIP-NEO · 人格心理学金标准' },
  facets: { label: '人格面', order: 1, desc: 'BFAS · 大五各维度的精细子面' },
  hexaco: { label: 'HEXACO', order: 2, desc: '诚实-谦逊 · 道德人格维度' },
  attachment: { label: '依恋风格', order: 3, desc: 'ECR-R · 亲密关系模式' },
  selfconcept: { label: '自我概念', order: 4, desc: 'RSES + GSE · 自尊与自我效能' },
  emotion: { label: '情绪能力', order: 5, desc: 'ERQ + TEIQue · 情绪智力与调节' },
  values: { label: '核心价值', order: 6, desc: 'Schwartz PVQ · 驱动人生的价值导向' },
  motivation: { label: '动机取向', order: 7, desc: '调节焦点 + 内控 + 成长思维' },
  interpersonal: { label: '人际风格', order: 8, desc: 'TKI · 冲突与社交应对模式' },
  career: { label: '职业兴趣', order: 9, desc: 'Holland RIASEC · 职业兴趣六维模型' },
  cognitive: { label: '认知风格', order: 10, desc: '认知加工偏好（实证推导）' },
};

export const TRAIT_META = {
  extraversion: { name: '外向性', color: '#e0a050', low: '内向型', high: '外向型', lowDesc: '你从独处中获得能量，偏好深度交流，思考后再表达。', highDesc: '你从社交中获得能量，善于表达，享受多样的人际体验。' },
  agreeableness: { name: '宜人性', color: '#7eb88a', low: '独立型', high: '亲和型', lowDesc: '你重视客观标准与效率，在决策中优先考虑逻辑。', highDesc: '你富有同理心，重视和谐，乐于合作并关心他人感受。' },
  conscientiousness: { name: '尽责性', color: '#6a9fd4', low: '灵活型', high: '严谨型', lowDesc: '你适应力强，喜欢灵活即兴，在开放环境中表现更好。', highDesc: '你自律有条理，设定目标并坚持完成，注重细节与可靠。' },
  emotionalStability: { name: '情绪稳定性', color: '#b08ad4', low: '敏感型', high: '稳定型', lowDesc: '你对情绪变化较敏感，体验情感的深度和强度更高。', highDesc: '你情绪平稳，面对压力时保持冷静，恢复力强。' },
  openness: { name: '开放性', color: '#d4748a', low: '务实型', high: '探索型', lowDesc: '你偏好具体实用的方法，重视已被验证的路径。', highDesc: '你好奇心强，富有想象力，乐于新体验与抽象思考。' },
  honestyHumility: { name: '诚实-谦逊', color: '#74c4b0', low: '自信型', high: '谦逊型', lowDesc: '你自信果断，重视成就与影响力，在竞争中积极争取。', highDesc: '你真诚公平、谦逊，重视内在价值而非外在名利。' },
  attachmentAnxiety: { name: '依恋焦虑', color: '#d4a574' },
  attachmentAvoidance: { name: '依恋回避', color: '#74a0d4' },
  selfEsteem: { name: '自尊水平', color: '#c4a574', low: '待提升', high: '健康', lowDesc: '你有时怀疑自身价值，容易受外界评价影响。', highDesc: '你拥有稳定的自我价值感，能接纳自己的优点与不足。' },
  selfEfficacy: { name: '自我效能', color: '#6a9fd4', low: '谨慎型', high: '自信型', lowDesc: '面对挑战时你可能低估自己的能力，需要更多成功经验积累。', highDesc: '你相信自己有能力应对困难，主动迎接挑战并坚持努力。' },
  reappraisal: { name: '认知重评', color: '#7eb88a', low: '直觉反应', high: '主动调节', lowDesc: '你较少主动改变对事件的解读方式，情绪受情境直接影响较多。', highDesc: '你善于从不同角度理解事件，主动调整情绪反应，心理弹性强。' },
  suppression: { name: '表达抑制', color: '#c47e7e', low: '自然表达', high: '高度抑制', lowDesc: '你能自然表达情绪，较少刻意隐藏内心感受。', highDesc: '你倾向于隐藏情绪不外露，长期可能增加内在压力。' },
  emotionalAwareness: { name: '情绪觉察', color: '#b08ad4', low: '钝感型', high: '敏锐型', lowDesc: '你对情绪的识别相对粗略，更关注外部事件本身。', highDesc: '你能精准识别自己和他人的情绪，是情商的重要基础。' },
  emotionManagement: { name: '情绪管理', color: '#74c4b0', low: '待发展', high: '成熟', lowDesc: '压力下你可能被情绪主导，事后才意识到反应过激。', highDesc: '你能在情绪波动时保持一定掌控力，选择恰当的表达方式。' },
  promotionFocus: { name: '促进焦点', color: '#e0a050', low: '低', high: '高', lowDesc: '你较少被"获得"和"成就"驱动。', highDesc: '你被成长、收获和积极结果驱动，乐于冒险争取更好。' },
  preventionFocus: { name: '预防焦点', color: '#6a9fd4', low: '低', high: '高', lowDesc: '你较少被"避免损失"驱动。', highDesc: '你重视安全与稳定，倾向于规避风险和错误。' },
  internalLocus: { name: '内控倾向', color: '#74c4b0', low: '外控型', high: '内控型', lowDesc: '你倾向于认为结果由外部因素（运气、他人）决定。', highDesc: '你相信自己能影响结果，主动承担责任并采取行动。' },
  growthMindset: { name: '成长思维', color: '#d4748a', low: '固定型', high: '成长型', lowDesc: '你倾向于认为能力是天生的，失败意味着能力不足。', highDesc: '你相信能力可以通过努力发展，把挫折视为学习机会。' },
  conflictCollaborating: { name: '合作型冲突', color: '#7eb88a', low: '低', high: '高', lowDesc: '冲突中你较少寻求双赢方案。', highDesc: '你善于在冲突中寻找满足双方需求的解决方案。' },
  conflictAsserting: { name: '竞争型冲突', color: '#e0a050', low: '低', high: '高', lowDesc: '你在冲突中倾向于退让或回避。', highDesc: '你在冲突中坚定捍卫自己的立场和利益。' },
};

export const FACET_META = {
  intellect: { name: '智力探索', parent: 'openness', color: '#d4748a', highDesc: '你热衷抽象思考、概念分析和智力挑战。', lowDesc: '你更关注实际应用，对纯理论讨论兴趣有限。' },
  aestheticOpenness: { name: '审美开放', parent: 'openness', color: '#e0889a', highDesc: '你对艺术、美感和感官体验有强烈的欣赏力。', lowDesc: '你对美学体验不太敏感，偏好功能性的事物。' },
  industriousness: { name: '勤勉性', parent: 'conscientiousness', color: '#6a9fd4', highDesc: '你工作努力、追求成就，有强烈的完成动力。', lowDesc: '你不太被"完成任务"本身驱动，更随兴而为。' },
  orderliness: { name: '秩序性', parent: 'conscientiousness', color: '#5a8fc4', highDesc: '你注重整洁、结构和规则，喜欢一切井井有条。', lowDesc: '你对秩序要求不高，在有些混乱中也能自在工作。' },
  enthusiasm: { name: '热情性', parent: 'extraversion', color: '#e0a050', highDesc: '你热情开朗，容易感受到快乐和兴奋。', lowDesc: '你的情绪表达较为克制，很少表现出极度兴奋。' },
  assertiveness: { name: '果断性', parent: 'extraversion', color: '#d09040', highDesc: '你敢于表达观点、引领方向，在群体中常担任主导角色。', lowDesc: '你倾向于倾听而非主导，在群体中更偏跟随者。' },
  compassion: { name: '同情心', parent: 'agreeableness', color: '#7eb88a', highDesc: '你对他人痛苦高度敏感，天然想要帮助和安慰。', lowDesc: '你更关注事实而非感受，较少被他人情绪牵动。' },
  politeness: { name: '礼貌性', parent: 'agreeableness', color: '#6ea87a', highDesc: '你尊重社会规范，避免冲突和不礼貌行为。', lowDesc: '你更直接坦率，不太在意社交礼仪的约束。' },
  volatility: { name: '情绪易变', parent: 'neuroticism', color: '#b08ad4', highDesc: '你的情绪反应快速且强烈，容易因小事波动。', lowDesc: '你的情绪反应平缓，很少因琐事产生剧烈波动。' },
  withdrawal: { name: '退缩倾向', parent: 'neuroticism', color: '#a07ac4', highDesc: '压力下你倾向退缩、自我怀疑和社交回避。', lowDesc: '压力下你仍能保持行动力和社交意愿。' },
};

export const VALUE_META = {
  selfDirection: { name: '自我导向', color: '#d4748a', desc: '独立思考和创造，按自己的方式生活' },
  benevolence: { name: '仁慈', color: '#7eb88a', desc: '关心身边人的福祉，维护亲密关系' },
  achievement: { name: '成就', color: '#e0a050', desc: '通过能力展示获得社会认可和个人成功' },
  security: { name: '安全', color: '#6a9fd4', desc: '追求稳定、和谐与可预测的环境' },
  tradition: { name: '传统', color: '#9a9288', desc: '尊重文化、宗教和家族习俗' },
  stimulation: { name: '刺激', color: '#c47e7e', desc: '追求新奇、冒险和感官体验' },
  universalism: { name: '普世主义', color: '#74c4b0', desc: '理解、包容和保护所有人及自然' },
  power: { name: '权力', color: '#d09040', desc: '追求社会地位和对他人的影响力' },
};

export const ATTACHMENT_TYPES = {
  secure: { name: '安全型依恋', desc: '你在亲密关系中感到舒适，既能享受亲密也能保持独立。你信任伴侣，能有效沟通情感需求。' },
  anxious: { name: '焦虑型依恋', desc: '你渴望亲密但担心被抛弃，可能需要更多安全感确认。你情感投入深，对关系信号非常敏感。' },
  avoidant: { name: '回避型依恋', desc: '你重视独立和自给自足，可能在亲密关系中保持情感距离。你不太习惯依赖他人或展示脆弱。' },
  fearful: { name: '恐惧-回避型', desc: '你同时渴望亲密又害怕受伤，在靠近和退缩之间摇摆。理解这种模式是建立安全关系的第一步。' },
};

export const ARCHETYPES = [
  { id: 'visionary', name: '远见探索者', match: (s) => s.openness >= 60 && s.intellect >= 60 && s.promotionFocus >= 55, desc: '你以好奇心和智力驱动，不断拓展认知边界，在创新和战略思考中发光。' },
  { id: 'architect', name: '精密建造者', match: (s) => s.conscientiousness >= 65 && s.orderliness >= 60 && s.industriousness >= 60, desc: '你以严谨和系统著称，善于将愿景转化为可执行的完美计划。' },
  { id: 'harmonizer', name: '和谐共情者', match: (s) => s.agreeableness >= 65 && s.compassion >= 65 && s.benevolence >= 60, desc: '你天然感知他人需求，是团队中的情感纽带和冲突调解者。' },
  { id: 'catalyst', name: '活力催化剂', match: (s) => s.extraversion >= 65 && s.enthusiasm >= 65 && s.assertiveness >= 55, desc: '你的热情和表达力感染周围的人，善于激发团队能量。' },
  { id: 'guardian', name: '稳健守护者', match: (s) => s.emotionalStability >= 60 && s.security >= 60 && s.preventionFocus >= 55, desc: '你可靠、稳定，是危机中的定海神针，重视责任和安全。' },
  { id: 'analyst', name: '冷静分析师', match: (s) => s.thinkingStyle >= 60 && s.internalLocus >= 60 && s.emotionalStability >= 55, desc: '你以逻辑和内控力驱动决策，在复杂问题中保持客观清晰。' },
  { id: 'idealist', name: '理想主义者', match: (s) => s.universalism >= 60 && s.honestyHumility >= 60 && s.growthMindset >= 60, desc: '你追求意义和正直，相信世界可以变得更好，并愿意为此行动。' },
  { id: 'adapter', name: '灵活适应者', match: (s) => s.openness >= 45 && s.conscientiousness <= 45 && s.reappraisal >= 55, desc: '你在变化中如鱼得水，善于即兴发挥和情绪调节。' },
  { id: 'achiever', name: '成就驱动者', match: (s) => s.achievement >= 65 && s.selfEfficacy >= 60 && s.industriousness >= 60, desc: '你目标明确、效能感强，持续追求个人突破和社会认可。' },
  { id: 'reflective', name: '深度内省者', match: (s) => s.extraversion <= 40 && s.openness >= 55 && s.emotionalAwareness >= 60, desc: '你享受独处思考，对内心世界和深层意义有持续探索。' },
];

export const ARCHETYPE_DEFAULT = { id: 'balanced', name: '多元平衡者', desc: '你的人格特质分布较为均衡，没有单一维度极端主导。这意味着你在不同情境中能灵活切换模式，适应性是你的核心优势。' };
