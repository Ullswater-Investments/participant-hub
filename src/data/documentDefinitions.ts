export interface BilingualText {
  en: string;
  es: string;
}

export interface DocumentDefinition {
  key: string;
  name: BilingualText;
  category: 'administrative' | 'technical' | 'common';
  description: BilingualText;
  guide: BilingualText;
}

export const participantDocuments: DocumentDefinition[] = [
  // Administrative
  {
    key: 'pic_number',
    name: { es: 'PIC Number y datos de registro', en: 'PIC Number and Registration Data' },
    category: 'administrative',
    description: {
      es: 'Número de identificación del participante en el Participant Register de la Comisión Europea.',
      en: 'Participant identification number in the European Commission Participant Register.',
    },
    guide: {
      es: 'Regístrate en el portal Funding & Tenders (https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register) y obtén tu PIC de 9 dígitos.',
      en: 'Register on the Funding & Tenders portal (https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register) and obtain your 9-digit PIC.',
    },
  },
  {
    key: 'legal_entity_form',
    name: { es: 'Formulario de Entidad Legal', en: 'Legal Entity Form' },
    category: 'administrative',
    description: {
      es: 'Legal Entity Form que certifica los datos legales de la organización.',
      en: 'Legal Entity Form certifying the legal data of the organisation.',
    },
    guide: {
      es: 'Descarga el formulario desde el Participant Register, complétalo con los datos oficiales de la organización y fírmalo por el representante legal.',
      en: 'Download the form from the Participant Register, complete it with the official organisation data and have it signed by the legal representative.',
    },
  },
  {
    key: 'financial_id_form',
    name: { es: 'Formulario de Identificación Financiera', en: 'Financial Identification Form' },
    category: 'administrative',
    description: {
      es: 'Financial Identification Form con los datos bancarios de la organización.',
      en: 'Financial Identification Form with the organisation\'s banking details.',
    },
    guide: {
      es: 'Descarga el formulario BAF del Participant Register, rellena los datos bancarios y solicita el sello/firma del banco.',
      en: 'Download the BAF form from the Participant Register, fill in the banking details and request the bank\'s stamp/signature.',
    },
  },
  {
    key: 'mandate',
    name: { es: 'Mandato firmado (Declaration of Honour)', en: 'Signed Mandate (Declaration of Honour)' },
    category: 'administrative',
    description: {
      es: 'Documento que autoriza al coordinador a actuar en nombre del socio.',
      en: 'Document authorising the coordinator to act on behalf of the partner.',
    },
    guide: {
      es: 'El coordinador proporciona la plantilla del mandato. Debe firmarlo el representante legal de cada organización socia. Incluye declaración de honor sobre la veracidad de los datos.',
      en: 'The coordinator provides the mandate template. It must be signed by the legal representative of each partner organisation. Includes a declaration of honour on the accuracy of the data.',
    },
  },
  {
    key: 'legal_rep_id',
    name: { es: 'Documento de identidad del representante legal', en: 'Legal Representative ID Document' },
    category: 'administrative',
    description: {
      es: 'Copia del DNI/Pasaporte del representante legal de la organización.',
      en: 'Copy of the legal representative\'s ID card/Passport.',
    },
    guide: {
      es: 'Escanea o fotografía el documento de identidad vigente del representante legal. Asegúrate de que sea legible.',
      en: 'Scan or photograph the legal representative\'s valid ID document. Make sure it is legible.',
    },
  },
  {
    key: 'legal_existence',
    name: { es: 'Certificado de existencia legal', en: 'Certificate of Legal Existence' },
    category: 'administrative',
    description: {
      es: 'Documento que acredita la existencia legal de la organización.',
      en: 'Document certifying the legal existence of the organisation.',
    },
    guide: {
      es: 'Puede ser: escritura de constitución, certificado del registro mercantil, estatutos vigentes, o certificado oficial equivalente del país de origen.',
      en: 'Can be: articles of incorporation, commercial register certificate, current statutes, or equivalent official certificate from the country of origin.',
    },
  },
  {
    key: 'financial_statements',
    name: { es: 'Balance de cuentas / Estados financieros', en: 'Balance Sheet / Financial Statements' },
    category: 'administrative',
    description: {
      es: 'Estados financieros de los últimos ejercicios (si aplica según la convocatoria).',
      en: 'Financial statements from recent fiscal years (if required by the call).',
    },
    guide: {
      es: 'Proporciona las cuentas anuales del último ejercicio cerrado. Solo es obligatorio si lo requiere la convocatoria específica o si la subvención supera cierto umbral.',
      en: 'Provide the annual accounts for the last closed fiscal year. Only mandatory if required by the specific call or if the grant exceeds a certain threshold.',
    },
  },
  // Technical
  {
    key: 'org_description',
    name: { es: 'Descripción de la organización', en: 'Organisation Description' },
    category: 'technical',
    description: {
      es: 'Descripción de la organización y su experiencia relevante para el proyecto.',
      en: 'Description of the organisation and its relevant experience for the project.',
    },
    guide: {
      es: 'Redacta un texto de 1-2 páginas describiendo la organización, su misión, áreas de actividad, experiencia en proyectos europeos previos y capacidad para contribuir al proyecto.',
      en: 'Write a 1-2 page text describing the organisation, its mission, areas of activity, experience in previous European projects and capacity to contribute to the project.',
    },
  },
  {
    key: 'staff_cvs',
    name: { es: 'CVs del personal clave', en: 'Key Staff CVs' },
    category: 'technical',
    description: {
      es: 'Currículum Vitae del personal que participará en el proyecto.',
      en: 'Curriculum Vitae of the staff who will participate in the project.',
    },
    guide: {
      es: 'Utiliza preferiblemente el formato Europass. Incluye los CVs de las personas clave que estarán involucradas en la ejecución del proyecto (máx. 2-3 personas).',
      en: 'Preferably use Europass format. Include the CVs of key people who will be involved in project implementation (max. 2-3 people).',
    },
  },
  {
    key: 'contribution_description',
    name: { es: 'Contribución al proyecto', en: 'Project Contribution' },
    category: 'technical',
    description: {
      es: 'Descripción detallada de las actividades y resultados que aportará el participante.',
      en: 'Detailed description of activities and outputs the participant will contribute.',
    },
    guide: {
      es: 'Detalla las actividades concretas que realizará tu organización, los resultados esperados, los paquetes de trabajo en los que participará y su rol específico.',
      en: 'Detail the specific activities your organisation will carry out, expected results, work packages it will participate in and its specific role.',
    },
  },
  {
    key: 'participant_budget',
    name: { es: 'Presupuesto desglosado', en: 'Itemised Budget' },
    category: 'technical',
    description: {
      es: 'Excel presupuestario con el desglose de costes del participante.',
      en: 'Budget Excel with the participant\'s cost breakdown.',
    },
    guide: {
      es: 'Utiliza la plantilla Excel proporcionada por el coordinador. Desglosa los costes por categorías: personal, viajes, equipamiento, subcontratación y otros costes directos.',
      en: 'Use the Excel template provided by the coordinator. Break down costs by categories: staff, travel, equipment, subcontracting and other direct costs.',
    },
  },
  {
    key: 'commitment_letter',
    name: { es: 'Carta de compromiso firmada', en: 'Signed Commitment Letter' },
    category: 'technical',
    description: {
      es: 'Carta firmada por el representante legal comprometiéndose con el proyecto.',
      en: 'Letter signed by the legal representative committing to the project.',
    },
    guide: {
      es: 'Redacta una carta en papel oficial de la organización confirmando el compromiso de participación, la aportación de recursos y la cofinanciación si procede.',
      en: 'Draft a letter on official organisational letterhead confirming participation commitment, resource contribution and co-financing if applicable.',
    },
  },
  {
    key: 'resources_infrastructure',
    name: { es: 'Recursos e infraestructura', en: 'Resources & Infrastructure' },
    category: 'technical',
    description: {
      es: 'Descripción de los recursos e infraestructura disponibles para el proyecto.',
      en: 'Description of resources and infrastructure available for the project.',
    },
    guide: {
      es: 'Detalla los recursos humanos, materiales, tecnológicos y de infraestructura que la organización pondrá a disposición del proyecto.',
      en: 'Detail the human, material, technological and infrastructure resources the organisation will make available to the project.',
    },
  },
];

