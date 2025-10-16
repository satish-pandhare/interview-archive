"use client";

import { useModal } from "@/hooks/use-modal-store";
import { PlusCircle } from "lucide-react";

export const AnswerQuestionButton = ({
  questionId,
}: {
  questionId: string;
}) => {
  const { onOpen } = useModal();
  return (
    <PlusCircle onClick={() => onOpen("answerQuestion", { questionId })} />
  );
};
