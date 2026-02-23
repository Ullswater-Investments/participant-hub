import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, BookOpen, Globe, FileText, Calculator, CheckSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const guideIcons = [Globe, FileText, Calculator, CheckSquare, BookOpen];

const guideLinks = [
  'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register',
  'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register',
  undefined,
  undefined,
  'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/ERASMUS-YOUTH-2026-YOUTH-TOG',
];

const usefulLinkUrls = [
  'https://ec.europa.eu/info/funding-tenders/opportunities/portal',
  'https://erasmus-plus.ec.europa.eu/document/erasmus-programme-guide-2026',
  'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register',
  'https://www.sepie.es/',
  'https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/ERASMUS-YOUTH-2026-YOUTH-TOG',
];

const Guides = () => {
  const { t } = useLanguage();

  const guides = [
    { titleKey: 'guides.guide1Title', stepsKey: 'guides.guide1Steps', link: guideLinks[0] },
    { titleKey: 'guides.guide2Title', stepsKey: 'guides.guide2Steps', link: guideLinks[1] },
    { titleKey: 'guides.guide3Title', stepsKey: 'guides.guide3Steps', link: guideLinks[2] },
    { titleKey: 'guides.guide4Title', stepsKey: 'guides.guide4Steps', link: guideLinks[3] },
  ];

  const linkKeys = ['guides.link1', 'guides.link2', 'guides.link3', 'guides.link4', 'guides.link5'];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('guides.title') as string}</h1>
          <p className="text-sm sm:text-base text-muted-foreground truncate">{t('guides.subtitle') as string}</p>
        </div>
      </div>

      <div className="space-y-4">
        {guides.map((guide, i) => {
          const Icon = guideIcons[i];
          const steps = t(guide.stepsKey) as string[];
          return (
            <Card key={i}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Icon className="w-5 h-5 text-primary" />
                  {t(guide.titleKey) as string}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-foreground/80">
                  {steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2">
                      {!step.startsWith('✅') && <span className="text-primary font-semibold text-xs mt-0.5">{j + 1}.</span>}
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                {guide.link && (
                  <a href={guide.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3">
                    <ExternalLink className="w-3 h-3" />
                    {t('guides.viewResource') as string}
                  </a>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('guides.usefulLinks') as string}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {linkKeys.map((key, i) => (
              <li key={i}>
                <a href={usefulLinkUrls[i]} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  {t(key) as string}
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