export const commonDocuments: DocumentDefinition[] = [
  {
    key: 'technical_memory',
    name: { es: 'Plantilla de la Memoria Técnica', en: 'Technical Memory Template' },
    category: 'common',
    description: {
      es: 'Technical Description template del proyecto.',
      en: 'Project Technical Description template.',
    },
    guide: {
      es: 'Documento maestro que describe el proyecto: objetivos, metodología, actividades, resultados esperados, impacto y sostenibilidad.',
      en: 'Master document describing the project: objectives, methodology, activities, expected results, impact and sustainability.',
    },
  },
  {
    key: 'letters_of_interest',
    name: { es: 'Cartas de interés / apoyo', en: 'Letters of Interest / Support' },
    category: 'common',
    description: {
      es: 'Letters of Interest/Support de stakeholders y organizaciones asociadas.',
      en: 'Letters of Interest/Support from stakeholders and associated organisations.',
    },
    guide: {
      es: 'Solicita cartas de apoyo a organizaciones relevantes del sector que puedan respaldar la pertinencia y el impacto del proyecto.',
      en: 'Request support letters from relevant sector organisations that can endorse the relevance and impact of the project.',
    },
  },
  {
    key: 'consolidated_budget',
    name: { es: 'Presupuesto consolidado', en: 'Consolidated Budget' },
    category: 'common',
    description: {
      es: 'Presupuesto total consolidado de todo el consorcio.',
      en: 'Total consolidated budget for the entire consortium.',
    },
    guide: {
      es: 'El coordinador consolida todos los presupuestos individuales en un documento único que refleja el coste total del proyecto.',
      en: 'The coordinator consolidates all individual budgets into a single document reflecting the total project cost.',
    },
  },
  {
    key: 'consortium_agreement',
    name: { es: 'Acuerdo de consorcio (borrador)', en: 'Consortium Agreement (draft)' },
    category: 'common',
    description: {
      es: 'Borrador del acuerdo de consorcio entre todos los socios.',
      en: 'Draft consortium agreement between all partners.',
    },
    guide: {
      es: 'Documento que regula las relaciones entre socios: derechos de propiedad intelectual, resolución de conflictos, distribución de responsabilidades, etc.',
      en: 'Document governing the relationships between partners: intellectual property rights, conflict resolution, distribution of responsibilities, etc.',
    },
  },
  {
    key: 'call_guides',
    name: { es: 'Guías y manuales de la convocatoria', en: 'Call Guidelines and Manuals' },
    category: 'common',
    description: {
      es: 'Documentación oficial de la convocatoria Erasmus+.',
      en: 'Official Erasmus+ call documentation.',
    },
    guide: {
      es: 'Incluye la guía del programa Erasmus+, plantillas oficiales, FAQ y cualquier documento de referencia publicado por la Agencia Nacional o la Comisión Europea.',
      en: 'Includes the Erasmus+ programme guide, official templates, FAQs and any reference document published by the National Agency or the European Commission.',
    },
  },
  {
    key: 'other_references',
    name: { es: 'Otros documentos de referencia', en: 'Other Reference Documents' },
    category: 'common',
    description: {
      es: 'Cualquier otro documento compartido relevante para la propuesta.',
      en: 'Any other shared document relevant to the proposal.',
    },
    guide: {
      es: 'Espacio para subir documentos adicionales que puedan ser útiles para todos los socios del consorcio.',
      en: 'Space to upload additional documents that may be useful for all consortium partners.',
    },
  },
];
