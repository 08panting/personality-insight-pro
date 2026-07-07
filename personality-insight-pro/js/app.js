import { QUESTIONS, LIKERT_LABELS, SECTIONS, TRAIT_META, FACET_META, VALUE_META, RIASEC_META } from './questions.js';
import {
  scoreAssessment,
  interpretTrait,
  buildRadarPoints,
  buildRadarAxes,
  generateReportText,
} from './scoring.js';
import { interpretFacet, interpretValue } from './profiles.js';

const STORAGE_KEY = 'personality-insight-v4';
const ASSESSMENT_MODES = {
  quick: {
    label: '50 题快速版',
    reportName: '快速报告',
    questions: QUESTIONS.filter((q) => q.section === 'bigfive'),
  },
  full: {
    label: '188 题详细版',
    reportName: '完整报告',
    questions: QUESTIONS,
  },
};

let assessmentMode = 'full';
let selectedQuestions = ASSESSMENT_MODES.full.questions;

let currentIndex = 0;
/** @type {Record<string, number>} */
let answers = {};
let lastSection = null;
let latestResult = null;

const $ = (sel) => document.querySelector(sel);
const landing = $('#landing');
const assessment = $('#assessment');
const results = $('#results');

function showView(view) {
  [landing, assessment, results].forEach((v) => v.classList.remove('active'));
  view.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setAssessmentMode(mode) {
  assessmentMode = ASSESSMENT_MODES[mode] ? mode : 'full';
  selectedQuestions = ASSESSMENT_MODES[assessmentMode].questions;
}

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex, assessmentMode })); } catch { /* */ }
}

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (data?.answers && Object.keys(data.answers).length > 0) {
      setAssessmentMode(data.assessmentMode || 'full');
      answers = Object.fromEntries(Object.entries(data.answers).filter(([id]) => selectedQuestions.some((q) => q.id === id)));
      currentIndex = Math.min(data.currentIndex || 0, selectedQuestions.length - 1);
      return true;
    }
  } catch { /* */ }
  return false;
}

function clearProgress() {
  answers = {};
  currentIndex = 0;
  lastSection = null;
  latestResult = null;
  setAssessmentMode('full');
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
}

function getSectionProgress() {
  const sectionIds = [...new Set(selectedQuestions.map((q) => q.section))];
  const current = selectedQuestions[currentIndex]?.section;
  const idx = sectionIds.indexOf(current);
  return { current: idx + 1, total: sectionIds.length, id: current };
}

function renderQuestion() {
  const q = selectedQuestions[currentIndex];
  const container = $('#question-container');
  const section = SECTIONS[q.section];
  const secProg = getSectionProgress();

  $('#progress-fill').style.width = `${((currentIndex + 1) / selectedQuestions.length) * 100}%`;
  $('#progress-text').textContent = `${currentIndex + 1} / ${selectedQuestions.length}`;
  $('#section-label').textContent = `${ASSESSMENT_MODES[assessmentMode].label} · ${section.label} (${secProg.current}/${secProg.total})`;
  $('.progress-bar').setAttribute('aria-valuenow', String(Math.round(((currentIndex + 1) / selectedQuestions.length) * 100)));

  // Section transition banner
  const showTransition = lastSection && lastSection !== q.section;
  lastSection = q.section;

  container.innerHTML = `
    ${showTransition ? `
      <div class="section-transition">
        <span class="section-transition-tag">进入新模块</span>
        <h3>${section.label}</h3>
        <p>${section.desc}</p>
      </div>
    ` : ''}
    <p class="question-number">第 ${currentIndex + 1} 题 · ${section.label}</p>
    <p class="question-text">${q.text}</p>
    <div class="likert-scale">
      <div class="likert-labels">
        <span>${LIKERT_LABELS[0]}</span>
        <span>${LIKERT_LABELS[4]}</span>
      </div>
      <div class="likert-options" role="radiogroup" aria-label="请选择符合程度">
        ${[1, 2, 3, 4, 5].map((val) => `
          <label class="likert-option">
            <input type="radio" name="answer" value="${val}" ${answers[q.id] === val ? 'checked' : ''} aria-label="${LIKERT_LABELS[val - 1]}" />
            <span>${val}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('input[name="answer"]').forEach((input) => {
    input.addEventListener('change', (e) => {
      answers[q.id] = Number(e.target.value);
      saveProgress();
      $('#next-btn').disabled = false;
    });
  });

  $('#prev-btn').disabled = currentIndex === 0;
  const isLast = currentIndex === selectedQuestions.length - 1;
  $('#next-btn').textContent = isLast ? '查看完整报告' : '下一题';
  $('#next-btn').disabled = answers[q.id] === undefined;
}

