/** 扩展题库：BFAS / RSES / GSE / ERQ / TEIQue / Schwartz / RF / LoC / Growth / TKI */

export const EXTENDED_QUESTIONS = [
  // BFAS 人格面 (20)
  { id: 'F01', text: '我对复杂理论问题和抽象概念充满兴趣。', scale: 'intellect', facet: 'intellect', section: 'facets' },
  { id: 'F02', text: '我喜欢思考宇宙、存在等深层哲学问题。', scale: 'intellect', facet: 'intellect', section: 'facets' },
  { id: 'F03', text: '诗歌、音乐和艺术品常让我深受触动。', scale: 'aestheticOpenness', facet: 'aestheticOpenness', section: 'facets' },
  { id: 'F04', text: '我会被自然美景和设计美学深深吸引。', scale: 'aestheticOpenness', facet: 'aestheticOpenness', section: 'facets' },
  { id: 'F05', text: '我工作勤奋，很少偷懒或敷衍。', scale: 'industriousness', facet: 'industriousness', section: 'facets' },
  { id: 'F06', text: '一旦开始任务，我会坚持到完成为止。', scale: 'industriousness', facet: 'industriousness', section: 'facets' },
  { id: 'F07', text: '我喜欢把东西放在固定位置，保持整洁。', scale: 'orderliness', facet: 'orderliness', section: 'facets' },
  { id: 'F08', text: '我难以忍受混乱和无序的环境。', scale: 'orderliness', facet: 'orderliness', section: 'facets' },
  { id: 'F09', text: '我容易感到兴奋，对生活充满热情。', scale: 'enthusiasm', facet: 'enthusiasm', section: 'facets' },
  { id: 'F10', text: '我经常笑，也容易感染他人的快乐。', scale: 'enthusiasm', facet: 'enthusiasm', section: 'facets' },
  { id: 'F11', text: '我敢于在群体中表达不同意见。', scale: 'assertiveness', facet: 'assertiveness', section: 'facets' },
  { id: 'F12', text: '我习惯在团队中承担领导和决策角色。', scale: 'assertiveness', facet: 'assertiveness', section: 'facets' },
  { id: 'F13', text: '看到别人受苦，我会打从心底感到心疼。', scale: 'compassion', facet: 'compassion', section: 'facets' },
  { id: 'F14', text: '我很难对他人的困难无动于衷。', scale: 'compassion', facet: 'compassion', section: 'facets' },
  { id: 'F15', text: '我避免对他人无礼，即使对方先失礼。', scale: 'politeness', facet: 'politeness', section: 'facets' },
  { id: 'F16', text: '我尊重权威和既定规则，很少故意违反。', scale: 'politeness', facet: 'politeness', section: 'facets' },
  { id: 'F17', text: '我的情绪来得快去得也快，容易激动。', scale: 'volatility', facet: 'volatility', section: 'facets' },
  { id: 'F18', text: '小事也能让我瞬间情绪起伏。', scale: 'volatility', facet: 'volatility', section: 'facets' },
  { id: 'F19', text: '感到压力时，我倾向独处、减少社交。', scale: 'withdrawal', facet: 'withdrawal', section: 'facets' },
  { id: 'F20', text: '挫折后我容易陷入自我怀疑和退缩。', scale: 'withdrawal', facet: 'withdrawal', section: 'facets' },

  // RSES (10)
  { id: 'SE1', text: '总体而言，我对自己感到满意。', scale: 'selfEsteem', section: 'selfconcept' },
  { id: 'SE2', text: '有时我觉得自己一无是处。', scale: 'selfEsteem', reverse: true, section: 'selfconcept' },
  { id: 'SE3', text: '我觉得自己是一个有价值的人，至少与其他人平等。', scale: 'selfEsteem', section: 'selfconcept' },
  { id: 'SE4', text: '我希望能对自己更尊重一些。', scale: 'selfEsteem', reverse: true, section: 'selfconcept' },
  { id: 'SE5', text: '我时常感到自己是个失败者。', scale: 'selfEsteem', reverse: true, section: 'selfconcept' },
  { id: 'SE6', text: '我对自己持正面态度。', scale: 'selfEsteem', section: 'selfconcept' },
  { id: 'SE7', text: '总的来说，我对自己感到认可。', scale: 'selfEsteem', section: 'selfconcept' },
  { id: 'SE8', text: '我有时真的对自己感到失望。', scale: 'selfEsteem', reverse: true, section: 'selfconcept' },
  { id: 'SE9', text: '我有时觉得自己不如别人。', scale: 'selfEsteem', reverse: true, section: 'selfconcept' },
  { id: 'SE10', text: '我有时认为自己毫无用处。', scale: 'selfEsteem', reverse: true, section: 'selfconcept' },

  // GSE (6)
  { id: 'GSE1', text: '我总能找到办法解决困难的问题。', scale: 'selfEfficacy', section: 'selfconcept' },
  { id: 'GSE2', text: '即使有人反对我，我也能设法得到我想要的。', scale: 'selfEfficacy', section: 'selfconcept' },
  { id: 'GSE3', text: '对我来说，实现目标和获得结果很容易。', scale: 'selfEfficacy', section: 'selfconcept' },
  { id: 'GSE4', text: '我对自己高效处理意外事件的能力有信心。', scale: 'selfEfficacy', section: 'selfconcept' },
  { id: 'GSE5', text: '依靠我的机智，我知道如何应对困难处境。', scale: 'selfEfficacy', section: 'selfconcept' },
  { id: 'GSE6', text: '面临困难任务时，我能冷静地依靠自己。', scale: 'selfEfficacy', section: 'selfconcept' },

  // ERQ (8)
  { id: 'ER1', text: '我会换个角度思考，让自己从不愉快的情绪中平复。', scale: 'reappraisal', section: 'emotion' },
  { id: 'ER2', text: '我会思考当前处境中积极的一面，以调节情绪。', scale: 'reappraisal', section: 'emotion' },
  { id: 'ER3', text: '我通过重新解读情境的意义来改变自己的感受。', scale: 'reappraisal', section: 'emotion' },
  { id: 'ER4', text: '当我想要感受更多积极情绪时，我会改变思考方式。', scale: 'reappraisal', section: 'emotion' },
  { id: 'ER5', text: '我保持消极情绪不外露，不让别人看出来。', scale: 'suppression', section: 'emotion' },
  { id: 'ER6', text: '我把情绪藏在心里，不表现出来。', scale: 'suppression', section: 'emotion' },
  { id: 'ER7', text: '我控制面部表情，以免暴露真实感受。', scale: 'suppression', section: 'emotion' },
  { id: 'ER8', text: '即使内心波动，我也尽量表现得平静。', scale: 'suppression', section: 'emotion' },

  // EI (6)
  { id: 'EI1', text: '我清楚知道自己此刻的情绪状态。', scale: 'emotionalAwareness', section: 'emotion' },
  { id: 'EI2', text: '我善于感知他人未说出口的情绪。', scale: 'emotionalAwareness', section: 'emotion' },
  { id: 'EI3', text: '我能准确描述自己复杂的混合情绪。', scale: 'emotionalAwareness', section: 'emotion' },
  { id: 'EI4', text: '愤怒或焦虑时，我能选择恰当的表达方式。', scale: 'emotionManagement', section: 'emotion' },
  { id: 'EI5', text: '我能在压力下保持冷静，不被情绪冲昏头脑。', scale: 'emotionManagement', section: 'emotion' },
  { id: 'EI6', text: '我善于帮助身边的人处理他们的情绪问题。', scale: 'emotionManagement', section: 'emotion' },

  // Schwartz (8)
  { id: 'V1', text: '自由决定做什么对我很重要。', scale: 'selfDirection', section: 'values' },
  { id: 'V2', text: '帮助身边的人对我很重要。', scale: 'benevolence', section: 'values' },
  { id: 'V3', text: '被他人认可为成功人士对我很重要。', scale: 'achievement', section: 'values' },
  { id: 'V4', text: '生活稳定、没有意外对我很重要。', scale: 'security', section: 'values' },
  { id: 'V5', text: '遵循传统习俗和信仰对我很重要。', scale: 'tradition', section: 'values' },
  { id: 'V6', text: '寻求冒险和刺激的体验对我很重要。', scale: 'stimulation', section: 'values' },
  { id: 'V7', text: '社会公平、人人平等对我很重要。', scale: 'universalism', section: 'values' },
  { id: 'V8', text: '拥有影响力和权威对我很重要。', scale: 'power', section: 'values' },

  // Regulatory Focus (6)
  { id: 'RF1', text: '我专注于实现我的抱负和理想。', scale: 'promotionFocus', section: 'motivation' },
  { id: 'RF2', text: '我追求进步，希望比现状更好。', scale: 'promotionFocus', section: 'motivation' },
  { id: 'RF3', text: '我关注积极结果，思考如何"获得"。', scale: 'promotionFocus', section: 'motivation' },
  { id: 'RF4', text: '我专注于履行责任和避免出错。', scale: 'preventionFocus', section: 'motivation' },
  { id: 'RF5', text: '安全起见，我倾向于选择稳妥的方案。', scale: 'preventionFocus', section: 'motivation' },
  { id: 'RF6', text: '我关注如何避免失败和损失。', scale: 'preventionFocus', section: 'motivation' },

  // Locus + Growth (8)
  { id: 'LC1', text: '我的成功主要取决于自己的努力。', scale: 'internalLocus', section: 'motivation' },
  { id: 'LC2', text: '我能否达成目标，主要由我自己掌控。', scale: 'internalLocus', section: 'motivation' },
  { id: 'LC3', text: '运气在我的生活中起很大作用。', scale: 'internalLocus', reverse: true, section: 'motivation' },
  { id: 'LC4', text: '遇到挫折时，我倾向于归因于外部因素。', scale: 'internalLocus', reverse: true, section: 'motivation' },
  { id: 'GM1', text: '人的智力可以通过努力显著提升。', scale: 'growthMindset', section: 'motivation' },
  { id: 'GM2', text: '失败是学习和成长的机会，而非能力不足的证明。', scale: 'growthMindset', section: 'motivation' },
  { id: 'GM3', text: '天赋比后天努力更能决定一个人能走多远。', scale: 'growthMindset', reverse: true, section: 'motivation' },
  { id: 'GM4', text: '我可以通过练习大幅改善自己不擅长的领域。', scale: 'growthMindset', section: 'motivation' },

  // Interpersonal (6)
  { id: 'IP1', text: '冲突中，我尝试找到双方都能接受的方案。', scale: 'conflictCollaborating', section: 'interpersonal' },
  { id: 'IP2', text: '我重视在冲突中维护彼此的关系。', scale: 'conflictCollaborating', section: 'interpersonal' },
  { id: 'IP3', text: '冲突中我会坚持己见，直到对方让步。', scale: 'conflictAsserting', section: 'interpersonal' },
  { id: 'IP4', text: '我认为在争论中获胜很重要。', scale: 'conflictAsserting', section: 'interpersonal' },
  { id: 'IP5', text: '我倾向于回避冲突，能忍则忍。', scale: 'conflictAvoiding', section: 'interpersonal' },
  { id: 'IP6', text: '面对分歧，我通常选择保持沉默。', scale: 'conflictAvoiding', section: 'interpersonal' },
];
