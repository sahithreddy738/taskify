"use client";
import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute } = useAction(deleteBoard,{
    onError:(error) =>{
        toast.error(error);
    }
  });
  const handleSubmit = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"transparent"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-3"
        side="bottom"
        sideOffset={10}
        align="center"
      >
        <div className="text-sm font-medium text-center text-neutral-600 ">
          Board actions
        </div>
        <PopoverClose>
          <Button className="absolute top-0.5 right-2" variant={"ghost"}>
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form
          action={handleSubmit}
          className="flex items-center text-center justify-center cursor-pointer"
        >
          <Button variant={"ghost"} size={"sm"} className="font-medium">
            Delete Board
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
