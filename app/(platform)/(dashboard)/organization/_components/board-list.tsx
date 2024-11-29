import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { MAX_FREE_BOARDS } from "@/utils/constants";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const BoardList = async () => {
  const { orgId } = await auth();
  if (!orgId) redirect("/select-org");
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg">
        <User2 className="h-6 w-6 mr-2" />
        <p>Your boards</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="rounded-sm relative aspect-video group"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
            <p className="font-medium text-white relative p-3">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition rounded-md"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">
              {isPro
                ? "unlimited"
                : `${MAX_FREE_BOARDS - availableCount} remaining`}
            </span>
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

BoardList.Skelton = function BoardListSkelton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
      <div className="w-full h-full aspect-video bg-muted"></div>
    </div>
  );
};
