export { LIKERT_LABELS, SECTIONS, TRAIT_META, FACET_META, VALUE_META, ATTACHMENT_TYPES, ARCHETYPES, ARCHETYPE_DEFAULT } from './data/meta.js';
export { CORE_QUESTIONS, CONSISTENCY_PAIRS } from './data/questions-core.js';
export { EXTENDED_QUESTIONS } from './data/questions-extended.js';
export { CAREER_QUESTIONS, RIASEC_META } from './data/careers.js';

import { CORE_QUESTIONS } from './data/questions-core.js';
import { EXTENDED_QUESTIONS } from './data/questions-extended.js';
import { CAREER_QUESTIONS } from './data/careers.js';

export const QUESTIONS = [...CORE_QUESTIONS, ...EXTENDED_QUESTIONS, ...CAREER_QUESTIONS];

export const TOTAL_QUESTIONS = QUESTIONS.length;
