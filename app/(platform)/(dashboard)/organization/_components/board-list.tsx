import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg">
        <User2 className="h-6 w-6 mr-2" />
        <p>Your boards</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover side="right" sideOffset={10}>
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition rounded-md"
        >
          <p className="text-sm">Create new board</p>
          <span className="text-xs">5 remaining</span>
          <Hint
            description="Free Workspaces can have up to 5 open boards.For unlimited boards upgrade this workspace"
            sideOffset={45}
          >
            <HelpCircle className="absolute bottom-2 right-2 w-4 h-4"></HelpCircle>
          </Hint>
        </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
