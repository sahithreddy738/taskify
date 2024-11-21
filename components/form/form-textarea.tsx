"use client";

import { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
  id: string;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  onBlur?: () => void;
  className?: string;
  onClick?: () => void;
  errors?: Record<string, string[] | undefined>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      onKeyDown,
      onBlur,
      className,
      onClick,
      errors,
      label,
      placeholder,
      required,
      disabled,
    },
    ref
  ) => {
    const {pending}=useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            ></Label>
          ) : null}
          <Textarea
            id={id}
            name={id}
            disabled={pending||disabled}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            onKeyDown={onKeyDown}
            className={cn(className,"focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm")}
            placeholder={placeholder}
            required={required}
          />
        </div>
             <FormErrors id={id} errors={errors}/>
      </div>
    );
  }
);

export default FormTextArea;
