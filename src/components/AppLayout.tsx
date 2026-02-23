import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { ErasmusChat } from '@/components/ErasmusChat';

export function AppLayout() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-card px-3 sm:px-4 gap-2 sm:gap-4 shrink-0">
            <SidebarTrigger />
            <span className="text-xs sm:text-sm text-muted-foreground flex-1 truncate">{t('header.subtitle') as string}</span>
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-1 sm:gap-1.5 text-xs font-semibold shrink-0">
              <Globe className="w-4 h-4" />
              {language === 'es' ? 'EN' : 'ES'}
            </Button>
          </header>
          <div className="flex-1 p-3 sm:p-6 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <ErasmusChat />
    </SidebarProvider>
  );
}
