import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DEADLINE = new Date('2026-02-26T23:59:59Z');

function getTimeLeft() {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes, expired: false };
}

export function DeadlineCountdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const isUrgent = timeLeft.days <= 7 && !timeLeft.expired;

  return (
    <Card className={`border-2 ${isUrgent ? 'border-destructive/50 bg-destructive/5' : 'border-primary/20 bg-primary/5'}`}>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUrgent ? 'bg-destructive/10' : 'bg-primary/10'}`}>
            <CalendarClock className={`w-5 h-5 ${isUrgent ? 'text-destructive' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t('countdown.title') as string}</h3>
            <p className="text-xs text-muted-foreground">26/02/2026 — ERASMUS-YOUTH-2026-YOUTH-TOG</p>
          </div>
        </div>
        {timeLeft.expired ? (
          <p className="text-sm font-medium text-destructive">{t('countdown.expired') as string}</p>
        ) : (
          <div className="flex gap-3">
            <div className="text-center">
              <p className={`text-2xl font-bold ${isUrgent ? 'text-destructive' : 'text-primary'}`}>{timeLeft.days}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{t('countdown.days') as string}</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${isUrgent ? 'text-destructive' : 'text-primary'}`}>{timeLeft.hours}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{t('countdown.hours') as string}</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${isUrgent ? 'text-destructive' : 'text-primary'}`}>{timeLeft.minutes}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{t('countdown.minutes') as string}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
