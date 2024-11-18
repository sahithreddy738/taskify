import { XCircle } from "lucide-react";

interface FormErrorsProps {
  errors?: Record<string, string[] | undefined>;
  id: string;
}

const FormErrors = ({ errors, id }: FormErrorsProps) => {
  if (!errors) return null;

  return (
    <div className="mt-2">
      {errors?.[id]?.map((error: string) => (
        <div
          className="flex items-center bg-rose-500/10  rounded-sm font-medium border border-rose-500"
          key={error}
        >
          <XCircle className="w-4 h-4 mr-2"/>
          {error}
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
