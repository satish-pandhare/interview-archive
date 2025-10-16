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
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z
  .object({
    content: z.string().optional(),
    contentLink: z.url().optional(),
  })
  .refine((data) => data.content || data.contentLink, {
    message: "Either content or link must be provided",
    path: ["content", "link"],
  });

export const AnswerQuestionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isModalOpen = isOpen && type === "answerQuestion";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      contentLink: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const questionId = data?.questionId;

      if (!questionId) {
        toast.error("Question ID is required to post an answer.");
        return;
      }

      const res = await fetch(`/api/answers/${questionId}`, {
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

      if (res.status === 201) toast.success("answer posted successfully!");
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
          <DialogTitle className="sr-only">Answer the question</DialogTitle>
          <DialogDescription className="text-center">
            Answer the question
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2 px-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Answer Content</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Enter answer content"
                        {...field}
                        className="h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Answer Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter answer link (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button disabled={isLoading}>Answer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
