
## Anadir boton de validar documentos

### Objetivo
Agregar un boton de validacion (check/tick) junto al boton de borrar en cada archivo subido. Al validar, el estado del documento cambia a "verified" y se refleja automaticamente en el contador de "Docs verificados" del panel principal.

### Cambios necesarios

#### 1. `src/hooks/useDocuments.ts` - Nueva mutacion `useVerifyDocument`
- Crear una funcion que actualice el campo `status` a `'verified'` en la tabla `documents` usando `supabase.from('documents').update({ status: 'verified' }).eq('id', documentId)`
- Invalidar la query cache tras la actualizacion
- Mostrar toast de confirmacion

#### 2. `src/components/DocumentChecklist.tsx` - Anadir boton de validar
- Importar un icono adecuado (por ejemplo `CheckCircle2` que ya esta importado)
- Anadir un boton con icono de check junto al boton de borrar en cada archivo de la lista
- El boton solo aparece si el documento aun no esta verificado (status !== 'verified')
- Al hacer clic, llama a la mutacion `useVerifyDocument`
- Deshabilitar el boton mientras se ejecuta la mutacion

### Flujo de datos
- Al validar un documento, su status pasa de `'uploaded'` a `'verified'`
- El badge del documento individual cambia de flecha (uploaded) a check (verified)
- El badge general del DocumentChecklist cambia a "Verificado" cuando al menos un archivo esta verificado
- El contador "Docs verificados" en el Dashboard se actualiza automaticamente porque usa la misma query de documentos

### Detalle tecnico

| Archivo | Cambio |
|---------|--------|
| `useDocuments.ts` | Nueva funcion `useVerifyDocument()` con mutacion para cambiar status a 'verified' |
| `DocumentChecklist.tsx` | Boton check verde junto al boton de borrar, visible solo para docs no verificados |
