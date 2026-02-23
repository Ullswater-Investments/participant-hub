
## Chat Asistencial Erasmus+ con IA y Enlaces Oficiales

### Resumen

Crear un chat asistencial inteligente integrado en el portal que responda preguntas frecuentes sobre el programa Erasmus+ KA220, proporcionando enlaces directos a fuentes oficiales de la Comision Europea. El chat estara alimentado por una base de conocimiento curada y utilizara Lovable AI para generar respuestas contextuales.

---

### 1. Base de datos - Correccion de seguridad

Las politicas RLS de la tabla `documents` usan `USING (true)` para INSERT, UPDATE y DELETE, lo cual es permisivo. Sin embargo, dado que este portal usa autenticacion por contrasena compartida (no por usuario individual), estas politicas son coherentes con el modelo de acceso actual. No se requieren cambios en las tablas existentes.

### 2. Base de conocimiento: fuentes oficiales

El sistema prompt del agente incluira enlaces verificados a fuentes oficiales de la CE:

| Recurso | URL |
|---------|-----|
| Funding & Tenders Portal | https://ec.europa.eu/info/funding-tenders/opportunities/portal/ |
| Participant Register | https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register |
| Erasmus+ Programme Guide 2025 | https://erasmus-plus.ec.europa.eu/document/erasmus-programme-guide-2025-version-2 |
| Guia web del Programa | https://erasmus-plus.ec.europa.eu/programme-guide |
| Registro de organizaciones | https://erasmus-plus.ec.europa.eu/resources-and-tools/how-to-apply/registering-your-organisation |
| Convocatorias 2025 | https://erasmus-plus.ec.europa.eu/news/2025-erasmus-call-for-funding-now-open |
| SEPIE (Agencia Nacional Espana) | https://www.sepie.es |
| Legal Entity Form | https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/common/agr-contr/legal-entity-form_en.pdf |
| Financial ID Form | https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/common/agr-contr/financial-id-form_en.pdf |
| Europass CV Builder | https://europa.eu/europass/en |
| KA220 Cooperation Partnerships | https://erasmus-plus.ec.europa.eu/programme-guide/part-b/key-action-2/cooperation-partnerships |

### 3. Backend - Edge Function `erasmus-chat`

Crear `supabase/functions/erasmus-chat/index.ts` que:
- Reciba mensajes del usuario y el historial de conversacion
- Inyecte un system prompt extenso con toda la base de conocimiento Erasmus+ (enlaces, procedimientos, plazos, requisitos KA220)
- Utilice streaming SSE via Lovable AI Gateway (`google/gemini-3-flash-preview`)
- Instruya al modelo para SIEMPRE incluir enlaces oficiales relevantes en sus respuestas
- Maneje errores 429/402 con mensajes claros

El system prompt incluira:
- Descripcion completa del programa KA220
- Procedimientos paso a paso (PIC, mandatos, presupuesto, etc.)
- URLs oficiales categorizadas
- Instrucciones para responder siempre con enlaces a fuentes
- Respuestas en el idioma del usuario (ES/EN)

### 4. Frontend - Componente de Chat

Crear `src/components/ErasmusChat.tsx`:
- Boton flotante en la esquina inferior derecha (icono de chat)
- Panel desplegable con interfaz de chat
- Preguntas frecuentes sugeridas como chips clickables (ej: "Como obtener el PIC?", "Que documentos necesito?", "Plazos de la convocatoria")
- Streaming token-by-token de las respuestas
- Renderizado de markdown en las respuestas (enlaces clickables)
- Soporte bilingue (ES/EN) usando el contexto de idioma existente

### 5. Integracion en el portal

- Agregar `ErasmusChat` al `AppLayout.tsx` para que este disponible en todas las paginas
- Agregar traducciones para el chat en `src/i18n/es.ts` y `src/i18n/en.ts`

### 6. Preguntas frecuentes predefinidas (chips)

En espanol:
- "Como registro mi organizacion y obtengo el PIC?"
- "Que documentos necesito para la propuesta?"
- "Como funciona el presupuesto Lump Sum?"
- "Donde descargo el Legal Entity Form?"
- "Cuales son los plazos de la convocatoria 2025?"
- "Como se firma el mandato?"

En ingles:
- "How do I register my organisation and get a PIC?"
- "What documents do I need for the proposal?"
- "How does the Lump Sum budget work?"
- "Where do I download the Legal Entity Form?"
- "What are the 2025 call deadlines?"
- "How do I sign the mandate?"

---

### Archivos a crear

| Archivo | Descripcion |
|---------|-------------|
| `supabase/functions/erasmus-chat/index.ts` | Edge function con system prompt y streaming |
| `src/components/ErasmusChat.tsx` | Componente de chat flotante con UI completa |

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/AppLayout.tsx` | Agregar componente ErasmusChat |
| `src/i18n/es.ts` | Traducciones del chat |
| `src/i18n/en.ts` | Traducciones del chat |

### Notas tecnicas

- Se usa LOVABLE_API_KEY (ya configurada) para autenticacion con Lovable AI Gateway
- Modelo: `google/gemini-3-flash-preview` (rapido, buen equilibrio coste/calidad)
- El chat no persiste conversaciones en base de datos (se reinicia al cerrar); esto mantiene la simplicidad
- Los enlaces en las respuestas del modelo se renderizan como links clickables gracias a react-markdown
- Se necesita instalar `react-markdown` como dependencia
