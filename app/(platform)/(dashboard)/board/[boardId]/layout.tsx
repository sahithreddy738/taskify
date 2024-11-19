import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import BoardNavBar from "./_components/board-navbar";

export async function generateMetaData({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { orgId } = await auth();
  if (!orgId) return { title: "Board" };
  const board = await db.board.findUnique({
    where: { id: (await params).boardId, orgId: orgId },
  });
  return {
    title: startCase(board?.title),
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
}) => {
  const boardId = (await params).boardId;
  const { orgId } = await auth();
  if (!orgId) redirect("/select-org");
  const boardDetails = await db.board.findUnique({
    where: {
      id: boardId,
      orgId: orgId,
    },
  });
  if (!boardDetails) notFound();
  return (
    <div className="h-full bg-no-repeat bg-cover bg-center" style={{backgroundImage:`url(${boardDetails.imageFullUrl})`}}>
      <BoardNavBar id={boardId}/>
      <div className="absolute inset-0 bg-black/10"/>
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