function renderResults() {
  const data = scoreAssessment(answers);
  latestResult = data;
  $('#profile-title').textContent = data.archetype.name;
  $('#profile-summary').textContent = data.summary;

  const content = $('#results-content');
  content.innerHTML = '';

  content.appendChild(createArchetypeSection(data));
  content.appendChild(createBigFiveSection(data.bigFive));

  if (assessmentMode === 'quick') {
    content.appendChild(createQuickVersionNote());
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
    return;
  }

  content.appendChild(createConsistencySection(data.consistency));
  content.appendChild(createFacetsSection(data.facets));
  content.appendChild(createTraitSection('HEXACO · 诚实-谦逊', '补充大五之外的关键道德人格维度。', [{ key: 'honestyHumility', score: data.hexaco.honestyHumility }]));
  content.appendChild(createAttachmentSection(data));
  content.appendChild(createTraitSection('自我概念', 'Rosenberg 自尊量表 + 一般自我效能量表。', [
    { key: 'selfEsteem', score: data.selfConcept.selfEsteem },
    { key: 'selfEfficacy', score: data.selfConcept.selfEfficacy },
  ]));
  content.appendChild(createTraitSection('情绪能力', '情绪调节问卷 (ERQ) + 情绪智力自陈。', [
    { key: 'reappraisal', score: data.emotion.reappraisal },
    { key: 'suppression', score: data.emotion.suppression },
    { key: 'emotionalAwareness', score: data.emotion.emotionalAwareness },
    { key: 'emotionManagement', score: data.emotion.emotionManagement },
  ]));
  content.appendChild(createValuesSection(data.values));
  content.appendChild(createTraitSection('动机取向', '调节焦点理论 + 控制点 + 成长思维。', [
    { key: 'promotionFocus', score: data.motivation.promotionFocus },
    { key: 'preventionFocus', score: data.motivation.preventionFocus },
    { key: 'internalLocus', score: data.motivation.internalLocus },
    { key: 'growthMindset', score: data.motivation.growthMindset },
  ]));
  content.appendChild(createInterpersonalSection(data.interpersonal));
  content.appendChild(createCareerSection(data.career));
  content.appendChild(createCognitiveSection(data.cognitive));
  content.appendChild(createStrengthsSection(data.strengthsWeaknesses));
  content.appendChild(createInsightsSection(data.insights));

  try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
}

function createArchetypeSection(data) {
  const el = document.createElement('div');
  el.className = 'result-section archetype-section';
  el.innerHTML = `
    <p class="eyebrow">Personality Archetype</p>
    <h2 class="archetype-name">${data.archetype.name}</h2>
    <p class="archetype-desc">${data.archetype.desc}</p>
    <div class="type-badge">${data.cognitive.code}</div>
  `;
  return el;
}

function createQuickVersionNote() {
  const section = document.createElement('div');
  section.className = 'result-section quick-note-section';
  section.innerHTML = `
    <h2>快速版报告说明</h2>
    <p class="section-desc">本报告基于 50 道大五人格题生成，适合快速了解核心人格倾向。</p>
    <ul class="insights-list">
      <li>如果你希望继续了解依恋风格、情绪能力、价值观、动机取向与职业兴趣，请返回首页选择 188 题详细版。</li>
      <li>快速版不会展示未作答量表的分数，避免把默认值误读为真实测评结果。</li>
    </ul>
  `;
  return section;
}

