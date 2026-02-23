import { useDocuments } from '@/hooks/useDocuments';
import { commonDocuments } from '@/data/documentDefinitions';
import { DocumentChecklist } from '@/components/DocumentChecklist';
import { FolderOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CommonFolder = () => {
  const { data: docs = [] } = useDocuments();
  const { t } = useLanguage();
  const commonDocs = docs.filter((d) => d.category === 'common');
  const getDoc = (key: string) => commonDocs.find((d) => d.document_key === key);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
          <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('common.title') as string}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">{t('common.subtitle') as string}</p>
        </div>
      </div>

      <div className="space-y-3">
        {commonDocuments.map((def) => (
          <DocumentChecklist key={def.key} definition={def} document={getDoc(def.key)} participantId={null} />
        ))}
      </div>
    </div>
  );
};

export default CommonFolder;
