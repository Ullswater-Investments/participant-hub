

## Fix: Forzar el idioma del asistente segun el idioma de la interfaz

### Problema
El system prompt dice "responde en el mismo idioma que el mensaje del usuario", pero despues de varias interacciones el modelo puede cambiar de idioma porque:
1. El system prompt contiene terminos en ambos idiomas
2. La base de conocimiento mezcla espanol e ingles
3. No se envia el idioma seleccionado por el usuario al backend

### Solucion

#### 1. `src/components/DashboardChat.tsx` y `src/components/ErasmusChat.tsx`
- Enviar el parametro `language` (del `LanguageContext`) junto con los mensajes en el body del fetch:
```text
body: JSON.stringify({ messages: allMessages, language })
```

#### 2. `supabase/functions/erasmus-chat/index.ts`
- Leer el parametro `language` del body de la peticion
- Agregar una instruccion explicita al final del system prompt que refuerce el idioma:
```text
Si language === 'en':
  "IMPORTANT: The user's interface is in ENGLISH. You MUST respond ONLY in English regardless of any previous messages."

Si language === 'es':
  "IMPORTANTE: La interfaz del usuario esta en ESPANOL. DEBES responder SOLO en espanol independientemente de mensajes anteriores."
```

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/DashboardChat.tsx` | Enviar `language` en el body del fetch |
| `src/components/ErasmusChat.tsx` | Enviar `language` en el body del fetch |
| `supabase/functions/erasmus-chat/index.ts` | Leer `language` y anadir instruccion de idioma al system prompt |

### Resultado
El asistente siempre respondera en el idioma que el usuario tiene seleccionado en la interfaz, sin importar cuantas preguntas haya hecho previamente.

