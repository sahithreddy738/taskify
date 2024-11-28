"use client";

import { updateCard } from "@/actions/update-card";
import FormButton from "@/components/form/form-button";
import FormTextArea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardsWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardDescriptionProps {
  data: CardsWithList;
}

const CardDescription = ({ data }: CardDescriptionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const params = useParams();
  const queryClient = useQueryClient();
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success(`${data.title} Description Updated`);
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
    disableEditing();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  };
  useEventListener("keydown", onKeyDown);
  useOnClickOutside(textAreaRef, disableEditing);
  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;
    execute({ description, id: data.id, boardId });
    setIsEditing(false);
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5  mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <FormTextArea
              errors={fieldErrors}
              id="description"
              onBlur={onBlur}
              ref={textAreaRef}
              defaultValue={data.description}
              className="w-full mt-2"
            />
            <div className="flex items-center gap-x-2">
              <FormButton>Save</FormButton>
              <Button
                type="button"
                variant={"ghost"}
                size="sm"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description.length > 0
              ? data.description
              : "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

CardDescription.skelton = function DescriptionSkeleton() {
  return (
    <div className="flx items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px]  bg-neutral-200" />
      </div>
    </div>
  );
};

export default CardDescription;
