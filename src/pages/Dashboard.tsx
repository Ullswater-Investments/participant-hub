import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAllDocuments } from '@/hooks/useDocuments';
import { participantDocuments } from '@/data/documentDefinitions';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Users, FolderOpen, CheckCircle2, Clock, Upload } from 'lucide-react';

const participants = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
];

const statusColors: Record<string, string> = {
  pending: 'text-destructive',
  uploaded: 'text-warning',
  verified: 'text-success',
};

const Dashboard = () => {
  const { data: allDocs = [], isLoading } = useAllDocuments();
  const { t } = useLanguage();
  const totalDocsPerParticipant = participantDocuments.length;

  const getParticipantStats = (pid: number) => {
    const docs = allDocs.filter((d) => d.participant_id === pid);
    const uploaded = docs.filter((d) => d.status === 'uploaded').length;
    const verified = docs.filter((d) => d.status === 'verified').length;
    const completed = uploaded + verified;
    const percentage = totalDocsPerParticipant > 0 ? Math.round((completed / totalDocsPerParticipant) * 100) : 0;
    return { uploaded, verified, pending: totalDocsPerParticipant - completed, percentage };
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title') as string}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.subtitle') as string}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {participants.reduce((sum, p) => sum + getParticipantStats(p.id).pending, 0)}
                </p>
                <p className="text-sm text-muted-foreground">{t('dashboard.pendingDocs') as string}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Upload className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {participants.reduce((sum, p) => sum + getParticipantStats(p.id).uploaded, 0)}
                </p>
                <p className="text-sm text-muted-foreground">{t('dashboard.uploadedDocs') as string}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {participants.reduce((sum, p) => sum + getParticipantStats(p.id).verified, 0)}
                </p>
                <p className="text-sm text-muted-foreground">{t('dashboard.verifiedDocs') as string}</p>
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
                  <CardContent className="pt-6">
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
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
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
