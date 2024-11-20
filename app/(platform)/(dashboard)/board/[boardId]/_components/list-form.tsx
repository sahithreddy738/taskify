"use client";

import { Plus, X } from "lucide-react";
import ListWrapper from "./list-wrapper";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState } from "react";
import FormInput from "@/components/form/form-input";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

const ListForm = () => {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
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
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  });
  useOnClickOutside(formRef, disableEditing);
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    execute({ title, boardId });
    disableEditing();
  };
  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full bg-white space-y-4 rounded-md p-3"
        >
          <FormInput
            id="title"
            ref={inputRef}
            placeholder="Enter list title"
            errors={fieldErrors}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent focus:border-input transition hover:border-input"
          ></FormInput>
          <div className="flex items-center gap-4">
            <Button variant={"primary"} type="submit">
              Add List
            </Button>
            <X className="w-4 h-4" onClick={disableEditing} />
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="bg-white/80 hover:bg-white/50 w-full rounded-md transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add List
      </button>
    </ListWrapper>
  );
};

export default ListForm;
