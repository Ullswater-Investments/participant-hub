import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen, FileText, Calculator, CheckSquare, Globe } from 'lucide-react';

const guides = [
  {
    title: 'Cómo registrarse y obtener el PIC',
    icon: Globe,
    content: [
      'Accede al portal Funding & Tenders de la Comisión Europea.',
      'Regístrate como organización en el Participant Register.',
      'Completa todos los datos obligatorios de la organización.',
      'Sube los documentos requeridos (Legal Entity Form, Financial ID Form).',
      'Recibirás un PIC (Participant Identification Code) de 9 dígitos.',
      'Este PIC es necesario para participar en cualquier convocatoria europea.',
    ],
    link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register',
  },
  {
    title: 'Cómo descargar y gestionar mandatos',
    icon: FileText,
    content: [
      'El mandato autoriza al coordinador a actuar en nombre de cada socio.',
      'El coordinador genera el mandato desde el portal Funding & Tenders.',
      'Cada socio debe revisar, firmar y devolver el mandato al coordinador.',
      'El mandato debe estar firmado por el representante legal de cada organización.',
      'Incluye una Declaration of Honour sobre la veracidad de los datos.',
      'Guarda una copia firmada y sellada para vuestros archivos.',
    ],
    link: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register',
  },
  {
    title: 'Cómo rellenar el Excel presupuestario',
    icon: Calculator,
    content: [
      'Utiliza exclusivamente la plantilla Excel proporcionada por el coordinador.',
      'No modifiques la estructura ni las fórmulas de las hojas protegidas.',
      'Desglosa los costes en las categorías: personal, viajes, equipamiento, subcontratación.',
      'Los costes deben ser realistas, justificables y coherentes con las actividades.',
      'En Erasmus+ con Lump Sum, define los Work Packages y asigna costes por paquete.',
      'Verifica que los totales cuadren antes de enviar.',
    ],
  },
  {
    title: 'Checklist general Erasmus+',
    icon: CheckSquare,
    content: [
      '✅ Todos los socios tienen PIC válido y datos actualizados en el Participant Register.',
      '✅ Legal Entity Forms y Financial ID Forms subidos al Participant Register.',
      '✅ Mandatos firmados por todos los socios y subidos al portal.',
      '✅ Memoria técnica completada con la contribución de todos los socios.',
      '✅ Presupuesto desglosado por socio y consolidado del consorcio.',
      '✅ Cartas de compromiso firmadas por cada organización.',
      '✅ CVs del personal clave en formato Europass.',
      '✅ Cartas de apoyo/interés de stakeholders relevantes.',
      '✅ Revisión final del formulario electrónico de solicitud.',
      '✅ Envío dentro del plazo de la convocatoria.',
    ],
  },
];

const usefulLinks = [
  { name: 'Portal Funding & Tenders', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal' },
  { name: 'Guía del Programa Erasmus+', url: 'https://erasmus-plus.ec.europa.eu/programme-guide/erasmusplus-programme-guide' },
  { name: 'Participant Register', url: 'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register' },
  { name: 'SEPIE (Agencia Nacional España)', url: 'https://www.sepie.es/' },
  { name: 'Plantillas oficiales Erasmus+', url: 'https://erasmus-plus.ec.europa.eu/resources-and-tools' },
];

const Guides = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Guías e información</h1>
          <p className="text-muted-foreground">Instrucciones paso a paso para preparar la propuesta Erasmus+</p>
        </div>
      </div>

      <div className="space-y-4">
        {guides.map((guide, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <guide.icon className="w-5 h-5 text-primary" />
                {guide.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-foreground/80">
                {guide.content.map((step, j) => (
                  <li key={j} className="flex items-start gap-2">
                    {!step.startsWith('✅') && <span className="text-primary font-semibold text-xs mt-0.5">{j + 1}.</span>}
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {guide.link && (
                <a
                  href={guide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
                >
                  <ExternalLink className="w-3 h-3" />
                  Ver recurso oficial
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>🔗 Enlaces útiles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {usefulLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Guides;
