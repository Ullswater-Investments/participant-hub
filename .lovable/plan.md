
## Añadir botón de borrado de documentos

### Objetivo
Agregar un botón de eliminar (icono papelera) junto a cada archivo subido en la lista de documentos, permitiendo borrar tanto el registro de la base de datos como el archivo del almacenamiento.

### Cambios necesarios

#### 1. `src/hooks/useDocuments.ts` - Nueva mutación `useDeleteDocument`
- Crear una función que elimine el archivo del storage (bucket `documents`) usando `supabase.storage.from('documents').remove([filePath])`
- Eliminar el registro de la tabla `documents` con `supabase.from('documents').delete().eq('id', documentId)`
- Invalidar la query cache tras el borrado
- Mostrar toast de confirmación o error

#### 2. `src/components/DocumentChecklist.tsx` - Añadir botón de borrado
- Ya tiene importado el icono `Trash2` de lucide-react (no se usa actualmente)
- Añadir un botón con el icono `Trash2` junto a cada archivo en la lista
- Incluir confirmación antes de borrar (usando `window.confirm`)
- Deshabilitar el botón mientras se ejecuta la mutación

### Detalle técnico

| Archivo | Cambio |
|---------|--------|
| `useDocuments.ts` | Nueva función `useDeleteDocument()` con mutación para borrar archivo + registro |
| `DocumentChecklist.tsx` | Botón papelera rojo junto a cada archivo, con confirmación previa |
