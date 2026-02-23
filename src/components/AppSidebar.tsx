import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FolderOpen, BookOpen, LogOut } from 'lucide-react';
import erasmusLogo from '@/assets/erasmus-logo.png';

const participants = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
];

export function AppSidebar() {
  const { logout } = useAuth();
  const { t } = useLanguage();

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <div className="flex flex-col items-center gap-2">
          <img src={erasmusLogo} alt="Erasmus+ KA3" className="w-full max-w-[180px] object-contain" />
          <div className="text-center w-full">
            <h2 className="font-extrabold text-sidebar-foreground text-xl tracking-wide uppercase" style={{ fontFamily: "'DM Sans', 'Arial Black', sans-serif" }}>
              {t('sidebar.portalTitle') as string}
            </h2>
            <p className="text-[10px] text-sidebar-foreground/70">{t('sidebar.portalSubtitle') as string}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            {t('sidebar.general') as string}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end activeClassName="bg-sidebar-accent text-sidebar-accent-foreground">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t('sidebar.dashboard') as string}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            {t('sidebar.participants') as string}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {participants.map((p) => (
                <SidebarMenuItem key={p.id}>
                  <SidebarMenuButton asChild>
                    <NavLink to={`/participante/${p.id}`} activeClassName="bg-sidebar-accent text-sidebar-accent-foreground">
                      <Users className="w-4 h-4" />
                      <span>{t('sidebar.participant') as string} {p.id}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            {t('sidebar.consortium') as string}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/comun" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground">
                    <FolderOpen className="w-4 h-4" />
                    <span>{t('sidebar.commonFolder') as string}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/guias" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{t('sidebar.guides') as string}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="ghost" size="sm" onClick={logout}
          className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="w-4 h-4 mr-2" />
          {t('sidebar.logout') as string}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
