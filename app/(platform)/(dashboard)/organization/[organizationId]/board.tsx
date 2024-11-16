import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

const Board = ({ id, title }: { id: string; title: string }) => {
  const deleteBoardWithId=deleteBoard.bind(null,id);
  return (
    <form action={deleteBoardWithId} className="flex gap-2">
      <div className="flex gap-2">
        <p>{id}</p>
        <p>{title}</p>
      </div>
      <Button
        variant={"destructive"}
      >
       Delete 
      </Button>
    </form>
  );
};

export default Board;
