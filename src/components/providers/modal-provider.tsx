"use client";

import { useEffect, useState } from "react";
import { PostQuestionModal } from "@/components/modals/post-question-modal";
import { CreateCompanyModal } from "@/components/modals/create-company-modal";
import { CreateTagModal } from "@/components/modals/create-tag-modal";
import { AnswerQuestionModal } from "@/components/modals/answer-question-modal";
import { CreateGroupModal } from "@/components/modals/create-group-modal";
import { JoinGroupModal } from "@/components/modals/join-group-modal";
import { CreateRoleModal } from "@/components/modals/create-role-modal";
import { EditQuestionModal } from "@/components/modals/edit-question-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PostQuestionModal />
      <EditQuestionModal />
      <CreateCompanyModal />
      <CreateTagModal />
      <AnswerQuestionModal />
      <CreateGroupModal />
      <JoinGroupModal />
      <CreateRoleModal />
    </>
  );
}
