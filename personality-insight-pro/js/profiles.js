import { QUESTIONS, CONSISTENCY_PAIRS } from './questions.js';
import { ARCHETYPES, ARCHETYPE_DEFAULT, TRAIT_META, FACET_META, VALUE_META } from './questions.js';

const reverseMap = new Map();
QUESTIONS.forEach((q) => reverseMap.set(q.id, !!q.reverse));

export function checkConsistency(answers) {
  let violations = 0;

  for (const { a, b, maxDiff } of CONSISTENCY_PAIRS) {
    const va = answers[a];
    const vb = answers[b];
    if (va == null || vb == null) continue;

    const scoredA = reverseMap.get(a) ? 6 - va : va;
    const scoredB = reverseMap.get(b) ? 6 - vb : vb;
    if (Math.abs(scoredA - scoredB) > maxDiff) violations++;
  }

  const score = Math.max(0, 100 - violations * 18);
  let level, note;
  if (score >= 85) {
    level = '高';
    note = '作答一致性良好，结果可信度较高。';
  } else if (score >= 65) {
    level = '中';
    note = '部分题目存在不一致，建议结合整体趋势理解结果。';
  } else {
    level = '低';
    note = '作答一致性偏低，可能受当前情绪或随机作答影响，建议择日重测。';
  }

  return { score, level, note, violations };
}

export function deriveArchetype(flatScores) {
  const matches = ARCHETYPES.filter((a) => a.match(flatScores));
  if (matches.length === 0) return ARCHETYPE_DEFAULT;
  if (matches.length === 1) return matches[0];
  return matches.reduce((best, m) => {
    const score = (m.match.toString().match(/>=/g) || []).length;
    const bestScore = (best.match.toString().match(/>=/g) || []).length;
    return score > bestScore ? m : best;
  });
}

export function generateStrengthsWeaknesses(results) {
  const strengths = [];
  const growth = [];

  const check = (score, highMsg, lowMsg, hi = 65, lo = 35) => {
    if (score >= hi) strengths.push(highMsg);
    else if (score <= lo) growth.push(lowMsg);
  };

  const bf = results.bigFive;
  check(bf.openness, '强烈的好奇心和创造力', '可以尝试更多新体验来拓展视野');
  check(bf.conscientiousness, '卓越的自律和执行力', '建立轻量计划有助于实现长期目标');
  check(bf.extraversion, '出色的社交能量和表达力', '保护独处时间以恢复深度思考');
  check(bf.agreeableness, '天然的共情力和合作精神', '在必要时练习更直接地表达需求');
  check(bf.emotionalStability, '强大的心理韧性和冷静', '允许自己和他人表达脆弱');
  check(results.selfConcept.selfEsteem, '健康的自我价值感', '练习自我接纳，减少与他人比较');
  check(results.selfConcept.selfEfficacy, '对达成目标充满信心', '从小目标积累成功经验');
  check(results.emotion.reappraisal, '成熟的情绪调节策略', '学习认知重构技巧提升心理弹性');
  check(results.motivation.growthMindset, '相信能力可以发展', '将失败重新定义为学习机会');

  if (results.emotion.suppression >= 65) {
    growth.push('情绪表达抑制较高，长期可能增加压力，尝试安全地分享感受');
  }
  if (results.hexaco.honestyHumility >= 65) {
    strengths.push('真诚谦逊，是值得信赖的人');
  }

  return { strengths: strengths.slice(0, 5), growth: growth.slice(0, 5) };
}

export function generateHolisticSummary(results, archetype) {
  const topTraits = Object.entries(results.bigFive)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([k]) => TRAIT_META[k]?.name || k);

  const valueTop = Object.entries(results.values).sort(([, a], [, b]) => b - a)[0];
  const valueName = VALUE_META[valueTop[0]]?.name || '';
  const careerPart = results.career
    ? `职业兴趣代码 ${results.career.hollandCode}（${results.career.primary.name}），`
    : '';

  return `你是「${archetype.name}」——${archetype.desc} 你的大五人格以 ${topTraits.join('与')} 最为突出，核心价值导向为「${valueName}」。${careerPart}认知风格 ${results.cognitive.code}，依恋类型为 ${results.attachmentType.name}。`;
}

export function generateAdvancedInsights(results) {
  const insights = [];
  const { bigFive: bf, facets } = results;

  if (facets.intellect >= 65 && facets.aestheticOpenness < 45) {
    insights.push('你的开放性主要体现在智力探索而非审美体验——你是"思考者"而非"感受者"型开放人格。');
  }
  if (facets.industriousness >= 65 && facets.orderliness < 45) {
    insights.push('你勤勉但不太在意秩序——"高效混乱型"工作者，产出高但环境可能杂乱。');
  }
  if (facets.compassion >= 65 && facets.politeness < 45) {
    insights.push('你内心富有同情心但表达直接——"温暖的直率者"，关心他人但不回避冲突。');
  }

  const pf = results.motivation;
  if (pf.promotionFocus >= 60 && pf.preventionFocus >= 60) {
    insights.push('你同时被"获得"和"避免损失"驱动——决策中既积极又谨慎。');
  } else if (pf.promotionFocus >= 65) {
    insights.push('促进型动机主导——你更适合需要创新、突破和向上挑战的环境。');
  } else if (pf.preventionFocus >= 65) {
    insights.push('预防型动机主导——你更适合需要精确、合规和风险管控的角色。');
  }

  if (results.values.achievement >= 65 && bf.conscientiousness >= 60) {
    insights.push('成就价值观与尽责性高度一致——你有清晰的成就路径和实现能力。');
  }
  if (results.values.benevolence >= 65 && bf.agreeableness >= 60) {
    insights.push('仁慈价值观与人格高度契合——帮助他人的动机真实且持久。');
  }

  if (results.selfConcept.selfEsteem <= 40 && results.selfConcept.selfEfficacy >= 60) {
    insights.push('自我效能高但自尊偏低——你相信自己能做事，但可能不够认可自身价值。');
  }

  if (results.emotion.reappraisal >= 60 && results.emotion.suppression >= 60) {
    insights.push('你既善于内心调节又抑制外在表达——内在弹性强但他人可能难以读懂你。');
  }

  const ip = results.interpersonal;
  if (ip.collaborating >= 60 && ip.asserting >= 60) {
    insights.push('你在冲突中既能合作又能坚持——"灵活战略家"型的冲突处理者。');
  } else if (ip.avoiding >= 60) {
    insights.push('你倾向回避冲突——短期维护和谐，但长期可能积累未表达的需求。');
  }

  insights.push(`认知风格 ${results.cognitive.code} 是行为倾向估计，非固定标签。人在不同情境下可以灵活调用不同模式。`);

  return insights.slice(0, 8);
}

export function interpretFacet(key, score) {
  const meta = FACET_META[key];
  if (!meta) return '';
  if (score >= 65) return meta.highDesc;
  if (score <= 35) return meta.lowDesc;
  return `此子面处于中间水平（${score}分），在相关情境中可能展现不同侧面。`;
}

export function interpretValue(key, score) {
  const meta = VALUE_META[key];
  if (!meta) return '';
  if (score >= 65) return `「${meta.name}」是你的核心价值驱动——${meta.desc}。`;
  if (score <= 35) return `「${meta.name}」对你的驱动力较弱。`;
  return `「${meta.name}」对你有一定重要性（${score}分）。`;
}
