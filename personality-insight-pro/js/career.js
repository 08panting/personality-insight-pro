import { RIASEC_META, CAREER_DATABASE } from './data/careers.js';

const RIASEC_KEYS = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];

/** 从人格得分推导 RIASEC 估计（占 25% 权重，用于交叉验证） */
export function deriveRiasecFromPersonality(results) {
  const { bigFive: bf, facets, values, motivation } = results;

  return {
    realistic: clamp(bf.conscientiousness * 0.3 + (100 - bf.openness) * 0.3 + facets.orderliness * 0.2 + values.security * 0.2),
    investigative: clamp(bf.openness * 0.35 + facets.intellect * 0.35 + (100 - bf.extraversion) * 0.15 + motivation.internalLocus * 0.15),
    artistic: clamp(bf.openness * 0.35 + facets.aestheticOpenness * 0.35 + values.selfDirection * 0.2 + values.stimulation * 0.1),
    social: clamp(bf.agreeableness * 0.3 + facets.compassion * 0.3 + bf.extraversion * 0.2 + values.benevolence * 0.2),
    enterprising: clamp(bf.extraversion * 0.25 + facets.assertiveness * 0.25 + values.achievement * 0.25 + values.power * 0.15 + motivation.promotionFocus * 0.1),
    conventional: clamp(bf.conscientiousness * 0.3 + facets.orderliness * 0.3 + motivation.preventionFocus * 0.2 + values.security * 0.2),
  };
}

export function scoreRiasec(directScores, personalityResults) {
  const derived = deriveRiasecFromPersonality(personalityResults);
  const blended = {};

  for (const key of RIASEC_KEYS) {
    blended[key] = Math.round(directScores[key] * 0.75 + derived[key] * 0.25);
  }

  const sorted = RIASEC_KEYS
    .map((key) => ({ key, score: blended[key], ...RIASEC_META[key] }))
    .sort((a, b) => b.score - a.score);

  const hollandCode = sorted.slice(0, 3).map((t) => t.code).join('');
  const primary = sorted[0];
  const secondary = sorted[1];

  return {
    scores: blended,
    sorted,
    hollandCode,
    primary,
    secondary,
    recommendations: matchCareers(blended, hollandCode, personalityResults),
    workEnvironment: describeWorkEnvironment(sorted),
    careerInsights: generateCareerInsights(blended, sorted, personalityResults),
  };
}

function matchCareers(scores, hollandCode, results) {
  const codeLetters = hollandCode.split('');
  const topKeys = RIASEC_KEYS.filter((k) => scores[k] >= 50).sort((a, b) => scores[b] - scores[a]);

  const scored = CAREER_DATABASE.map((career) => {
    let fit = 0;
    const careerCodes = career.codes.split('');

    // Holland 代码字母匹配（位置越前权重越高）
    careerCodes.forEach((letter, i) => {
      const key = letterToKey(letter);
      if (key) fit += scores[key] * (3 - i) * 0.15;
    });

    // 标签维度匹配
    career.tags.forEach((tag) => {
      fit += scores[tag] * 0.25;
    });

    // 代码字母重叠
    codeLetters.forEach((letter, i) => {
      if (careerCodes.includes(letter)) fit += (3 - i) * 8;
    });

    // 人格微调
    if (results.bigFive.conscientiousness >= 65 && career.tags.includes('conventional')) fit += 5;
    if (results.bigFive.openness >= 65 && career.tags.includes('investigative')) fit += 5;
    if (results.bigFive.agreeableness >= 65 && career.tags.includes('social')) fit += 5;

    return { ...career, fit: Math.round(fit) };
  });

  return scored.sort((a, b) => b.fit - a.fit).slice(0, 8);
}

function describeWorkEnvironment(sorted) {
  const top = sorted.slice(0, 2);
  return {
    ideal: top.map((t) => t.env).join('；'),
    avoid: getAvoidEnvironments(sorted),
    summary: `最适合 ${top[0].name}（${top[0].code}）与 ${top[1].name}（${top[1].code}）交叉的环境——${top[0].env}。`,
  };
}

