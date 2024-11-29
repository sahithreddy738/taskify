"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?:
    | "ghost"
    | "link"
    | "destructive"
    | "default"
    | "outline"
    | "secondary";
}

const FormButton = ({
  disabled,
  className,
  children,
  variant,
}: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
      <Button
      type="submit"
      size={"sm"}
        disabled={pending || disabled}
        className={cn(className, "")}
        variant={variant}
      >{children}</Button>
  );
};

export default FormButton;
