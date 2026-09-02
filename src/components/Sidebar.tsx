import { NavLink, useLocation } from "react-router-dom";
import {
  BookOpen,
  Languages,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  UserRound,
} from "lucide-react";
import { navItems } from "@/data/preparation";
import { useThemeContext } from "@/hooks/theme-provider";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const iconButtonClass =
  "size-9 rounded-md bg-transparent p-0 text-white hover:bg-white/15 hover:text-white";

export function AppSidebar() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useThemeContext();
  const { lang, toggleLang, t } = useI18n();
  const { state, toggleSidebar } = useSidebar();

  const isCollapsed = state === "collapsed";
  // Every strand route belongs to Home, which is where strands are chosen.
  const activePath = pathname.startsWith("/strands") ? "/" : pathname;
  const collapseLabel = t(isCollapsed ? "sidebar.expand" : "sidebar.collapse");
  const themeLabel = t(theme === "dark" ? "sidebar.toLight" : "sidebar.toDark");

  return (
    <Sidebar className="border-r-0" collapsible="icon" variant="inset">
      <SidebarHeader className="bg-emerald-950 bg-[linear-gradient(160deg,rgba(16,112,78,0.65),transparent_36%)] p-4 text-white">
        <div className="flex min-h-16 items-center gap-3 rounded-lg px-2 group-data-[collapsible=icon]:px-0">
          <BookOpen
            className="shrink-0 group-data-[collapsible=icon]:hidden"
            size={30}
          />

          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <strong className="block text-3xl leading-none">
              {t("app.name")}
            </strong>
            <span className="mt-2 block truncate text-xs text-white/75">
              {t("app.tagline")}
            </span>
          </div>

          {/* The rail is a 4px hit target with no affordance, so this is the real control. */}
          <Button
            className={`${iconButtonClass} hidden md:grid md:place-items-center group-data-[collapsible=icon]:mx-auto`}
            type="button"
            aria-label={collapseLabel}
            aria-expanded={!isCollapsed}
            title={`${collapseLabel} (Ctrl + B)`}
            onClick={toggleSidebar}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-emerald-950 px-2 text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map(({ icon: Icon, labelKey, to }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    className="h-12 rounded-lg text-white hover:bg-white/15 hover:text-white data-active:bg-white/15 data-active:text-white"
                    isActive={activePath === to}
                    render={<NavLink to={to} />}
                    size="lg"
                    tooltip={t(labelKey)}
                  >
                    <Icon size={18} />
                    <span>{t(labelKey)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-emerald-950 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 p-2 text-white group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-900 group-data-[collapsible=icon]:hidden">
            <UserRound size={20} />
          </div>

          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <strong className="block truncate text-sm leading-tight">
              Mwalimu Achieng
            </strong>
            <span className="mt-1 block truncate text-xs text-white/70">
              {t("sidebar.teacherRole")}
            </span>
          </div>

          <Button
            className={`${iconButtonClass} shrink-0 gap-1 text-xs font-extrabold`}
            type="button"
            aria-label={t("sidebar.switchLanguage")}
            title={t("sidebar.switchLanguage")}
            onClick={toggleLang}
          >
            <Languages size={17} />
            <span aria-hidden="true">{lang === "en" ? "SW" : "EN"}</span>
          </Button>

          <Button
            className={`${iconButtonClass} shrink-0`}
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
