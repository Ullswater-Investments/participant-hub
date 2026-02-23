export const SUGGESTIONS_ES = [
  '¿Qué es European Youth Together 2026?',
  '¿Cuál es el plazo de la convocatoria 2026?',
  '¿Qué documentos necesito para la propuesta?',
  '¿Quién puede participar en Youth Together?',
  '¿Cómo registro mi organización y obtengo el PIC?',
  '¿Cómo funciona el presupuesto Lump Sum?',
  '¿Dónde descargo el Legal Entity Form?',
  '¿Cómo se firma el mandato?',
  '¿Cuántos socios necesita el consorcio?',
  '¿Qué actividades se pueden financiar?',
  '¿Cuál es el presupuesto máximo por proyecto?',
  '¿Qué criterios de evaluación se aplican?',
  '¿Cómo se justifican los gastos del Lump Sum?',
  '¿Qué es el Financial Identification Form?',
  '¿Cómo se presenta la propuesta en el portal?',
  '¿Qué rol tiene el coordinador del consorcio?',
  '¿Se pueden incluir países no europeos?',
  '¿Cuánto dura un proyecto Youth Together?',
];

export const SUGGESTIONS_EN = [
  'What is European Youth Together 2026?',
  'What is the 2026 call deadline?',
  'What documents do I need for the proposal?',
  'Who can participate in Youth Together?',
  'How do I register my organisation and get a PIC?',
  'How does the Lump Sum budget work?',
  'Where do I download the Legal Entity Form?',
  'How do I sign the mandate?',
  'How many partners does the consortium need?',
  'What activities can be funded?',
  'What is the maximum budget per project?',
  'What evaluation criteria are applied?',
  'How are Lump Sum expenses justified?',
  'What is the Financial Identification Form?',
  'How is the proposal submitted on the portal?',
  'What is the coordinator\'s role in the consortium?',
  'Can non-European countries be included?',
  'How long does a Youth Together project last?',
];

/**
 * Pick `count` random suggestions excluding those already asked.
 */
export function pickSuggestions(
  pool: string[],
  askedMessages: string[],
  count = 4,
): string[] {
  const asked = new Set(askedMessages.map(m => m.trim().toLowerCase()));
  const available = pool.filter(q => !asked.has(q.trim().toLowerCase()));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