function createConsistencySection(c) {
  const el = document.createElement('div');
  el.className = 'result-section consistency-section';
  const color = c.score >= 85 ? 'var(--success)' : c.score >= 65 ? 'var(--warning)' : 'var(--danger)';
  el.innerHTML = `
    <h2>作答一致性</h2>
    <p class="section-desc">通过正反向配对题检测作答质量，一致性越高结果越可靠</p>
    <div class="consistency-meter">
      <div class="consistency-score" style="color:${color}">${c.score}</div>
      <div class="consistency-detail">
        <span class="consistency-level">可信度：${c.level}</span>
        <p>${c.note}</p>
      </div>
    </div>
  `;
  return el;
}

function createBigFiveSection(bigFive) {
  const section = document.createElement('div');
  section.className = 'result-section';
  const keys = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'emotionalStability'];
  const cx = 160, cy = 160, r = 110;
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const axes = buildRadarAxes(keys, cx, cy, r);
  const points = buildRadarPoints(bigFive, keys, cx, cy, r);

  section.innerHTML = `
    <h2>大五人格</h2>
    <p class="section-desc">IPIP-NEO · 人格心理学金标准五大维度</p>
    <div class="radar-container">
      <svg viewBox="0 0 320 320" width="320" height="320" role="img" aria-label="大五人格雷达图">
        ${gridLevels.map((lv) => `<polygon points="${buildRadarPoints(Object.fromEntries(keys.map((k) => [k, lv * 100])), keys, cx, cy, r)}" fill="none" stroke="rgba(196,165,116,0.15)" stroke-width="1"/>`).join('')}
        ${axes.map((a) => `<line x1="${cx}" y1="${cy}" x2="${a.x}" y2="${a.y}" stroke="rgba(196,165,116,0.2)" stroke-width="1"/>`).join('')}
        <polygon points="${points}" fill="rgba(196,165,116,0.25)" stroke="#c4a574" stroke-width="2"/>
        ${axes.map((a) => `<text x="${a.lx}" y="${a.ly}" text-anchor="middle" dominant-baseline="middle" fill="#9a9288" font-size="11">${a.label}</text>`).join('')}
      </svg>
    </div>
    <div class="trait-grid">${keys.map((k) => traitRowHTML(k, bigFive[k])).join('')}</div>
  `;
  return section;
}

function createFacetsSection(facets) {
  const section = document.createElement('div');
  section.className = 'result-section';
  const groups = [
    { title: '开放性面', keys: ['intellect', 'aestheticOpenness'] },
    { title: '尽责性面', keys: ['industriousness', 'orderliness'] },
    { title: '外向性面', keys: ['enthusiasm', 'assertiveness'] },
    { title: '宜人性面', keys: ['compassion', 'politeness'] },
    { title: '神经质面', keys: ['volatility', 'withdrawal'] },
  ];

  section.innerHTML = `
    <h2>人格精细面 (BFAS)</h2>
    <p class="section-desc">DeYoung 大五层面量表 · 每个维度拆分为 2 个可独立测量的子面</p>
    ${groups.map((g) => `
      <div class="facet-group">
        <h3 class="facet-group-title">${g.title}</h3>
        <div class="trait-grid">${g.keys.map((k) => facetRowHTML(k, facets[k])).join('')}</div>
      </div>
    `).join('')}
  `;
  return section;
}

function facetRowHTML(key, score) {
  const meta = FACET_META[key];
  return `
    <div class="trait-row">
      <span class="trait-name">${meta?.name || key}</span>
      <div class="trait-bar-wrap"><div class="trait-bar" style="width:${score}%;background:${meta?.color || '#c4a574'}"></div></div>
      <span class="trait-score">${score}</span>
      <p class="trait-interpretation">${interpretFacet(key, score)}</p>
    </div>
  `;
}

function createTraitSection(title, desc, traits) {
  const section = document.createElement('div');
  section.className = 'result-section';
  section.innerHTML = `
    <h2>${title}</h2>
    <p class="section-desc">${desc}</p>
    <div class="trait-grid">${traits.map(({ key, score }) => traitRowHTML(key, score)).join('')}</div>
  `;
  return section;
}

