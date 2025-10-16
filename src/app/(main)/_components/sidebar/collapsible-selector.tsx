import { UserAvatar } from "@/components/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Group, Company, Tag, Role } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ReactNode } from "react";

type DataMap = {
  tag: Tag;
  company: Company;
  group: Group;
  role: Role;
};

type DataType = keyof DataMap;

type Data<T extends DataType = DataType> = {
  type: T;
  data: DataMap[T][];
};

interface Props<T extends DataType = DataType> {
  data: Data<T>;
  queryKey: string;
  icon?: ReactNode;
}

export function CollapsibleSelect<T extends DataType>({
  data,
  queryKey,
  icon,
}: Props<T>) {
  const [selectedItemNames, setSelectedItemNames] = useQueryState(
    queryKey,
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const onToggleItem = (item: DataMap[T]) => {
    setSelectedItemNames((prev) => {
      if (prev.includes(item.name)) {
        return prev.filter((name) => name !== item.name);
      } else {
        return [...prev, item.name];
      }
    });
  };

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
                {icon}
                <p className="capitalize text-md">{queryKey}</p>
              </div>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu className="p-2">
                {data.data.map((item) => {
                  const isSelected = selectedItemNames.includes(item.name);
                  return (
                    <SidebarMenuItem
                      key={item.id}
                      className={cn(
                        "cursor-pointer text-sm px-2 py-1 rounded-md",
                        isSelected && "bg-muted font-semibold",
                      )}
                      onClick={() => onToggleItem(item)}
                    >
                      <div className="flex items-center gap-2">
                        {data.type === "group" && "imageUrl" in item ? (
                          <UserAvatar
                            src={item.imageUrl!}
                            className="size-5 md:size-5"
                          />
                        ) : null}
                        {item.name}
                      </div>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </>
  );
}
