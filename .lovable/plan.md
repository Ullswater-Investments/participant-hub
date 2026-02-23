

## Fix: El asistente responde en el idioma incorrecto

### Problema identificado

En el edge function `erasmus-chat/index.ts` hay tres problemas que causan la confusion de idioma:

1. **Regla contradictoria**: La regla 2 del system prompt dice "Answer in the SAME LANGUAGE as the user's message", lo cual compite con la instruccion de idioma (`langInstruction`) que se anade al final.
2. **Posicion debil**: La instruccion de idioma se anade al final de un system prompt muy largo (~100 lineas). Los modelos tienden a dar mas peso al principio.
3. **Mensajes de error en espanol**: Los errores 429/402/500 estan hardcoded en espanol, lo que puede confundir al modelo en contextos posteriores.

### Solucion

#### Archivo: `supabase/functions/erasmus-chat/index.ts`

**Cambio 1 - Eliminar la regla 2 contradictoria**
- Quitar la linea: `"2. Answer in the SAME LANGUAGE as the user's message (Spanish or English)."`
- Esto elimina la ambiguedad entre la regla y la instruccion explicita de idioma.

**Cambio 2 - Mover la instruccion de idioma al PRINCIPIO del system prompt**
- En vez de concatenar `langInstruction` al final (`SYSTEM_PROMPT + langInstruction`), colocarlo como primer parrafo del contenido del system message. El formato sera:
```text
[Instruccion de idioma fuerte]

[Resto del system prompt sin la regla 2]
```

**Cambio 3 - Hacer los mensajes de error bilingues**
- Usar el parametro `language` para devolver los mensajes de error 429, 402 y 500 en el idioma correcto:
```text
language === 'en' ? "Too many requests. Try again in a few seconds." : "Demasiadas solicitudes..."
language === 'en' ? "AI credits exhausted. Contact the administrator." : "Creditos de IA agotados..."
language === 'en' ? "AI service error" : "Error del servicio de IA"
```

### Resultado esperado
El asistente siempre respondera en el idioma de la interfaz del usuario, sin cambiar de idioma durante la conversacion.
