import {
  BadgeQuestionMark,
  CircleQuestionMark,
  Home,
  BarChart3,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./sidebar/nav-user";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { AppCommands } from "@/components/app-commands";
import { QuestionFilters } from "./sidebar/selectors";
import type { Route } from "next";
import { ReactNode } from "react";

const items: { title: string; url: Route; icon: ReactNode }[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <BarChart3 />,
  },
  {
    title: "Questions",
    url: "/questions",
    icon: <CircleQuestionMark />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="scrollbar-hide">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BadgeQuestionMark className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">InterviewArchive</span>
                  <span className="truncate text-xs">
                    Share questions with ease.
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <QuestionFilters />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <AppCommands />
        <div className="flex justify-end gap-2 items-center border p-2 rounded-md">
          <NavUser />
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
