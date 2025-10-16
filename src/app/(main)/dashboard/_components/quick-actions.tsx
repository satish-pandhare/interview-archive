"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Plus, Users } from "lucide-react";

export function QuickActions() {
  const { onOpen } = useModal();
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Get started fast</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">
          Post a question, share an answer, or create a group to collaborate.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => onOpen("postQuestion")}>
            <Plus className="mr-2 h-4 w-4" /> New question
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onOpen("createGroup")}
          >
            <Users className="mr-2 h-4 w-4" /> New group
          </Button>
        </div>
      </CardContent>

      {/* subtle glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
    </Card>
  );
}
