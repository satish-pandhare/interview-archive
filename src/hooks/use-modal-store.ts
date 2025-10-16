import { Company, Question, Tag } from "@/generated/prisma";
import { QuestionsType } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "postQuestion"
  | "editQuestion"
  | "createCompany"
  | "createTag"
  | "answerQuestion"
  | "createGroup"
  | "joinGroup"
  | "createRole";

interface ModalData {
  question?: Question;
  company?: Company;
  tag?: Tag;
  questionId?: string;
  questionComplete?: QuestionsType;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
