

## Mostrar sugerencias de preguntas despues de cada respuesta del asistente

### Objetivo
Despues de que el asistente termine de responder, mostrar de nuevo etiquetas con preguntas sugeridas debajo de la respuesta. Las preguntas deben variar para no repetir siempre las mismas, y deben ser relevantes al contexto de la conversacion.

### Cambios necesarios

#### 1. `src/components/DashboardChat.tsx`

**Nuevo pool de preguntas ampliado:**
- Crear un pool mas grande de preguntas (unas 15-20 por idioma) cubriendo distintos temas clave de la convocatoria Youth Together 2026
- Temas: elegibilidad, presupuesto, plazos, documentos, PIC, mandatos, consorcio, actividades, evaluacion, etc.

**Logica de seleccion de preguntas:**
- Despues de cada respuesta del asistente, mostrar 3-4 preguntas sugeridas seleccionadas aleatoriamente del pool
- Excluir preguntas que el usuario ya haya formulado (comparando con el historial de mensajes)
- Mostrar las sugerencias solo cuando el asistente haya terminado de responder (no durante el streaming, es decir cuando `isLoading` es false)

**Ubicacion en el UI:**
- Las etiquetas de sugerencia aparecen justo debajo del ultimo mensaje del asistente, antes del input
- Mismo estilo visual que las FAQ iniciales (botones redondeados con borde)
- Al hacer clic en una sugerencia, se envia como mensaje del usuario

### Detalle tecnico

| Aspecto | Detalle |
|---------|---------|
| Pool de preguntas | ~18 preguntas por idioma, organizadas por temas |
| Seleccion | Aleatorio, excluyendo las ya preguntadas |
| Cantidad mostrada | 3-4 sugerencias por vez |
| Visibilidad | Solo cuando `isLoading === false` y hay al menos un mensaje del asistente |
| Interaccion | Click envia la pregunta como mensaje de usuario |
| Archivo modificado | Solo `src/components/DashboardChat.tsx` |

Se aplicara el mismo cambio al componente `src/components/ErasmusChat.tsx` (chat flotante) para mantener coherencia.

