"use client";

import { copyList } from "@/actions/copy-list";
import { CopyList } from "@/actions/copy-list/schema";
import { deleteList } from "@/actions/delete-list";
import FormButton from "@/components/form/form-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const buttonRef = useRef<ElementRef<"button">>(null);
  const { execute } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`Deleted ${data.title} List`);
      buttonRef.current?.click();
    },
  });
  const options=useAction(copyList,{
    onSuccess:(data)=>{
        toast.success(`${data.title} - Created`);
        buttonRef.current?.click();
    }
  })
  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    execute({ id, boardId });
  };
  const onCopy=(formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    options.execute({id,boardId});
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="h-auto w-auto p-2">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pt-3 pb-3">
        <div className="pb-4 mt-1 font-medium text-sm text-center">
          List Actions
        </div>
        <PopoverClose
          ref={buttonRef}
          className="absolute top-2.5 right-2 h-auto w-auto p-2"
        >
     
            <X className="h-4 w-4" />
     
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="w-full p-2 px-4 justify-start font-medium text-sm"
        >
          Add Card ...
        </Button>
        <Separator />
        <form action={onCopy}>
          <input hidden id="id" name="id" defaultValue={data.id}></input>
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          ></input>
          <FormButton
            variant={"ghost"}
            className="w-full p-2 px-4 justify-start font-medium text-sm"
          >
            Copy List...
          </FormButton>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id="id" name="id" defaultValue={data.id}></input>
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          ></input>
          <FormButton
            variant={"ghost"}
            className="w-full p-2 px-4 justify-start font-medium text-sm"
          >
            Delete List...
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
