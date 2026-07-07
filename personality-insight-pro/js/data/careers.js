/** Holland RIASEC 职业兴趣量表（30 题，每型 5 题） */

export const CAREER_QUESTIONS = [
  // R 实际型 Realistic
  { id: 'R1', text: '我喜欢动手修理、组装或操作机械设备。', scale: 'realistic', section: 'career' },
  { id: 'R2', text: '在户外或现场环境中工作让我更有活力。', scale: 'realistic', section: 'career' },
  { id: 'R3', text: '我享受使用工具完成具体、可见的成果。', scale: 'realistic', section: 'career' },
  { id: 'R4', text: '我对工程技术、建筑或机械类工作感兴趣。', scale: 'realistic', section: 'career' },
  { id: 'R5', text: '我偏好看得见摸得着的任务，而非抽象讨论。', scale: 'realistic', section: 'career' },

  // I 研究型 Investigative
  { id: 'I1', text: '我喜欢分析数据、寻找规律并提出解释。', scale: 'investigative', section: 'career' },
  { id: 'I2', text: '解决复杂的智力难题让我感到满足。', scale: 'investigative', section: 'career' },
  { id: 'I3', text: '我对科学研究、实验或深度分析工作感兴趣。', scale: 'investigative', section: 'career' },
  { id: 'I4', text: '我乐于独立探索未知领域和问题。', scale: 'investigative', section: 'career' },
  { id: 'I5', text: '阅读专业文献、学习新知识是我的乐趣。', scale: 'investigative', section: 'career' },

  // A 艺术型 Artistic
  { id: 'A1', text: '我享受通过写作、设计或表演表达创意。', scale: 'artistic', section: 'career' },
  { id: 'A2', text: '非结构化的、自由发挥的工作环境适合我。', scale: 'artistic', section: 'career' },
  { id: 'A3', text: '我对音乐、视觉艺术或创意产业感兴趣。', scale: 'artistic', section: 'career' },
  { id: 'A4', text: '我倾向于用独特、原创的方式完成任务。', scale: 'artistic', section: 'career' },
  { id: 'A5', text: '严格的流程和重复性工作会压抑我的创造力。', scale: 'artistic', section: 'career' },

  // S 社会型 Social
  { id: 'S1', text: '帮助他人成长或解决问题让我感到有意义。', scale: 'social', section: 'career' },
  { id: 'S2', text: '我对教育、咨询或医护类工作感兴趣。', scale: 'social', section: 'career' },
  { id: 'S3', text: '我善于倾听并理解他人的需求和感受。', scale: 'social', section: 'career' },
  { id: 'S4', text: '在团队中支持和协调他人是我的强项。', scale: 'social', section: 'career' },
  { id: 'S5', text: '我希望工作能直接改善他人的生活。', scale: 'social', section: 'career' },

  // E 企业型 Enterprising
  { id: 'E1', text: '我喜欢说服、影响他人并推动事情发生。', scale: 'enterprising', section: 'career' },
  { id: 'E2', text: '我对创业、管理或销售类工作感兴趣。', scale: 'enterprising', section: 'career' },
  { id: 'E3', text: '在竞争中获胜、达成目标让我充满动力。', scale: 'enterprising', section: 'career' },
  { id: 'E4', text: '我乐于承担风险以获取更大的回报和影响力。', scale: 'enterprising', section: 'career' },
  { id: 'E5', text: '我擅长在不确定环境中做决策并带领团队。', scale: 'enterprising', section: 'career' },

  // C 常规型 Conventional
  { id: 'C1', text: '我擅长处理数据、文档和精确的细节工作。', scale: 'conventional', section: 'career' },
  { id: 'C2', text: '有明确规则和流程的工作环境让我安心。', scale: 'conventional', section: 'career' },
  { id: 'C3', text: '我对财务、行政或信息管理类工作感兴趣。', scale: 'conventional', section: 'career' },
  { id: 'C4', text: '我注重准确性和效率，很少出纰漏。', scale: 'conventional', section: 'career' },
  { id: 'C5', text: '我偏好稳定、可预期的工作节奏和职责。', scale: 'conventional', section: 'career' },
];

