import { QUESTIONS, TRAIT_META, ATTACHMENT_TYPES } from './questions.js';
import {
  checkConsistency,
  deriveArchetype,
  generateStrengthsWeaknesses,
  generateHolisticSummary,
  generateAdvancedInsights,
} from './profiles.js';
import { scoreRiasec, formatCareerReport } from './career.js';

const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 3);
const toPercent = (mean) => Math.round(((mean - 1) / 4) * 100);

export function scoreAssessment(answers) {
  const scales = {};

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw == null) continue;
    const scored = q.reverse ? 6 - raw : raw;
    if (!scales[q.scale]) scales[q.scale] = [];
    scales[q.scale].push(scored);
  }

  const pct = (key) => toPercent(avg(scales[key] || []));

  const neuroticismPct = pct('neuroticism');
  const bigFive = {
    extraversion: pct('extraversion'),
    agreeableness: pct('agreeableness'),
    conscientiousness: pct('conscientiousness'),
    emotionalStability: scales.neuroticism?.length ? 100 - neuroticismPct : pct('emotionalStability') || 50,
    openness: pct('openness'),
  };

  const facets = {
    intellect: pct('intellect'),
    aestheticOpenness: pct('aestheticOpenness'),
    industriousness: pct('industriousness'),
    orderliness: pct('orderliness'),
    enthusiasm: pct('enthusiasm'),
    assertiveness: pct('assertiveness'),
    compassion: pct('compassion'),
    politeness: pct('politeness'),
    volatility: pct('volatility'),
    withdrawal: pct('withdrawal'),
  };

  const hexaco = { honestyHumility: pct('honestyHumility') };

  const attachment = {
    anxiety: pct('attachmentAnxiety'),
    avoidance: pct('attachmentAvoidance'),
  };

  const selfConcept = {
    selfEsteem: pct('selfEsteem'),
    selfEfficacy: pct('selfEfficacy'),
  };

  const emotion = {
    reappraisal: pct('reappraisal'),
    suppression: pct('suppression'),
    emotionalAwareness: pct('emotionalAwareness'),
    emotionManagement: pct('emotionManagement'),
  };

  const values = {
    selfDirection: pct('selfDirection'),
    benevolence: pct('benevolence'),
    achievement: pct('achievement'),
    security: pct('security'),
    tradition: pct('tradition'),
    stimulation: pct('stimulation'),
    universalism: pct('universalism'),
    power: pct('power'),
  };

  const motivation = {
    promotionFocus: pct('promotionFocus'),
    preventionFocus: pct('preventionFocus'),
    internalLocus: pct('internalLocus'),
    growthMindset: pct('growthMindset'),
  };

  const interpersonal = {
    collaborating: pct('conflictCollaborating'),
    asserting: pct('conflictAsserting'),
    avoiding: pct('conflictAvoiding'),
  };

  const riasecDirect = {
    realistic: pct('realistic'),
    investigative: pct('investigative'),
    artistic: pct('artistic'),
    social: pct('social'),
    enterprising: pct('enterprising'),
    conventional: pct('conventional'),
  };

  const cognitive = deriveCognitiveStyle(bigFive, scales);
  const attachmentType = classifyAttachment(attachment.anxiety, attachment.avoidance);
  const consistency = checkConsistency(answers);

  const flatScores = {
    ...bigFive,
    ...facets,
    ...hexaco,
    ...values,
    ...motivation,
    ...selfConcept,
    thinkingStyle: cognitive.T,
    promotionFocus: motivation.promotionFocus,
    preventionFocus: motivation.preventionFocus,
    internalLocus: motivation.internalLocus,
    growthMindset: motivation.growthMindset,
    honestyHumility: hexaco.honestyHumility,
    reappraisal: emotion.reappraisal,
  };

  const archetype = deriveArchetype(flatScores);
  const strengthsWeaknesses = generateStrengthsWeaknesses({ bigFive, hexaco, selfConcept, emotion, motivation, interpersonal });

  const personalityBundle = { bigFive, facets, values, motivation, selfConcept, hexaco, emotion, interpersonal, cognitive };
  const career = scoreRiasec(riasecDirect, personalityBundle);

  const summary = generateHolisticSummary({ bigFive, values, cognitive, attachmentType, career }, archetype);
  const insights = generateAdvancedInsights({ bigFive, facets, values, motivation, selfConcept, emotion, interpersonal, cognitive, hexaco });

  return {
    bigFive,
    facets,
    hexaco,
    attachment,
    attachmentType,
    selfConcept,
    emotion,
    values,
    motivation,
    interpersonal,
    riasec: riasecDirect,
    career,
    cognitive,
    consistency,
    archetype,
    strengthsWeaknesses,
    summary,
    insights,
  };
}

