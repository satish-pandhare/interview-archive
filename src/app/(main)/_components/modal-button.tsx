"use client";
import { Button } from "@/components/ui/button";
import { ModalType, useModal } from "@/hooks/use-modal-store";

export function ModalButton({
  children,
  action,
}: {
  children?: React.ReactNode;
  action: ModalType;
}) {
  const { onOpen } = useModal();
  return <Button onClick={() => onOpen(action)}>{children}</Button>;
}
