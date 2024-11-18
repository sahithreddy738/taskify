import { ActionState, FieldError } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";

type action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UserActionProps<TOutput> {
  onError?: (error: string) => void;
  onSuccess?: (data: TOutput) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: action<TInput, TOutput>,
  options?: UserActionProps<TOutput>
) => {
  const [fieldErrors, setFieldErrors] = useState<
    undefined | FieldError<TInput>
  >(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [data, setData] = useState<undefined | TOutput>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) return;
        if (result.error) {
          setError(result.error);
          options?.onError?.(result.error);
        }

        setFieldErrors(result.fieldErrors);

        if (result.data) {
          setData(result.data);
          options?.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [action, options]
  );
  return {
    fieldErrors,
    error,
    data,
    isLoading,
    execute,
  };
};
