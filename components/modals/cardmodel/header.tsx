"use client";

import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form/form-input";
import { DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardsWithList } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface CardHeaderProps {
  data: CardsWithList;
}

const CardHeader = ({ data }: CardHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const inputRef = useRef<ElementRef<"input">>(null);
  const queryClient = new QueryClient();
  const { execute: executeCardUpdate } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success("Card Title Updated");
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const params = useParams();
  const onBlur = () => {
    inputRef?.current?.form?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) return;
    executeCardUpdate({ title, id: data.id, boardId });
  };
  return (
    <DialogTitle className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div>
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700
            bg-transparent border-transparent relative -left-1.5 w-[95%]
            focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground mt-1">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </DialogTitle>
  );
};

CardHeader.skeleton = function HeaderSkeleton() {
  return (
    <DialogTitle className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-4  bg-neutral-200" />
      </div>
    </DialogTitle>
  );
};

export default CardHeader;
