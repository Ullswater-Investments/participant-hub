

## Fix: El boton de descarga no funciona

### Problema

El error en la captura muestra: `"querystring must have required property 'token'"`. Esto ocurre porque `createSignedUrl` esta generando una URL incorrecta para el bucket `documents`, que esta configurado como **publico**. Al abrir esa URL con `window.open`, el navegador navega a la pagina del endpoint de firma en vez de descargar el archivo.

### Solucion

**Archivo: `src/components/DocumentChecklist.tsx`**

Reemplazar la funcion `handleDownload` con una que:

1. Use `getPublicUrl()` en lugar de `createSignedUrl()`, ya que el bucket es publico.
2. Descargue el archivo realmente al ordenador del usuario usando `fetch` + `Blob` + un enlace temporal con atributo `download`, en vez de solo abrir una pestana nueva.

Codigo actual:
```typescript
const handleDownload = async (filePath: string) => {
  const { data } = await supabase.storage.from('documents').createSignedUrl(filePath, 3600);
  if (data?.signedUrl) {
    window.open(data.signedUrl, '_blank');
  }
};
```

Codigo nuevo:
```typescript
const handleDownload = async (filePath: string, fileName?: string) => {
  const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
  if (data?.publicUrl) {
    try {
      const response = await fetch(data.publicUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || filePath.split('/').pop() || 'documento';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      // Fallback: abrir en nueva pestana
      window.open(data.publicUrl, '_blank');
    }
  }
};
```

3. Actualizar las dos llamadas a `handleDownload` para pasar tambien el nombre del archivo:
   - En el clic del nombre: `handleDownload(doc.file_path, doc.file_name)`
   - En el boton de descarga: `handleDownload(doc.file_path!, doc.file_name)`

### Resultado

Al pulsar el boton de descarga, el archivo se descargara directamente al ordenador del usuario con su nombre original.

