

## Anadir boton de descarga explicito a cada documento

### Cambio

Actualmente, el nombre del archivo funciona como enlace de descarga (hay que hacer clic en el texto). Se anadira un boton con icono de descarga (`Download` de lucide-react) al lado de cada documento, junto a los botones de verificar y eliminar.

### Archivo: `src/components/DocumentChecklist.tsx`

1. Importar el icono `Download` de `lucide-react`
2. Anadir un boton de descarga entre el Badge de estado y el boton de verificar, con:
   - Icono `Download` (3.5x3.5)
   - Estilo similar a los otros botones de accion (color primary, hover con fondo)
   - Tooltip "Descargar archivo"
   - Llama a `handleDownload(doc.file_path)` al hacer clic

El boton sera visible para todos los documentos que tengan un `file_path` valido.

