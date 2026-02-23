

## Actualizar la base de conocimiento del asistente IA con informacion de 2026

### Resumen

Anadir al system prompt de la edge function `erasmus-chat` la informacion sobre:
1. La convocatoria **European Youth Together 2026** (ERASMUS-YOUTH-2026-YOUTH-TOG) - accion KA3
2. La **Erasmus+ Programme Guide 2026** (enlace actualizado)

### Cambios en el archivo

**Archivo:** `supabase/functions/erasmus-chat/index.ts`

Modificar el `SYSTEM_PROMPT` para anadir:

#### A) En la seccion "Main Portals", actualizar/anadir:
- Erasmus+ Programme Guide 2026: `https://erasmus-plus.ec.europa.eu/document/erasmus-programme-guide-2026`
- Erasmus+ Programme Guide 2026 (PDF EN): `https://erasmus-plus.ec.europa.eu/sites/default/files/2025-11/programme-guide-2026_en.pdf`
- Erasmus+ Programme Guide 2026 (PDF ES): `https://erasmus-plus.ec.europa.eu/sites/default/files/2025-11/programme-guide-2026_es.pdf`

#### B) Anadir una nueva seccion completa sobre European Youth Together (KA3):

```text
## EUROPEAN YOUTH TOGETHER 2026 (KA3) - KEY INFORMATION

### Call Reference
- Topic ID: ERASMUS-YOUTH-2026-YOUTH-TOG
- Call page: https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/ERASMUS-YOUTH-2026-YOUTH-TOG
- Deadline: 26 February 2026
- Action type: KA3 - Support for Policy Reform

### What is European Youth Together?
European Youth Together projects aim to create cooperation networks enabling young people 
across Europe to set up joint projects, organise exchanges and promote trainings (e.g. for 
youth leaders/youth workers) through both physical and online activities. The action supports 
transnational partnerships for youth organisations at both grassroots and large-scale level, 
aiming to reinforce the European dimension of their activities.

### Eligibility:
- EU Member States and third countries associated to the Programme (North Macedonia, Serbia, 
  Iceland, Norway, Liechtenstein, Turkiye)
- Applicants must be youth organisations (NGOs, public bodies, etc.)
- Transnational partnerships required

### Key links:
- Full call details: https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/ERASMUS-YOUTH-2026-YOUTH-TOG
- Programme Guide 2026 (reference document): https://erasmus-plus.ec.europa.eu/document/erasmus-programme-guide-2026
```

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `supabase/functions/erasmus-chat/index.ts` | Anadir informacion de Youth Together 2026 y Programme Guide 2026 al system prompt |

### Nota tecnica

Solo se modifica el system prompt (constante de texto). No hay cambios en la logica de la funcion ni en el frontend. La edge function se redesplegara automaticamente.

