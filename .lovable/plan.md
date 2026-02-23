
## Actualizar FAQs y enfoque a la convocatoria European Youth Together 2026

### Problema

Las preguntas frecuentes (chips FAQ) en el DashboardChat y ErasmusChat hacen referencia a "plazos 2025" cuando el consorcio esta aplicando a la convocatoria **European Youth Together 2026** (ERASMUS-YOUTH-2026-YOUTH-TOG). Todo debe estar centrado en esta call 2026.

### Cambios

**1. `src/components/DashboardChat.tsx`** - Actualizar los arrays FAQ_ES y FAQ_EN:

```text
Antes:
- '¿Cuáles son los plazos 2025?'
- 'What are the 2025 deadlines?'

Despues:
FAQ_ES = [
  '¿Qué es European Youth Together 2026?',
  '¿Cuál es el plazo de la convocatoria 2026?',
  '¿Qué documentos necesito?',
  '¿Quién puede participar en Youth Together?',
]
FAQ_EN = [
  'What is European Youth Together 2026?',
  'What is the 2026 call deadline?',
  'What documents do I need?',
  'Who can participate in Youth Together?',
]
```

**2. `src/components/ErasmusChat.tsx`** - Actualizar los arrays FAQ_ES y FAQ_EN:

```text
FAQ_ES = [
  '¿Cómo registro mi organización y obtengo el PIC?',
  '¿Qué documentos necesito para la propuesta?',
  '¿Cómo funciona el presupuesto Lump Sum?',
  '¿Dónde descargo el Legal Entity Form?',
  '¿Cuál es el plazo de European Youth Together 2026?',
  '¿Cómo se firma el mandato?',
]
FAQ_EN = [
  'How do I register my organisation and get a PIC?',
  'What documents do I need for the proposal?',
  'How does the Lump Sum budget work?',
  'Where do I download the Legal Entity Form?',
  'What is the European Youth Together 2026 deadline?',
  'How do I sign the mandate?',
]
```

**3. `src/i18n/es.ts`** - Actualizar textos del chat flotante (lineas 117-122):

```text
chat.subtitle: 'Consultas sobre European Youth Together 2026'
chat.welcome: '¡Hola! Puedo ayudarte con dudas sobre la convocatoria European Youth Together 2026...'
```

**4. `src/i18n/en.ts`** - Actualizar textos equivalentes en ingles

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/DashboardChat.tsx` | FAQ chips enfocados a Youth Together 2026 |
| `src/components/ErasmusChat.tsx` | FAQ chips actualizados de 2025 a 2026 |
| `src/i18n/es.ts` | Textos del chat flotante actualizados |
| `src/i18n/en.ts` | Textos del chat flotante actualizados |
