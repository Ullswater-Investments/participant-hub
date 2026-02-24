import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAllDocuments } from '@/hooks/useDocuments';
import { participantDocuments } from '@/data/documentDefinitions';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Users, FolderOpen, CheckCircle2, Clock, Upload, FileDown, FileText, Download, X } from 'lucide-react';
import { DashboardChat } from '@/components/DashboardChat';
import { exportProgressPDF } from '@/utils/exportPDF';

const participants = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
];

const statusColors: Record<string, string> = {
  pending: 'text-destructive',
  uploaded: 'text-warning',
  verified: 'text-success',
};

const Dashboard = () => {
  const [showUploaded, setShowUploaded] = useState(false);
  const { data: allDocs = [], isLoading } = useAllDocuments();
  const { language, t } = useLanguage();
  const totalDocsPerParticipant = participantDocuments.length;

  const commonDocs = allDocs.filter((d) => d.category === 'common');
  const commonUploaded = commonDocs.filter((d) => d.status === 'uploaded').length;
  const commonVerified = commonDocs.filter((d) => d.status === 'verified').length;

  const getParticipantStats = (pid: number) => {
    const docs = allDocs.filter((d) => d.participant_id === pid);
    const uploaded = docs.filter((d) => d.status === 'uploaded').length;
    const verified = docs.filter((d) => d.status === 'verified').length;
    const completed = uploaded + verified;
    const percentage = totalDocsPerParticipant > 0 ? Math.round((completed / totalDocsPerParticipant) * 100) : 0;
    return { uploaded, verified, pending: totalDocsPerParticipant - completed, percentage };
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl pb-16 sm:pb-0">
      <DashboardChat />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('dashboard.title') as string}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">{t('dashboard.subtitle') as string}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0" onClick={() => exportProgressPDF(allDocs, language)}>
          <FileDown className="w-4 h-4" />
          <span className="hidden sm:inline">{t('dashboard.exportPdf') as string}</span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-bold">
                  {participants.reduce((sum, p) => sum + getParticipantStats(p.id).pending, 0)}
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-tight">{t('dashboard.pendingDocs') as string}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-bold">
                  {participants.reduce((sum, p) => sum + getParticipantStats(p.id).uploaded, 0) + commonUploaded}
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-tight">{t('dashboard.uploadedDocs') as string}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-bold">
                  {participants.reduce((sum, p) => sum + getParticipantStats(p.id).verified, 0) + commonVerified}
                </p>
                <p className="text-[10px] sm:text-sm text-muted-foreground leading-tight">{t('dashboard.verifiedDocs') as string}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('dashboard.progressByParticipant') as string}</h2>
        <div className="grid gap-4">
          {participants.map((p) => {
            const stats = getParticipantStats(p.id);
            return (
              <Link to={`/participante/${p.id}`} key={p.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{t('sidebar.participant') as string} {p.id}</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{stats.percentage}%</span>
                    </div>
                    <Progress value={stats.percentage} className="h-2" />
                    <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs text-muted-foreground">
                      <span className={statusColors.pending}>● {stats.pending} {t('dashboard.pending') as string}</span>
                      <span className={statusColors.uploaded}>● {stats.uploaded} {t('dashboard.uploaded') as string}</span>
                      <span className={statusColors.verified}>● {stats.verified} {t('dashboard.verified') as string}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/comun">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('dashboard.commonFolder') as string}</h3>
                <p className="text-sm text-muted-foreground">{t('dashboard.commonFolderDesc') as string}</p>
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-warning">● {commonUploaded} {t('dashboard.uploaded') as string}</span>
                  <span className="text-success">● {commonVerified} {t('dashboard.verified') as string}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/guias">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t('dashboard.guidesTitle') as string}</h3>
                <p className="text-sm text-muted-foreground">{t('dashboard.guidesDesc') as string}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
