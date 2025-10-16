"use client";
import { useGroups } from "@/hooks/query/use-groups";
import { CollapsibleSelect } from "./collapsible-selector";
import { Building, ChevronRight, Tags, Users, UserSearch } from "lucide-react";
import { useCompanies } from "@/hooks/query/use-companies";
import { useTags } from "@/hooks/query/use-tags";
import { useRoles } from "@/hooks/query/use-roles";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

const GroupsSelect = () => {
  const { data, isLoading, error, isError } = useGroups();

  if (isLoading) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
          >
            <CollapsibleTrigger>
              <div className="flex items-center gap-2">
                <Users className="size-4" />
                <p className="capitalize text-md">Groups</p>
              </div>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
        </SidebarGroup>
      </Collapsible>
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">Error loading groups: {error.message}</p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No groups found.</p>;
  }
  return (
    <CollapsibleSelect
      data={{ type: "group", data }}
      queryKey="groups"
      icon={<Users className="size-4" />}
    />
  );
};

const CompaniesSelect = () => {
  const { data, isLoading, error, isError } = useCompanies();
  if (isLoading) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
          >
            <CollapsibleTrigger>
              <div className="flex items-center gap-2">
                <Building className="size-4" />
                <p className="capitalize text-md">Companies</p>
              </div>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
        </SidebarGroup>
      </Collapsible>
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">
        Error loading companies: {error.message}
      </p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No companies found.</p>;
  }
  return (
    <CollapsibleSelect
      data={{ type: "company", data: data }}
      queryKey="companies"
      icon={<Building className="size-4" />}
    />
  );
};

const TagsSelect = () => {
  const { data, isLoading, error, isError } = useTags();
  if (isLoading) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            asChild
            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
          >
            <CollapsibleTrigger>
              <div className="flex items-center gap-2">
                <Tags className="size-4" />
                <p className="capitalize text-md">Tags</p>
              </div>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
        </SidebarGroup>
      </Collapsible>
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">Error loading tags: {error.message}</p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No tags found.</p>;
  }
  return (
    <CollapsibleSelect
      data={{ type: "tag", data }}
      queryKey="tags"
      icon={<Tags className="size-4" />}
    />
  );
};

const RolesSelect = () => {
  const { data, isLoading, error, isError } = useRoles();

  if (isLoading) {
    return (
      <>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
            >
              <CollapsibleTrigger>
                <div className="flex items-center gap-2">
                  <UserSearch className="size-4" />
                  <p className="capitalize text-md">Roles</p>
                </div>
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
          </SidebarGroup>
        </Collapsible>
      </>
    );
  }
  if (isError) {
    return (
      <p className="text-red-500 px-2">Error loading roles: {error.message}</p>
    );
  }
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground px-2">No roles found.</p>;
  }

  return (
    <CollapsibleSelect
      data={{ type: "role", data }}
      queryKey="roles"
      icon={<UserSearch className="size-4" />}
    />
  );
};

export const QuestionFilters = () => {
  return (
    <>
      <TagsSelect />
      <CompaniesSelect />
      <RolesSelect />
      <GroupsSelect />
    </>
  );
};
