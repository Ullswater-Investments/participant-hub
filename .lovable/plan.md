

## Cambiar la tipografia de los titulos para que coincida con Erasmus+

### Contexto

El logotipo oficial de Erasmus+ usa la fuente "EC Square Sans" (tipografia oficial de la UE). La alternativa mas cercana disponible en Google Fonts es **Source Sans 3**, una sans-serif humanista limpia y moderna que tiene proporciones y estilo muy similares.

Actualmente los titulos (h1, h2, h3) usan **Playfair Display**, una fuente serif decorativa que no encaja con la identidad visual de Erasmus+.

### Cambios

**Archivo: `src/index.css`**

1. Reemplazar la importacion de `Playfair Display` por `Source Sans 3` (pesos 600 y 700) en la URL de Google Fonts
2. Actualizar la regla CSS de `h1, h2, h3` para usar `'Source Sans 3', sans-serif` en lugar de `'Playfair Display', serif`

### Resultado

Todos los titulos de la aplicacion (Panel principal, nombres de secciones, etc.) usaran Source Sans 3 Bold, una tipografia limpia y profesional que armoniza con el logotipo de Erasmus+.

### Detalle tecnico

```text
Antes:  @import url('...family=Playfair+Display:wght@600;700...')
        h1, h2, h3 { font-family: 'Playfair Display', serif; }

Despues: @import url('...family=Source+Sans+3:wght@600;700...')
         h1, h2, h3 { font-family: 'Source Sans 3', sans-serif; }
```

Solo se modifica un archivo: `src/index.css`.
