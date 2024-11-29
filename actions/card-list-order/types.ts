import { z } from "zod";
import { CardListOrder } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Card} from "@prisma/client";





export type InputType= z.infer<typeof CardListOrder>;
export type ReturnType= ActionState<InputType,Card[]>;

