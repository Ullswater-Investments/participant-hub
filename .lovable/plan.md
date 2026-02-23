

## Chatbot inline en el Dashboard con base de conocimiento Erasmus+ KA3

### Resumen

Crear un componente de chatbot inline (no flotante) que se posicione justo encima del titulo h1 "Panel principal" en el Dashboard. El chatbot ocupara todo el ancho disponible del contenedor, estara conectado a la edge function `erasmus-chat` existente, y solo respondera preguntas relacionadas con Erasmus+ KA3. Si el usuario pregunta algo fuera de tema, el asistente le advertira.

---

### 1. Actualizar el System Prompt de la Edge Function

**Archivo:** `supabase/functions/erasmus-chat/index.ts`

Modificar el system prompt para:
- Cambiar todas las referencias de "KA220" a "KA3" (o incluir ambas si procede)
- Anadir una regla critica: **si el usuario pregunta algo que NO esta relacionado con Erasmus+, debe responder con una advertencia clara** indicando que solo puede resolver dudas sobre Erasmus+ KA3, y no responder a la pregunta fuera de tema.

Texto de la regla a anadir:
> "5. If the user asks a question that is NOT related to the Erasmus+ programme (KA3 or general Erasmus+ topics), you MUST decline politely and explain that you can only answer questions about Erasmus+ KA3. Do NOT answer off-topic questions."

### 2. Crear componente DashboardChat

**Archivo nuevo:** `src/components/DashboardChat.tsx`

Componente inline (Card) que:
- Ocupa todo el ancho del contenedor (mismo ancho que el h1)
- Muestra un campo de entrada con boton de envio
- Tiene un area de mensajes con scroll
- Usa streaming token-by-token conectado a la edge function `erasmus-chat`
- Renderiza las respuestas con ReactMarkdown (enlaces clickables)
- Muestra chips de preguntas frecuentes cuando no hay mensajes
- Es bilingue (usa el contexto de idioma existente)
- Tiene un header con icono y titulo del asistente
- Altura fija (ej. 300px) con scroll interno para los mensajes

Estructura visual:
```text
+--------------------------------------------------+
| [robot icon] Asistente Erasmus+ KA3              |
| Pregunta sobre el programa Erasmus+ KA3          |
|--------------------------------------------------|
| [chips de FAQ cuando esta vacio]                  |
|                                                   |
| [area de mensajes con scroll]                     |
|                                                   |
|--------------------------------------------------|
| [input de texto]                    [boton enviar]|
+--------------------------------------------------+
```

### 3. Integrar el componente en Dashboard

**Archivo:** `src/pages/Dashboard.tsx`

- Importar `DashboardChat`
- Colocarlo justo antes del bloque `<div>` que contiene el h1, dentro del contenedor principal
- El chatbot tendra el mismo `max-w-5xl` que el resto del dashboard

### 4. Actualizar traducciones

**Archivos:** `src/i18n/es.ts` y `src/i18n/en.ts`

Anadir nuevas claves:
- `dashboard.chatTitle`: "Asistente Erasmus+ KA3" / "Erasmus+ KA3 Assistant"
- `dashboard.chatSubtitle`: "Pregunta sobre el programa Erasmus+ KA3" / "Ask about the Erasmus+ KA3 programme"
- `dashboard.chatWelcome`: mensaje de bienvenida con chips FAQ
- `dashboard.chatPlaceholder`: "Escribe tu pregunta sobre Erasmus+ KA3..." / "Type your Erasmus+ KA3 question..."

### 5. Actualizar las FAQ del chatbot flotante

Actualizar tambien los textos de las FAQ en `ErasmusChat.tsx` para que mencionen KA3 en lugar de (o ademas de) KA220, manteniendo coherencia.

---

### Archivos a crear

| Archivo | Descripcion |
|---------|-------------|
| `src/components/DashboardChat.tsx` | Chatbot inline con streaming y markdown |

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `supabase/functions/erasmus-chat/index.ts` | Anadir regla de rechazo para preguntas fuera de Erasmus+ |
| `src/pages/Dashboard.tsx` | Insertar DashboardChat antes del h1 |
| `src/i18n/es.ts` | Nuevas traducciones del chat inline |
| `src/i18n/en.ts` | Nuevas traducciones del chat inline |

### Notas tecnicas

- Se reutiliza la misma edge function `erasmus-chat` ya existente; no se crea una nueva
- El componente DashboardChat es independiente del ErasmusChat flotante (pueden coexistir)
- Se usa ReactMarkdown (ya instalado) para renderizar enlaces en las respuestas
- El streaming usa la misma logica SSE ya probada en ErasmusChat
- La restriccion de tema se aplica a nivel del system prompt del modelo, no en el frontend