function traitRowHTML(key, score) {
  const meta = TRAIT_META[key];
  const pole = score >= 50 ? meta?.high : meta?.low;
  return `
    <div class="trait-row">
      <span class="trait-name">${meta?.name || key}${pole ? ` · ${pole}` : ''}</span>
      <div class="trait-bar-wrap"><div class="trait-bar" style="width:${score}%;background:${meta?.color || '#c4a574'}"></div></div>
      <span class="trait-score">${score}</span>
      <p class="trait-interpretation">${interpretTrait(key, score)}</p>
    </div>
  `;
}

function createValuesSection(values) {
  const sorted = Object.entries(values).sort(([, a], [, b]) => b - a);
  const section = document.createElement('div');
  section.className = 'result-section';
  section.innerHTML = `
    <h2>核心价值导向</h2>
    <p class="section-desc">Schwartz 基本价值观 · 驱动你人生决策的深层动机</p>
    <div class="values-ranking">
      ${sorted.map(([k, v], i) => `
        <div class="value-row">
          <span class="value-rank">${i + 1}</span>
          <span class="value-name">${VALUE_META[k]?.name || k}</span>
          <div class="trait-bar-wrap"><div class="trait-bar" style="width:${v}%;background:${VALUE_META[k]?.color || '#c4a574'}"></div></div>
          <span class="trait-score">${v}</span>
        </div>
      `).join('')}
    </div>
    <p class="trait-interpretation" style="margin-top:1rem">${interpretValue(sorted[0][0], sorted[0][1])}</p>
  `;
  return section;
}

function createAttachmentSection(data) {
  const section = document.createElement('div');
  section.className = 'result-section';
  section.innerHTML = `
    <h2>依恋风格</h2>
    <p class="section-desc">ECR-R · 亲密关系中的焦虑与回避模式</p>
    <div class="attachment-grid">
      <div class="attachment-card">
        <h4>依恋焦虑</h4>
        <div class="value">${data.attachment.anxiety}%</div>
        <p>${data.attachment.anxiety >= 55 ? '较高 — 需要更多安全感确认' : data.attachment.anxiety <= 35 ? '较低 — 关系中较为安心' : '中等 — 偶尔会有不安全感'}</p>
      </div>
      <div class="attachment-card">
        <h4>依恋回避</h4>
        <div class="value">${data.attachment.avoidance}%</div>
        <p>${data.attachment.avoidance >= 55 ? '较高 — 倾向保持情感距离' : data.attachment.avoidance <= 35 ? '较低 — 乐于亲密表达' : '中等 — 在亲密与独立间平衡'}</p>
      </div>
    </div>
    <div class="attachment-type">
      <h3>${data.attachmentType.name}</h3>
      <p>${data.attachmentType.desc}</p>
    </div>
  `;
  return section;
}