export const RIASEC_META = {
  realistic: {
    code: 'R', name: '实际型', color: '#8B7355',
    desc: '偏好动手操作、使用工具和与实物打交道。喜欢具体、有明确结果的任务。',
    env: '结构化现场环境，强调实操技能与体力/技术协调',
    traits: ['务实', '机械导向', '体力/操作'],
  },
  investigative: {
    code: 'I', name: '研究型', color: '#6a9fd4',
    desc: '偏好观察、分析、研究和解决复杂问题。喜欢独立思考和智力挑战。',
    env: '研究型或分析型环境，鼓励探索与独立工作',
    traits: ['分析', '好奇', '独立'],
  },
  artistic: {
    code: 'A', name: '艺术型', color: '#d4748a',
    desc: '偏好创造、表达和审美活动。喜欢非结构化和原创性的工作方式。',
    env: '灵活自由的创意环境，容忍模糊性和个性化表达',
    traits: ['创意', '表达', '审美'],
  },
  social: {
    code: 'S', name: '社会型', color: '#7eb88a',
    desc: '偏好帮助、教导和服务他人。从人际互动和利他行为中获得满足。',
    env: '协作互助的团队环境，强调沟通与共情',
    traits: ['共情', '合作', '服务'],
  },
  enterprising: {
    code: 'E', name: '企业型', color: '#e0a050',
    desc: '偏好领导、说服和影响他人。享受竞争、冒险和达成商业/组织目标。',
    env: '动态竞争型环境，强调决策力与影响力',
    traits: ['领导', '说服', '冒险'],
  },
  conventional: {
    code: 'C', name: '常规型', color: '#74a0d4',
    desc: '偏好组织、记录和数据管理。喜欢有规则、可预期的系统化工作。',
    env: '规范有序的事务型环境，强调精确与流程',
    traits: ['条理', '精确', '稳定'],
  },
};

