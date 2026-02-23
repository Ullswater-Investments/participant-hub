import { useParams } from 'react-router-dom';
import { useDocuments } from '@/hooks/useDocuments';
import { participantDocuments } from '@/data/documentDefinitions';
import { DocumentChecklist } from '@/components/DocumentChecklist';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ParticipantFolder = () => {
  const { id } = useParams<{ id: string }>();
  const participantId = parseInt(id || '1', 10);
  const { data: docs = [] } = useDocuments(participantId);
  const { t } = useLanguage();

  const adminDocs = participantDocuments.filter((d) => d.category === 'administrative');
  const techDocs = participantDocuments.filter((d) => d.category === 'technical');

  const total = participantDocuments.length;
  const completed = docs.filter((d) => d.status === 'uploaded' || d.status === 'verified').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getDocs = (key: string) => docs.filter((d) => d.document_key === key);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('participant.title') as string} {participantId}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">{t('participant.subtitle') as string}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('participant.overallProgress') as string}</span>
          <span className="font-semibold text-primary">{percentage}% ({completed}/{total})</span>
        </div>
        <Progress value={percentage} className="h-3" />
      </div>

      <Tabs defaultValue="administrative" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex">
          <TabsTrigger value="administrative" className="gap-1.5 sm:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="truncate">{t('participant.administrative') as string} ({adminDocs.length})</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="gap-1.5 sm:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="truncate">{t('participant.technical') as string} ({techDocs.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="administrative" className="space-y-3">
          {adminDocs.map((def) => (
            <DocumentChecklist key={def.key} definition={def} document={getDoc(def.key)} participantId={participantId} />
          ))}
        </TabsContent>

        <TabsContent value="technical" className="space-y-3">
          {techDocs.map((def) => (
            <DocumentChecklist key={def.key} definition={def} document={getDoc(def.key)} participantId={participantId} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantFolder;
