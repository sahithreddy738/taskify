import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ListContainer from "./_components/list-container";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = async ({ params }: BoardPageProps) => {
  const { orgId } = await auth();
  if (!orgId) redirect("/select-org");
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return <div className="h-full p-4 overflow-x-auto">
     <ListContainer boardId={params.boardId} data={lists}/>
  </div>;
};

export default BoardPage;