/** 职业库：Holland 代码 + 匹配维度权重 */
export const CAREER_DATABASE = [
  { title: '软件工程师', codes: 'IRC', tags: ['investigative', 'realistic', 'conventional'], desc: '设计开发软件系统，结合逻辑分析与结构化实现。' },
  { title: '数据科学家', codes: 'IAS', tags: ['investigative', 'artistic', 'conventional'], desc: '从数据中发现规律，构建模型支持决策。' },
  { title: '产品经理', codes: 'EAS', tags: ['enterprising', 'artistic', 'social'], desc: '连接用户需求与技术实现，推动产品落地。' },
  { title: 'UX/UI 设计师', codes: 'AES', tags: ['artistic', 'enterprising', 'social'], desc: '以用户为中心设计界面与交互体验。' },
  { title: '心理咨询师', codes: 'SAI', tags: ['social', 'artistic', 'investigative'], desc: '运用心理学知识帮助来访者解决情绪与行为问题。' },
  { title: '教师 / 培训师', codes: 'SAE', tags: ['social', 'artistic', 'enterprising'], desc: '传授知识、引导成长，影响他人发展轨迹。' },
  { title: '医生 / 护士', codes: 'SIR', tags: ['social', 'investigative', 'realistic'], desc: '运用医学知识诊断治疗，直接改善患者健康。' },
  { title: '律师', codes: 'EIS', tags: ['enterprising', 'investigative', 'social'], desc: '分析法律问题，代表客户争取权益。' },
  { title: '管理咨询顾问', codes: 'EIS', tags: ['enterprising', 'investigative', 'social'], desc: '为企业提供战略与运营解决方案。' },
  { title: '创业者 / CEO', codes: 'EAS', tags: ['enterprising', 'artistic', 'social'], desc: '创建并领导组织，承担风险追求愿景。' },
  { title: '市场营销经理', codes: 'EAS', tags: ['enterprising', 'artistic', 'social'], desc: '策划推广策略，连接品牌与消费者。' },
  { title: '销售经理', codes: 'ESR', tags: ['enterprising', 'social', 'realistic'], desc: '建立客户关系，推动商业成交。' },
  { title: '财务分析师', codes: 'CIR', tags: ['conventional', 'investigative', 'realistic'], desc: '分析财务数据，支持投资与经营决策。' },
  { title: '会计师', codes: 'CSE', tags: ['conventional', 'social', 'enterprising'], desc: '管理财务记录，确保合规与准确。' },
  { title: '行政主管', codes: 'CES', tags: ['conventional', 'enterprising', 'social'], desc: '协调组织运营，维护高效行政体系。' },
  { title: '土木工程师', codes: 'RIC', tags: ['realistic', 'investigative', 'conventional'], desc: '设计建造基础设施，解决工程实际问题。' },
  { title: '机械工程师', codes: 'RIC', tags: ['realistic', 'investigative', 'conventional'], desc: '设计开发和维护机械系统与设备。' },
  { title: '建筑师', codes: 'AIR', tags: ['artistic', 'investigative', 'realistic'], desc: '融合美学与功能设计建筑空间。' },
  { title: '平面设计师', codes: 'AES', tags: ['artistic', 'enterprising', 'social'], desc: '创造视觉传达作品，传递品牌与信息。' },
  { title: '作家 / 编辑', codes: 'ASI', tags: ['artistic', 'social', 'investigative'], desc: '通过文字创作与编辑传递思想与故事。' },
  { title: '音乐制作人', codes: 'AES', tags: ['artistic', 'enterprising', 'social'], desc: '创作编排音乐，管理艺术项目。' },
  { title: '研究员 / 科学家', codes: 'IAS', tags: ['investigative', 'artistic', 'social'], desc: '系统探索自然规律或社会现象。' },
  { title: '人力资源经理', codes: 'ESA', tags: ['enterprising', 'social', 'artistic'], desc: '管理人才招聘、发展与组织文化。' },
  { title: '社会工作者', codes: 'SAE', tags: ['social', 'artistic', 'enterprising'], desc: '为弱势群体提供支持与资源链接。' },
  { title: '项目经理', codes: 'ECS', tags: ['enterprising', 'conventional', 'social'], desc: '规划执行项目，协调资源与进度。' },
  { title: '运营经理', codes: 'ECS', tags: ['enterprising', 'conventional', 'social'], desc: '优化业务流程，保障组织日常运转。' },
  { title: '电气技师', codes: 'RCI', tags: ['realistic', 'conventional', 'investigative'], desc: '安装维护电气系统，解决现场技术问题。' },
  { title: '厨师', codes: 'RAE', tags: ['realistic', 'artistic', 'enterprising'], desc: '结合技艺与创意制作餐饮作品。' },
  { title: '运动员 / 教练', codes: 'RES', tags: ['realistic', 'enterprising', 'social'], desc: '通过体能训练与指导追求竞技卓越。' },
  { title: '公务员', codes: 'CSE', tags: ['conventional', 'social', 'enterprising'], desc: '在公共部门执行政策，服务社会。' },
  { title: '投资分析师', codes: 'IEC', tags: ['investigative', 'enterprising', 'conventional'], desc: '研究市场趋势，评估投资机会。' },
  { title: 'AI 研究员', codes: 'IAS', tags: ['investigative', 'artistic', 'social'], desc: '探索人工智能前沿，开发智能系统。' },
  { title: '内容创作者', codes: 'AES', tags: ['artistic', 'enterprising', 'social'], desc: '通过多媒体内容建立个人品牌与影响力。' },
  { title: '非营利组织负责人', codes: 'SAE', tags: ['social', 'artistic', 'enterprising'], desc: '推动社会公益使命，协调志愿者与资源。' },
];
