"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectorDropdown } from "@/components/ui/selector-dropdown";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useTags } from "@/hooks/query/use-tags";
import { useCompanies } from "@/hooks/query/use-companies";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGroups } from "@/hooks/query/use-groups";
import { UserAvatar } from "../avatar";
import { Check } from "lucide-react";
import { useRoles } from "@/hooks/query/use-roles";

const formSchema = z
  .object({
    title: z.string(),
    content: z.string().optional(),
    link: z.url().optional(),
    tags: z.array(z.string()).optional(),
    roleId: z.string().optional(),
    companyId: z.string().optional(),
    groupId: z.string().optional(),
  })
  .refine((data) => data.content || data.link, {
    message: "Either content or link must be provided",
    path: ["content", "link"],
  });

export const PostQuestionModal = () => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isModalOpen = isOpen && type === "postQuestion";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      link: undefined,
      tags: [],
      companyId: undefined,
      groupId: undefined,
      roleId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { data: allTags, isLoading: loadingTags, error: tagsError } = useTags();
  const {
    data: allRoles,
    isLoading: loadingRoles,
    error: rolesError,
  } = useRoles();
  const {
    data: allCompanies,
    isLoading: loadingCompanies,
    error: companiesError,
  } = useCompanies();
  const {
    data: allGroups,
    isLoading: loadingGroups,
    error: groupsError,
  } = useGroups();

  const selectedTags = form.watch("tags");
  const selectedCompany = form.watch("companyId");
  const selectedGroup = form.watch("groupId");
  const selectedRole = form.watch("roleId");

  const toggleTag = (tagId: string) => {
    const current = form.getValues("tags") || [];
    if (current.includes(tagId)) {
      form.setValue(
        "tags",
        current.filter((id) => id !== tagId)
      );
    } else {
      form.setValue("tags", [...current, tagId]);
    }
  };

  const setId = (field: "companyId" | "groupId" | "roleId", id: string) => {
    form.setValue(field, id);
  };

  const clearId = (value: "companyId" | "groupId" | "roleId") => {
    form.setValue(value, undefined);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });

      if (res.status === 201) toast.success("Question posted successfully!");
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error("[PostQuestion] Error posting question:", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="sr-only">Post a Question</DialogTitle>
          <DialogDescription className="text-center">
            Share your question with the community help others.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Question title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Question</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Enter question content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Question Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter question link (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tag Selector */}
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Tags</FormLabel>
                    <SelectorDropdown
                      options={allTags}
                      isLoading={loadingTags}
                      error={tagsError}
                      selectedValues={selectedTags}
                      isMultiSelect={true}
                      placeholder="Select tags"
                      searchPlaceholder="Search tags..."
                      emptyMessage="No tags available."
                      getDisplayText={(selectedValues) => {
                        if (
                          !selectedValues ||
                          (Array.isArray(selectedValues) &&
                            selectedValues.length === 0)
                        ) {
                          return "Select tags";
                        }
                        return `${
                          Array.isArray(selectedValues)
                            ? selectedValues.length
                            : 1
                        } tag(s) selected`;
                      }}
                      onSelect={toggleTag}
                      onCreateNew={() => onOpen("createTag")}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Selector - Single Selection */}
              <FormField
                control={form.control}
                name="companyId"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Company</FormLabel>
                    <SelectorDropdown
                      options={allCompanies}
                      isLoading={loadingCompanies}
                      error={companiesError}
                      selectedValues={selectedCompany}
                      isMultiSelect={false}
                      placeholder="Select a company"
                      searchPlaceholder="Search companies..."
                      emptyMessage="No companies available."
                      getDisplayText={(selectedValues, options) => {
                        if (!selectedValues) return "Select a company";
                        return (
                          options?.find(
                            (company) => company.id === selectedValues
                          )?.name || "Select a company"
                        );
                      }}
                      onSelect={(id) => setId("companyId", id)}
                      onClear={() => clearId("companyId")}
                      onCreateNew={() => onOpen("createCompany")}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Selector - Single Selection */}
              <FormField
                control={form.control}
                name="roleId"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Role</FormLabel>
                    <SelectorDropdown
                      options={allRoles}
                      isLoading={loadingRoles}
                      error={rolesError}
                      selectedValues={selectedRole}
                      isMultiSelect={false}
                      placeholder="Select a role"
                      searchPlaceholder="Search roles..."
                      emptyMessage="No roles available."
                      getDisplayText={(selectedValues, options) => {
                        if (!selectedValues) return "Select a role";
                        return (
                          options?.find((role) => role.id === selectedValues)
                            ?.name || "Select a role"
                        );
                      }}
                      onSelect={(id) => setId("roleId", id)}
                      onClear={() => clearId("roleId")}
                      onCreateNew={() => onOpen("createRole")}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Group Selector - Single Selection */}
              <FormField
                control={form.control}
                name="groupId"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Group</FormLabel>
                    <SelectorDropdown
                      options={allGroups}
                      isLoading={loadingGroups}
                      error={groupsError}
                      selectedValues={selectedGroup}
                      isMultiSelect={false}
                      placeholder="Select a group"
                      searchPlaceholder="Search groups..."
                      emptyMessage="No groups available."
                      getDisplayText={(selectedValues, options) => {
                        if (!selectedValues) return "Select a group";
                        return (
                          options?.find((group) => group.id === selectedValues)
                            ?.name || "Select a group"
                        );
                      }}
                      onSelect={(id) => setId("groupId", id)}
                      onClear={() => clearId("groupId")}
                      onCreateNew={() => onOpen("createGroup")}
                      renderOption={(group, isSelected) => (
                        <>
                          <div className="px-4 flex items-center gap-2">
                            <UserAvatar
                              src={group.imageUrl!}
                              className="size-4 md:size-4"
                            />
                            {group.name}
                          </div>
                          {isSelected && (
                            <Check className="ml-auto h-4 w-4 text-primary" />
                          )}
                        </>
                      )}
                      disabled={isLoading}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading}>Post</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
