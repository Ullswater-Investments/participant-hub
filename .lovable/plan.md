

## Eliminar Countdown y expandir el Chat

Se eliminara el componente DeadlineCountdown del dashboard y el chat ocupara todo el ancho disponible.

### Cambios

1. **`src/pages/Dashboard.tsx`**
   - Eliminar la importacion de `DeadlineCountdown`
   - Eliminar el grid de 2 columnas que contiene el countdown y el chat
   - Colocar `DashboardChat` ocupando el ancho completo, sin grid

2. **Archivos que se pueden eliminar** (limpieza):
   - `src/components/DeadlineCountdown.tsx` - ya no se usa

3. **Traducciones**: Las claves `countdown.*` en `es.ts` y `en.ts` se pueden dejar sin efecto (no causan error), o eliminarse para mantener limpieza.

### Resultado
El chat del asistente ocupara todo el ancho superior del dashboard, en lugar de compartir espacio con el countdown.

