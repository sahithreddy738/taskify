import { z } from "zod";

export type FieldError<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldError<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const CreateSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput):Promise<ActionState<TInput,TOutput>> => {
    const validatedResult = schema.safeParse(data);
    if (!validatedResult.success) {
      return {
        fieldErrors: validatedResult.error.flatten()
          .fieldErrors as FieldError<TInput>,
      };
    }
    return handler(validatedResult.data);
  };
};
