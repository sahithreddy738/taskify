"use client";

import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  type?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      defaultValue = "",
      onBlur,
      className,
      errors,
      type,
    },
    ref
  ) => {
    const {pending}=useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? <Label htmlFor={id}> {label} </Label> : null}
          <Input
            required={required}
            name={id}
            id={id}
            className={cn("px-2 py-1 h-7 text-sm", className)}
            type={type}
            onBlur={onBlur}
            disabled={pending ||disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            aria-describedby={`${id}-error`}
            ref={ref}
          />
        </div>
        <FormErrors id={id} errors={errors}/>
      </div>
    );
  }
);

FormInput.displayName="FormInput";

export default FormInput;