function deriveCognitiveStyle(bigFive, scales) {
  const tfItems = scales.thinkingFeeling || [];
  const snItems = scales.sensingIntuition || [];
  const jpItems = scales.judgingPerceiving || [];

  const E = bigFive.extraversion;
  const N = Math.round(toPercent(avg(snItems)) * 0.6 + bigFive.openness * 0.4);
  const T = Math.round(toPercent(avg(tfItems)) * 0.5 + (100 - bigFive.agreeableness) * 0.5);
  const J = Math.round(toPercent(avg(jpItems)) * 0.5 + bigFive.conscientiousness * 0.5);

  const pick = (v, a, b) => (v >= 50 ? a : b);

  return {
    E, I: 100 - E,
    S: 100 - N, N,
    T, F: 100 - T,
    J, P: 100 - J,
    code: [pick(E, 'E', 'I'), pick(N, 'N', 'S'), pick(T, 'T', 'F'), pick(J, 'J', 'P')].join(''),
    dimensions: {
      'E/I': { left: '内向 I', right: '外向 E', value: E },
      'S/N': { left: '实感 S', right: '直觉 N', value: N },
      'T/F': { left: '情感 F', right: '思维 T', value: T },
      'J/P': { left: '感知 P', right: '判断 J', value: J },
    },
  };
}

function classifyAttachment(anxiety, avoidance) {
  const high = (v) => v >= 55;
  const low = (v) => v < 45;
  if (low(anxiety) && low(avoidance)) return ATTACHMENT_TYPES.secure;
  if (high(anxiety) && low(avoidance)) return ATTACHMENT_TYPES.anxious;
  if (low(anxiety) && high(avoidance)) return ATTACHMENT_TYPES.avoidant;
  return ATTACHMENT_TYPES.fearful;
}

export function interpretTrait(key, score) {
  const meta = TRAIT_META[key];
  if (!meta) return '';
  if (score >= 65) return meta.highDesc;
  if (score <= 35) return meta.lowDesc;
  return `你的${meta.name}处于中间水平（${score}分），在不同情境中可能展现${meta.low}和${meta.high}两面的特征。`;
}

export function buildRadarPoints(scores, keys, cx, cy, r) {
  const n = keys.length;
  return keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const value = (scores[key] ?? 50) / 100;
    return `${cx + Math.cos(angle) * r * value},${cy + Math.sin(angle) * r * value}`;
  }).join(' ');
}

export function buildRadarAxes(keys, cx, cy, r) {
  const n = keys.length;
  return keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lx = cx + Math.cos(angle) * (r + 22);
    const ly = cy + Math.sin(angle) * (r + 22);
    return {
      key,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      lx, ly,
      label: TRAIT_META[key]?.name || key,
    };
  });
}

export function generateReportText(r) {
  const lines = ['真我洞察 · 全面人格评估报告', '='.repeat(44), ''];
  lines.push(`【人格原型】${r.archetype.name}`);
  lines.push(r.archetype.desc);
  lines.push('');
  lines.push(`【作答一致性】${r.consistency.score}分 (${r.consistency.level}) — ${r.consistency.note}`);
  lines.push('');
  lines.push('【大五人格】');
  Object.entries(r.bigFive).forEach(([k, v]) => lines.push(`  ${TRAIT_META[k]?.name || k}: ${v}%`));
  lines.push('');
  lines.push('【人格面 BFAS】');
  Object.entries(r.facets).forEach(([k, v]) => lines.push(`  ${k}: ${v}%`));
  lines.push('');
  lines.push(`【HEXACO】诚实-谦逊: ${r.hexaco.honestyHumility}%`);
  lines.push('');
  lines.push('【依恋风格】');
  lines.push(`  焦虑: ${r.attachment.anxiety}%  回避: ${r.attachment.avoidance}%`);
  lines.push(`  类型: ${r.attachmentType.name}`);
  lines.push('');
  lines.push('【自我概念】');
  lines.push(`  自尊: ${r.selfConcept.selfEsteem}%  自我效能: ${r.selfConcept.selfEfficacy}%`);
  lines.push('');
  lines.push('【情绪能力】');
  Object.entries(r.emotion).forEach(([k, v]) => lines.push(`  ${TRAIT_META[k]?.name || k}: ${v}%`));
  lines.push('');
  lines.push('【核心价值】');
  Object.entries(r.values).forEach(([k, v]) => lines.push(`  ${k}: ${v}%`));
  lines.push('');
  lines.push('【动机取向】');
  Object.entries(r.motivation).forEach(([k, v]) => lines.push(`  ${TRAIT_META[k]?.name || k}: ${v}%`));
  lines.push('');
  lines.push('【人际风格】');
  lines.push(`  合作: ${r.interpersonal.collaborating}%  竞争: ${r.interpersonal.asserting}%  回避: ${r.interpersonal.avoiding}%`);
  lines.push('');
  lines.push(`【认知风格】${r.cognitive.code}`);
  lines.push('');
  lines.push(formatCareerReport(r.career));
  lines.push('');
  lines.push('【核心优势】');
  r.strengthsWeaknesses.strengths.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
  lines.push('');
  lines.push('【成长方向】');
  r.strengthsWeaknesses.growth.forEach((g, i) => lines.push(`  ${i + 1}. ${g}`));
  lines.push('');
  lines.push('【深度洞察】');
  r.insights.forEach((ins, i) => lines.push(`  ${i + 1}. ${ins}`));
  lines.push('');
  lines.push('—— 本报告仅供自我探索参考，不能替代专业心理评估。');
  return lines.join('\n');
}
