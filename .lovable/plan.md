

## Mostrar contadores de documentos comunes en el Dashboard

### Problema actual
- Los contadores globales ("Uploaded docs" y "Verified docs") solo cuentan documentos de participantes (1-5), ignorando los documentos de la carpeta comun.
- La tarjeta "Carpeta comun" no muestra ningun contador de documentos subidos/verificados.

### Cambios necesarios

#### `src/pages/Dashboard.tsx`

**1. Incluir documentos comunes en los contadores globales**
- Calcular estadisticas de documentos comunes (category === 'common') a partir de `allDocs`
- Sumar estos valores a los contadores de "Uploaded docs" y "Verified docs" del panel superior

**2. Mostrar contadores en la tarjeta "Carpeta comun"**
- Anadir debajo del subtitulo de "Carpeta comun" indicadores con el numero de documentos subidos y verificados, usando el mismo estilo de colores del resto del dashboard (naranja para subidos, verde para verificados)

### Detalle tecnico

Se calcularan las estadisticas de documentos comunes filtrando `allDocs` por `category === 'common'`:

```text
commonUploaded = docs con status 'uploaded'
commonVerified = docs con status 'verified'
```

Los contadores globales pasaran de:
- `participants.reduce(...)` (solo participantes)
- a `participants.reduce(...) + commonUploaded/commonVerified`

La tarjeta "Carpeta comun" mostrara algo como:
```text
Carpeta comun
Documentos compartidos del consorcio
X subidos | Y verificados
```

Solo se modifica un archivo: `src/pages/Dashboard.tsx`.

