export interface DocumentDefinition {
  key: string;
  name: string;
  category: 'administrative' | 'technical' | 'common';
  description: string;
  guide: string;
}

export const participantDocuments: DocumentDefinition[] = [
  // Administrative
  {
    key: 'pic_number',
    name: 'PIC Number y datos de registro',
    category: 'administrative',
    description: 'Número de identificación del participante en el Participant Register de la Comisión Europea.',
    guide: 'Regístrate en el portal Funding & Tenders (https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register) y obtén tu PIC de 9 dígitos.',
  },
  {
    key: 'legal_entity_form',
    name: 'Formulario de Entidad Legal',
    category: 'administrative',
    description: 'Legal Entity Form que certifica los datos legales de la organización.',
    guide: 'Descarga el formulario desde el Participant Register, complétalo con los datos oficiales de la organización y fírmalo por el representante legal.',
  },
  {
    key: 'financial_id_form',
    name: 'Formulario de Identificación Financiera',
    category: 'administrative',
    description: 'Financial Identification Form con los datos bancarios de la organización.',
    guide: 'Descarga el formulario BAF del Participant Register, rellena los datos bancarios y solicita el sello/firma del banco.',
  },
  {
    key: 'mandate',
    name: 'Mandato firmado (Declaration of Honour)',
    category: 'administrative',
    description: 'Documento que autoriza al coordinador a actuar en nombre del socio.',
    guide: 'El coordinador proporciona la plantilla del mandato. Debe firmarlo el representante legal de cada organización socia. Incluye declaración de honor sobre la veracidad de los datos.',
  },
  {
    key: 'legal_rep_id',
    name: 'Documento de identidad del representante legal',
    category: 'administrative',
    description: 'Copia del DNI/Pasaporte del representante legal de la organización.',
    guide: 'Escanea o fotografía el documento de identidad vigente del representante legal. Asegúrate de que sea legible.',
  },
  {
    key: 'legal_existence',
    name: 'Certificado de existencia legal',
    category: 'administrative',
    description: 'Documento que acredita la existencia legal de la organización.',
    guide: 'Puede ser: escritura de constitución, certificado del registro mercantil, estatutos vigentes, o certificado oficial equivalente del país de origen.',
  },
  {
    key: 'financial_statements',
    name: 'Balance de cuentas / Estados financieros',
    category: 'administrative',
    description: 'Estados financieros de los últimos ejercicios (si aplica según la convocatoria).',
    guide: 'Proporciona las cuentas anuales del último ejercicio cerrado. Solo es obligatorio si lo requiere la convocatoria específica o si la subvención supera cierto umbral.',
  },
  // Technical
  {
    key: 'org_description',
    name: 'Descripción de la organización',
    category: 'technical',
    description: 'Descripción de la organización y su experiencia relevante para el proyecto.',
    guide: 'Redacta un texto de 1-2 páginas describiendo la organización, su misión, áreas de actividad, experiencia en proyectos europeos previos y capacidad para contribuir al proyecto.',
  },
  {
    key: 'staff_cvs',
    name: 'CVs del personal clave',
    category: 'technical',
    description: 'Currículum Vitae del personal que participará en el proyecto.',
    guide: 'Utiliza preferiblemente el formato Europass. Incluye los CVs de las personas clave que estarán involucradas en la ejecución del proyecto (máx. 2-3 personas).',
  },
  {
    key: 'contribution_description',
    name: 'Contribución al proyecto',
    category: 'technical',
    description: 'Descripción detallada de las actividades y resultados que aportará el participante.',
    guide: 'Detalla las actividades concretas que realizará tu organización, los resultados esperados, los paquetes de trabajo en los que participará y su rol específico.',
  },
  {
    key: 'participant_budget',
    name: 'Presupuesto desglosado',
    category: 'technical',
    description: 'Excel presupuestario con el desglose de costes del participante.',
    guide: 'Utiliza la plantilla Excel proporcionada por el coordinador. Desglosa los costes por categorías: personal, viajes, equipamiento, subcontratación y otros costes directos.',
  },
  {
    key: 'commitment_letter',
    name: 'Carta de compromiso firmada',
    category: 'technical',
    description: 'Carta firmada por el representante legal comprometiéndose con el proyecto.',
    guide: 'Redacta una carta en papel oficial de la organización confirmando el compromiso de participación, la aportación de recursos y la cofinanciación si procede.',
  },
  {
    key: 'resources_infrastructure',
    name: 'Recursos e infraestructura',
    category: 'technical',
    description: 'Descripción de los recursos e infraestructura disponibles para el proyecto.',
    guide: 'Detalla los recursos humanos, materiales, tecnológicos y de infraestructura que la organización pondrá a disposición del proyecto.',
  },
];

export const commonDocuments: DocumentDefinition[] = [
  {
    key: 'technical_memory',
    name: 'Plantilla de la Memoria Técnica',
    category: 'common',
    description: 'Technical Description template del proyecto.',
    guide: 'Documento maestro que describe el proyecto: objetivos, metodología, actividades, resultados esperados, impacto y sostenibilidad.',
  },
  {
    key: 'letters_of_interest',
    name: 'Cartas de interés / apoyo',
    category: 'common',
    description: 'Letters of Interest/Support de stakeholders y organizaciones asociadas.',
    guide: 'Solicita cartas de apoyo a organizaciones relevantes del sector que puedan respaldar la pertinencia y el impacto del proyecto.',
  },
  {
    key: 'consolidated_budget',
    name: 'Presupuesto consolidado',
    category: 'common',
    description: 'Presupuesto total consolidado de todo el consorcio.',
    guide: 'El coordinador consolida todos los presupuestos individuales en un documento único que refleja el coste total del proyecto.',
  },
  {
    key: 'consortium_agreement',
    name: 'Acuerdo de consorcio (borrador)',
    category: 'common',
    description: 'Borrador del acuerdo de consorcio entre todos los socios.',
    guide: 'Documento que regula las relaciones entre socios: derechos de propiedad intelectual, resolución de conflictos, distribución de responsabilidades, etc.',
  },
  {
    key: 'call_guides',
    name: 'Guías y manuales de la convocatoria',
    category: 'common',
    description: 'Documentación oficial de la convocatoria Erasmus+.',
    guide: 'Incluye la guía del programa Erasmus+, plantillas oficiales, FAQ y cualquier documento de referencia publicado por la Agencia Nacional o la Comisión Europea.',
  },
  {
    key: 'other_references',
    name: 'Otros documentos de referencia',
    category: 'common',
    description: 'Cualquier otro documento compartido relevante para la propuesta.',
    guide: 'Espacio para subir documentos adicionales que puedan ser útiles para todos los socios del consorcio.',
  },
];
