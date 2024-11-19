import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BoardTitleForm from "./board-titleform";
import { Board } from "@prisma/client";
import BoardOptions from "./board-options";

interface BoardNavBarProps {
  id: string;
}

const BoardNavBar = async ({ id }: BoardNavBarProps) => {
  const { orgId } = await auth();
  if (!orgId) redirect("/select-org");
  const boardDetails = await db.board.findUnique({
    where: {
      id,
      orgId: orgId,
    },
  });
  return (
    <div className="w-full fixed h-14 z-[40] bg-black/50 top-14 flex items-center px-6 gap-x-4 text-white">
     <BoardTitleForm data={boardDetails as Board}/>
      <div className="ml-auto">
          <BoardOptions id={boardDetails?.id as string}/>
      </div>
    </div>
  );
};

export default BoardNavBar;
