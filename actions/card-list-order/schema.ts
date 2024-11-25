import { z } from "zod";



export const CardListOrder=z.object({
    cards:z.array(
        z.object( {
            id:z.string(),
            title:z.string(),
            order:z.number(),
            listId:z.string()
        }
        )
    ),
    boardId:z.string(),
    listId:z.string()
})