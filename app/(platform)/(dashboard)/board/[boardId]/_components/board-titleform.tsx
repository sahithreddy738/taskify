"use client";
import { updateBoard } from "@/actions/update-board";
import FormInput from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<Board | null>(data);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`board title updated to ${data.title}`);
      setBoardData(data);
      disableEditing();
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data?.id });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
    disableEditing();
  };

  if (isEditing) {
    return (
      <form action={handleSubmit} ref={formRef} className="flex items-center">
        <FormInput
          className="bg-transparent font-bold text-lg  px-2 py-1 focus-visible:border-none border-none focus-visible:ring-0"
          id="title"
          ref={inputRef}
          defaultValue={boardData?.title}
          onBlur={onBlur}
        />
      </form>
    );
  }
  return (
    <Button
      className="font-bold text-lg h-auto w-auto py-1 px-2"
      variant={"transparent"}
      onClick={enableEditing}
    >
      {boardData?.title}
    </Button>
  );
};

export default BoardTitleForm;
