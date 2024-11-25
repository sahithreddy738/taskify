"use client";

import { updateList } from "@/actions/update-list";
import FormInput from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import ListOptions from "./list-options";

interface ListHeadProps {
  data: List;
  onAddCard:()=>void;
}

const ListHeader = ({ data,onAddCard }: ListHeadProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
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
    const updatedTitle = formData.get("title") as string;
    const listId = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    if(title===updatedTitle) disableEditing();
    else execute({ title: updatedTitle, id: listId, boardId });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
    disableEditing();
  };

  return (
    <div className="pt-2 px-2 text-sm flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" defaultValue={data.id}></input>
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          ></input>
          <FormInput
            id="title"
            errors={fieldErrors}
            defaultValue={title}
            onBlur={onBlur}
            ref={inputRef}
            className="h-7 py-1 text-sm px-[7px] font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          ></FormInput>
          <button hidden type="submit"></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard}/>
    </div>
  );
};

export default ListHeader;
