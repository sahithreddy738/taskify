import { create } from "@/actions/create-board"
import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import Board from "./board";



const OrganizationIdPage = async() => {
 const boards=await db.board.findMany();
  return (
    <div className="flex flex-col gap-y-4">
       <form action={create}>
           <input required placeholder="Enter title" id="title" name="title" className="border-black border p-2 rounded-md mr-2"></input>
           <Button type="submit">
              submit
           </Button>
       </form>
       <div className="space-y-2">
          {
            boards.map((board)=>(
               <Board id={board.id} key={board.id} title={board.title}/>
            ))
          }
       </div>
    </div>
  )
}

export default OrganizationIdPage