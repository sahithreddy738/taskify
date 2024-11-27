import { z } from "zod";

export const UpdateCard = z.object({
  id: z.string(),
  title: z.optional(
    z
      .string({
        invalid_type_error: "Title Required",
        required_error: "Title is required",
      })
      .min(3, {
        message: "Title is too short",
      })
  ),
  description: z.optional(
    z
      .string({
        invalid_type_error: "Provide Description",
        required_error: "Provide Description",
      })
      .min(3, {
        message: "Description is too short",
      })
  ),
  boardId:z.string()
});
