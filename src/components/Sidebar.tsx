import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, LogOut, UserRound } from "lucide-react";
import { navItems } from "@/data/preparation";
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
} from "@/components/ui/sidebar";

const navTargets = ["/", "/preparations", "/downloaded", "/settings", "/about"];

export function AppSidebar() {
  const { pathname } = useLocation();
  const activeTarget = pathname.startsWith("/strands") ? "/" : pathname;

  return (
    <Sidebar className="border-r-0" collapsible="icon" variant="inset">
      <SidebarHeader className="bg-emerald-950 bg-[linear-gradient(160deg,rgba(16,112,78,0.65),transparent_36%)] p-4 text-white">
        <div className="flex min-h-16 items-center gap-3 rounded-lg px-2">
          <BookOpen className="shrink-0" size={30} />
          <div className="group-data-[collapsible=icon]:hidden">
            <strong className="block text-3xl leading-none">Funza</strong>
            <span className="mt-2 block text-xs text-white/75">
              Mwalimu wa Grade 10
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-emerald-950 px-2 text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map(({ icon: Icon, title }, index) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    className="h-12 rounded-lg text-white hover:bg-white/15 hover:text-white data-active:bg-white/15 data-active:text-white"
                    isActive={activeTarget === navTargets[index]}
                    render={<NavLink to={navTargets[index]} />}
                    size="lg"
                    tooltip={title}
                  >
                    <Icon size={18} />
                    <span>{title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-emerald-950 p-3">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-2 text-white">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-900">
            <UserRound size={20} />
          </div>

          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <strong className="block truncate text-sm leading-tight">
              Mwalimu Achieng
            </strong>
            <span className="mt-1 block truncate text-xs text-white/70">
              Grade 10 Biology
            </span>
          </div>

          <Button
            className="size-9 rounded-md bg-transparent p-0 text-white hover:bg-white/15 hover:text-white group-data-[collapsible=icon]:hidden"
            type="button"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
