"use client";

import { createCard } from "@/actions/create-card";
import FormButton from "@/components/form/form-button";
import FormTextArea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  listId: string;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, enableEditing, disableEditing, listId }, ref) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const params = useParams();
    const { execute,fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} title created`);
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });
    useEventListener("keydown", (e) => {
      if (e.key === "Escape") disableEditing();
    });
    useOnClickOutside(formRef, disableEditing);
    const onTextAreaSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const boardId = params.boardId as string;
      execute({ title, boardId, listId });
    };
    const onTextAreaKeyHandler:KeyboardEventHandler<HTMLTextAreaElement>=(e)=>{
        if(e.key==="Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    }
    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onTextAreaSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormTextArea
            ref={ref}
            id="title"
            placeholder="Enter Card title..."
            errors={fieldErrors}
            onKeyDown={onTextAreaKeyHandler}
          />
          <div className="flex items-center gap-x-1">
            <FormButton>Add Card</FormButton>
            <Button onClick={disableEditing} variant={"ghost"} size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="text-muted-foreground text-sm h-auto px-2 py-1.5 w-full justify-start"
          variant={"ghost"}
          size={"sm"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>
    );
  }
);

export default CardForm;
