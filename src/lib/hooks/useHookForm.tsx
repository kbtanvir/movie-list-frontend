import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, UseFormReturn, ValidationMode } from "react-hook-form";
import * as yup from "yup";

export interface FormField<DTO> {
  name: keyof DTO;
  label?: string;
  placeholder: string;
  type: "email" | "password" | "text" | string;
  validation: () => yup.SchemaOf<any>;
  width?: "full" | "half" | "third";
  className?: string;
}

export default function useHookForm({
  ...props
}: {
  formFields: FormField<any>[];
  mode?: keyof ValidationMode | undefined;
}): UseFormReturn<any> {
  return useForm({
    mode: props.mode ?? "onSubmit",
    resolver: yupResolver(
      yup.object(
        props.formFields.reduce(
          (acc, cur) => ({ ...acc, [cur.name]: cur.validation() }),
          {}
        )
      )
    ),
    
  });
}
