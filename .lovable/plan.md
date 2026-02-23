

## Mejorar Version Movil

Tras revisar el portal en formato movil (390x844), se identifican varias mejoras para optimizar la experiencia:

### Problemas detectados

1. **El chat del dashboard ocupa demasiado espacio vertical** - casi toda la primera pantalla visible es el chat, empujando el contenido importante hacia abajo
2. **El boton flotante del chat (ErasmusChat) se solapa con contenido** - el circulo azul tapa las tarjetas inferiores
3. **Las tarjetas de estadisticas (pendientes/subidos/verificados)** podrian ser mas compactas en movil
4. **Falta padding inferior** para evitar que el boton flotante tape contenido
5. **El header se trunca** en pantallas pequenas

### Cambios propuestos

#### 1. `src/components/DashboardChat.tsx` - Reducir altura en movil
- Cambiar la altura del area de mensajes de `h-[260px]` a `h-[180px]` en movil y mantener 260px en desktop
- Usar clases responsivas: `h-[180px] sm:h-[260px]`

#### 2. `src/pages/Dashboard.tsx` - Estadisticas compactas en movil
- Cambiar el grid de estadisticas a una fila horizontal de 3 columnas en movil: `grid-cols-3` en lugar de `grid-cols-1 md:grid-cols-3`
- Reducir padding y tamano de iconos/texto en las tarjetas de stats para que quepan bien en 3 columnas
- Anadir padding inferior (`pb-16`) para dejar espacio al boton flotante

#### 3. `src/components/ErasmusChat.tsx` - Mejorar posicion del boton flotante
- Mover el boton flotante un poco mas arriba en movil: `bottom-20` en movil para no tapar contenido
- Reducir tamano del boton en movil: `w-12 h-12` en vez de `w-14 h-14`

#### 4. `src/components/AppLayout.tsx` - Mejorar header movil
- Reducir el texto del header en movil para evitar truncamiento

#### 5. `src/pages/Dashboard.tsx` - Tarjetas de participante mas compactas
- Reducir padding en las tarjetas de participantes en movil (`pt-4` en vez de `pt-6`)
- Hacer los status dots mas legibles con mejor espaciado

### Detalle tecnico

| Archivo | Cambio principal |
|---------|-----------------|
| `DashboardChat.tsx` | Altura responsiva del chat: `h-[180px] sm:h-[260px]` |
| `Dashboard.tsx` | Grid stats siempre 3 columnas, layout compacto en movil, `pb-16` al contenedor |
| `ErasmusChat.tsx` | Boton flotante `bottom-20 sm:bottom-6`, tamano `w-12 h-12 sm:w-14 sm:h-14` |
| `AppLayout.tsx` | Texto header mas corto en movil |
| `Dashboard.tsx` | Cards participantes con padding reducido en movil |

