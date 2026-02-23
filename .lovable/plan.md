

## Portal Web de Gestión de Propuesta Erasmus+

Portal web para coordinar la preparación y recopilación de documentos administrativos y técnicos de una propuesta Erasmus+, con carpetas por socio y espacio compartido.

---

### 1. Página de acceso con contraseña compartida
- Pantalla de login simple con una contraseña única para todo el consorcio
- Una vez introducida, se guarda en sesión y da acceso al portal completo
- Sin registro de usuarios individuales

### 2. Panel principal (Dashboard)
- Vista general del estado de preparación de la propuesta
- Barra de progreso por cada participante mostrando % de documentos completados
- Resumen rápido: documentos pendientes, subidos y verificados por socio
- Acceso rápido a cada carpeta de participante y a la carpeta común

### 3. Carpetas individuales por participante (Participante 1-5)
Cada participante tiene su carpeta con un **checklist de documentos** organizados en dos secciones:

**Documentación Administrativa:**
- PIC number y datos de registro en el Participant Register
- Formulario de entidad legal (Legal Entity Form)
- Formulario de identificación financiera (Financial Identification Form)
- Mandato firmado (Mandate / Declaration of Honour)
- Documento de identificación del representante legal
- Certificado de existencia legal de la organización
- Balance de cuentas / estados financieros (si aplica)

**Documentación Técnica:**
- Descripción de la organización y experiencia relevante
- CV del personal clave involucrado en el proyecto
- Descripción de la contribución al proyecto (actividades y resultados)
- Presupuesto desglosado del participante (Excel presupuestario)
- Carta de compromiso firmada
- Recursos e infraestructura disponibles

Cada documento del checklist mostrará:
- Estado (pendiente / subido / verificado)
- Botón para subir archivo (PDF, Excel, Word)
- Guía explicativa de qué es el documento y cómo obtenerlo
- Posibilidad de añadir notas/comentarios

### 4. Carpeta Común del Consorcio
Espacio compartido para documentos transversales:
- **Plantilla de la Memoria Técnica** (Technical Description template)
- **Cartas de interés** (Letters of Interest/Support)
- **Presupuesto consolidado** del consorcio
- **Acuerdo de consorcio** (borrador)
- **Guías y manuales** de la convocatoria
- Cualquier otro documento de referencia compartido

### 5. Sección de Guías e Información
Página informativa que explica:
- Pasos para registrarse en el Participant Register y obtener el PIC
- Cómo descargar y gestionar mandatos
- Cómo rellenar el Excel presupuestario sin errores
- Checklist general de requisitos de la convocatoria Erasmus+
- Enlaces útiles a la web de la Agencia Nacional y portal Funding & Tenders

### 6. Diseño y navegación
- Barra lateral (sidebar) con acceso a cada participante y carpeta común
- Diseño limpio y profesional, fácil de usar para perfiles no técnicos
- Indicadores visuales de progreso con iconos y colores (rojo/amarillo/verde)
- Responsive para uso en móvil y tablet

### Notas técnicas
- Se usará Supabase como backend para almacenamiento de archivos y datos
- Los documentos se guardarán en Supabase Storage con buckets por participante
- Los datos del checklist y estados se guardarán en base de datos