function createCareerSection(career) {
  const section = document.createElement('div');
  section.className = 'result-section career-section';
  const keys = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];
  const cx = 160, cy = 160, r = 100;
  const axes = keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    return {
      key,
      lx: cx + Math.cos(angle) * (r + 24),
      ly: cy + Math.sin(angle) * (r + 24),
      label: RIASEC_META[key].name,
    };
  });
  const points = keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    const v = career.scores[key] / 100;
    return `${cx + Math.cos(angle) * r * v},${cy + Math.sin(angle) * r * v}`;
  }).join(' ');

  section.innerHTML = `
    <h2>职业兴趣匹配</h2>
    <p class="section-desc">Holland RIASEC 模型 · 结合人格特质的 75/25 加权职业兴趣分析</p>
    <div class="career-code-row">
      <div class="type-badge holland-badge">${career.hollandCode}</div>
      <div class="career-primary">
        <span>核心类型</span>
        <strong>${career.primary.name} (${career.primary.code})</strong>
        <p>${career.primary.desc}</p>
      </div>
    </div>
    <div class="radar-container">
      <svg viewBox="0 0 320 320" width="300" height="300" role="img" aria-label="RIASEC 职业兴趣雷达图">
        ${[0.25, 0.5, 0.75, 1].map((lv) => {
          const pts = keys.map((_, i) => {
            const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
            return `${cx + Math.cos(angle) * r * lv},${cy + Math.sin(angle) * r * lv}`;
          }).join(' ');
          return `<polygon points="${pts}" fill="none" stroke="rgba(196,165,116,0.12)" stroke-width="1"/>`;
        }).join('')}
        ${keys.map((_, i) => {
          const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
          return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r}" y2="${cy + Math.sin(angle) * r}" stroke="rgba(196,165,116,0.15)" stroke-width="1"/>`;
        }).join('')}
        <polygon points="${points}" fill="rgba(110,168,212,0.2)" stroke="#6a9fd4" stroke-width="2"/>
        ${axes.map((a) => `<text x="${a.lx}" y="${a.ly}" text-anchor="middle" dominant-baseline="middle" fill="#9a9288" font-size="10">${a.label}</text>`).join('')}
      </svg>
    </div>
    <div class="trait-grid">
      ${career.sorted.map((t) => `
        <div class="trait-row">
          <span class="trait-name">${t.name} (${t.code})</span>
          <div class="trait-bar-wrap"><div class="trait-bar" style="width:${t.score}%;background:${t.color}"></div></div>
          <span class="trait-score">${t.score}</span>
        </div>
      `).join('')}
    </div>
    <div class="career-env">
      <h3>理想工作环境</h3>
      <p>${career.workEnvironment.summary}</p>
      <p class="career-avoid"><span>建议避免：</span>${career.workEnvironment.avoid}</p>
    </div>
    <h3 class="career-subtitle">推荐职业方向</h3>
    <div class="career-list">
      ${career.recommendations.map((c, i) => `
        <div class="career-card">
          <div class="career-card-header">
            <span class="career-rank">${i + 1}</span>
            <span class="career-title">${c.title}</span>
            <span class="career-fit">${c.fit} 匹配</span>
          </div>
          <span class="career-codes">${c.codes}</span>
          <p>${c.desc}</p>
        </div>
      `).join('')}
    </div>
    <ul class="insights-list" style="margin-top:1rem">
      ${career.careerInsights.map((ins) => `<li>${ins}</li>`).join('')}
    </ul>
  `;
  return section;
}

function createInterpersonalSection(ip) {
  const section = document.createElement('div');
  section.className = 'result-section';
  const styles = [
    { key: 'collaborating', name: '合作型', score: ip.collaborating, color: '#7eb88a', desc: '寻求双赢，维护关系' },
    { key: 'asserting', name: '竞争型', score: ip.asserting, color: '#e0a050', desc: '坚持立场，争取利益' },
    { key: 'avoiding', name: '回避型', score: ip.avoiding, color: '#6a9fd4', desc: '回避冲突，保持和谐' },
  ];
  const dominant = styles.sort((a, b) => b.score - a.score)[0];

  section.innerHTML = `
    <h2>人际冲突风格</h2>
    <p class="section-desc">TKI 冲突模式 · 你在分歧中的典型应对方式</p>
    <p class="dominant-style">主导风格：<strong>${dominant.name}</strong>（${dominant.score}分）— ${dominant.desc}</p>
    <div class="trait-grid">${styles.map((s) => `
      <div class="trait-row">
        <span class="trait-name">${s.name}</span>
        <div class="trait-bar-wrap"><div class="trait-bar" style="width:${s.score}%;background:${s.color}"></div></div>
        <span class="trait-score">${s.score}</span>
      </div>
    `).join('')}</div>
  `;
  return section;
}

function createCognitiveSection(cognitive) {
  const section = document.createElement('div');
  section.className = 'result-section';
  section.innerHTML = `
    <h2>认知加工风格</h2>
    <p class="section-desc">基于 Big Five 实证关联推导（非 MBTI 固定类型）</p>
    <div class="type-badge">${cognitive.code}</div>
    <div class="trait-grid" style="margin-top:1rem">
      ${Object.entries(cognitive.dimensions).map(([label, d]) => `
        <div class="trait-row">
          <span class="trait-name">${label}</span>
          <div class="trait-bar-wrap"><div class="trait-bar" style="width:${d.value}%;background:#c4a574"></div></div>
          <span class="trait-score">${d.value >= 50 ? d.right.split(' ')[1] : d.left.split(' ')[1]}</span>
          <p class="trait-interpretation">${d.left} ← → ${d.right}</p>
        </div>
      `).join('')}
    </div>
  `;
  return section;
}

function createStrengthsSection({ strengths, growth }) {
  const section = document.createElement('div');
  section.className = 'result-section';
  section.innerHTML = `
    <h2>优势与成长</h2>
    <p class="section-desc">基于全维度得分生成的个性化发展建议</p>
    <div class="sw-grid">
      <div class="sw-col">
        <h3 class="sw-title strengths-title">核心优势</h3>
        <ul class="insights-list">${strengths.map((s) => `<li>${s}</li>`).join('') || '<li>各维度发展均衡</li>'}</ul>
      </div>
      <div class="sw-col">
        <h3 class="sw-title growth-title">成长方向</h3>
        <ul class="insights-list growth-list">${growth.map((g) => `<li>${g}</li>`).join('') || '<li>继续保持当前状态</li>'}</ul>
      </div>
    </div>
  `;
  return section;
}

function createInsightsSection(insights) {
  const section = document.createElement('div');
  section.className = 'result-section';
  section.innerHTML = `
    <h2>深度洞察</h2>
    <p class="section-desc">跨维度交叉分析 · 揭示维度之间的独特组合模式</p>
    <ul class="insights-list">${insights.map((i) => `<li>${i}</li>`).join('')}</ul>
  `;
  return section;
}

function generateQuickReportText(r) {
  const lines = ['真我洞察 · 50题快速版人格评估报告', '='.repeat(44), ''];
  lines.push(`【人格原型】${r.archetype.name}`);
  lines.push(r.archetype.desc);
  lines.push('');
  lines.push('【大五人格】');
  Object.entries(r.bigFive).forEach(([k, v]) => lines.push(`  ${TRAIT_META[k]?.name || k}: ${v}%`));
  lines.push('');
  lines.push('【报告说明】快速版基于 50 道大五人格题生成，不展示未作答量表分数。若需依恋、情绪、价值观、动机与职业兴趣建议，请选择 188 题详细版。');
  lines.push('');
  lines.push('—— 本报告仅供自我探索参考，不能替代专业心理评估。');
  return lines.join('\n');
}

function downloadReport() {
  const reportData = latestResult || scoreAssessment(answers);
  const text = assessmentMode === 'quick' ? generateQuickReportText(reportData) : generateReportText(reportData);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `真我洞察-${ASSESSMENT_MODES[assessmentMode].reportName}-${new Date().toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll('.version-start').forEach((button) => {
  button.addEventListener('click', () => {
    const pickedMode = button.dataset.mode || 'full';
    const hasProgress = loadProgress();

    if (hasProgress && assessmentMode === pickedMode && confirm(`检测到未完成的${ASSESSMENT_MODES[assessmentMode].label}进度，是否继续？\n（选择“取消”将重新开始）`)) {
      lastSection = currentIndex > 0 ? selectedQuestions[currentIndex - 1]?.section : null;
    } else {
      clearProgress();
      setAssessmentMode(pickedMode);
      lastSection = null;
    }

    showView(assessment);
    renderQuestion();
  });
});

$('#back-btn').addEventListener('click', () => {
  if (Object.keys(answers).length && !confirm('确定返回？当前进度已自动保存。')) return;
  showView(landing);
});

$('#prev-btn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    lastSection = currentIndex > 0 ? selectedQuestions[currentIndex - 1]?.section : null;
    renderQuestion();
  }
});

$('#next-btn').addEventListener('click', () => {
  if (answers[selectedQuestions[currentIndex].id] === undefined) return;
  if (currentIndex < selectedQuestions.length - 1) {
    currentIndex++;
    saveProgress();
    renderQuestion();
  } else {
    showView(results);
    renderResults();
  }
});

$('#retake-btn').addEventListener('click', () => { clearProgress(); showView(landing); });
$('#download-btn').addEventListener('click', downloadReport);

document.addEventListener('keydown', (e) => {
  if (!assessment.classList.contains('active')) return;
  if (e.key >= '1' && e.key <= '5') {
    const input = document.querySelector(`input[name="answer"][value="${e.key}"]`);
    if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); }
  }
  if (e.key === 'ArrowRight' && !$('#next-btn').disabled) $('#next-btn').click();
  if (e.key === 'ArrowLeft' && !$('#prev-btn').disabled) $('#prev-btn').click();
});