function getAvoidEnvironments(sorted) {
  const bottom = sorted[sorted.length - 1];
  const avoidMap = {
    realistic: '纯办公室文案、长期脱离实操',
    investigative: '高度重复、无需思考的流水线工作',
    artistic: '严格僵化、无创意空间的流程岗位',
    social: '长期孤立、缺少人际互动的岗位',
    enterprising: '无决策权、纯执行的后台岗位',
    conventional: '高度不确定、无规则可循的创业早期',
  };
  return avoidMap[bottom.key] || '与核心兴趣完全不符的环境';
}

function generateCareerInsights(scores, sorted, results) {
  const insights = [];
  const [p, s] = sorted;

  insights.push(`你的 Holland 代码为 ${sorted.slice(0, 3).map((t) => t.code).join('')}，核心兴趣类型是「${p.name}」，次要类型是「${s.name}」。`);

  // 相邻 hexagon types
  const adjacent = areAdjacent(p.key, s.key);
  if (adjacent) {
    insights.push(`${p.name}与${s.name}在 Holland 六边形上相邻，是常见且稳定的兴趣组合，职业选择面较广。`);
  } else {
    insights.push(`${p.name}与${s.name}在 Holland 六边形上相对，代表你兼具两种不同取向——适合跨界或复合型岗位。`);
  }

  if (results.bigFive.conscientiousness >= 65 && p.key === 'artistic') {
    insights.push('你的高尽责性与艺术型兴趣结合——「结构化创意者」，适合设计管理、建筑等需创意+执行力的领域。');
  }
  if (results.bigFive.extraversion >= 65 && p.key === 'investigative') {
    insights.push('外向 + 研究型组合——适合需要大量沟通的研究岗位，如用户研究、科学传播、咨询分析。');
  }
  if (results.values.achievement >= 65 && scores.enterprising >= 60) {
    insights.push('成就价值观与企业型兴趣一致——商业、管理、创业路径与内在动机高度契合。');
  }
  if (results.selfConcept.selfEfficacy >= 65) {
    insights.push('较高的自我效能感支持你在兴趣方向上主动尝试和转型，建议从小项目或副业开始验证。');
  }

  const spread = sorted[0].score - sorted[sorted.length - 1].score;
  if (spread < 20) {
    insights.push('六项兴趣得分较为均衡——你是「全能型」选手，可通过价值观和人格特质进一步缩小方向。');
  }

  return insights.slice(0, 5);
}

function areAdjacent(a, b) {
  const order = RIASEC_KEYS;
  const ia = order.indexOf(a);
  const ib = order.indexOf(b);
  const diff = Math.abs(ia - ib);
  return diff === 1 || diff === 5;
}

function letterToKey(letter) {
  const map = { R: 'realistic', I: 'investigative', A: 'artistic', S: 'social', E: 'enterprising', C: 'conventional' };
  return map[letter];
}

function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }

export function formatCareerReport(career) {
  const lines = [];
  lines.push('【职业兴趣 RIASEC】');
  lines.push(`  Holland 代码: ${career.hollandCode}`);
  career.sorted.forEach((t) => lines.push(`  ${t.name} (${t.code}): ${t.score}%`));
  lines.push('');
  lines.push('【推荐职业】');
  career.recommendations.forEach((c, i) => lines.push(`  ${i + 1}. ${c.title}（${c.codes}）— 匹配度 ${c.fit} — ${c.desc}`));
  lines.push('');
  lines.push('【理想工作环境】');
  lines.push(`  ${career.workEnvironment.summary}`);
  lines.push(`  建议避免: ${career.workEnvironment.avoid}`);
  lines.push('');
  lines.push('【职业洞察】');
  career.careerInsights.forEach((ins, i) => lines.push(`  ${i + 1}. ${ins}`));
  return lines.join('\n');
}
