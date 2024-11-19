"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import FormInput from "./form-input";
import FormButton from "./form-button";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board/index";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "top" | "left" | "bottom" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

const FormPopover = ({
  children,
  align,
  side,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created");
      ref.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="relative w-80 pt-3"
      >
        <div className=" text-sm font-medium text-center mt-4">
          <p className="pb-4">Create Board</p>
          <form action={handleSubmit} className="flex flex-col gap-y-3">
            <div className="space-y-4 text-start">
              <FormPicker id="image" errors={fieldErrors} />
              <FormInput
                id="title"
                label="Board Title"
                type="text"
                errors={fieldErrors}
              ></FormInput>
            </div>
            <FormButton className="w-full">Submit</FormButton>
          </form>
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 top-2 right-2 absolute"
            variant={"ghost"}
            ref={ref}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
