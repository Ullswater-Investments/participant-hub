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

  const getDoc = (key: string) => docs.find((d) => d.document_key === key);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">{t('participant.title') as string} {participantId}</h1>
        <p className="text-muted-foreground mt-1">{t('participant.subtitle') as string}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('participant.overallProgress') as string}</span>
          <span className="font-semibold text-primary">{percentage}% ({completed}/{total})</span>
        </div>
        <Progress value={percentage} className="h-3" />
      </div>

      <Tabs defaultValue="administrative" className="space-y-4">
        <TabsList>
          <TabsTrigger value="administrative" className="gap-2">
            <Briefcase className="w-4 h-4" />
            {t('participant.administrative') as string} ({adminDocs.length})
          </TabsTrigger>
          <TabsTrigger value="technical" className="gap-2">
            <FileText className="w-4 h-4" />
            {t('participant.technical') as string} ({techDocs.length})
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
