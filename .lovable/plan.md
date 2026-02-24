

## Ventana flotante con lista de documentos subidos

### Que se hara

Al hacer clic en la tarjeta "Docs subidos" del Dashboard, se abrira una ventana flotante (Popover/Dialog) que muestra la lista completa de todos los documentos con estado "uploaded". La ventana permanecera abierta hasta que el usuario pulse el boton X en la esquina superior derecha.

### Detalles tecnicos

**Archivo: `src/pages/Dashboard.tsx`**

1. Importar `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` de `@/components/ui/dialog` y el icono `X` de lucide-react.
2. Anadir un estado `const [showUploaded, setShowUploaded] = useState(false)`.
3. Convertir la tarjeta "Docs subidos" (lineas 70-84) en clicable: al hacer clic, ejecutar `setShowUploaded(true)` en vez de no hacer nada.
4. Anadir un componente `Dialog` controlado por `showUploaded`:
   - Header con titulo "Documentos subidos" y boton X para cerrar.
   - Lista con ScrollArea mostrando cada documento uploaded (`allDocs.filter(d => d.status === 'uploaded')`).
   - Cada fila mostrara: icono FileText, nombre del archivo, categoria/participante, y un boton de descarga.
   - Si no hay documentos, mostrar mensaje "No hay documentos subidos".
5. El Dialog usa `onOpenChange={setShowUploaded}` para permitir cerrar con X o clic fuera, pero permanece abierto mientras el usuario no lo cierre explicitamente.

### Resultado

El usuario podra ver de un vistazo todos los documentos subidos al hacer clic en la tarjeta del Dashboard, con opcion de descargar cualquiera directamente desde la ventana flotante.
