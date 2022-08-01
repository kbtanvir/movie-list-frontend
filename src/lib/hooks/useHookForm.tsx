import { yupResolver } from "@hookform/resolvers/yup";
import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  ValidationMode,
} from "react-hook-form";
import * as yup from "yup";

export interface FormField {
  name: string;
  label?: string;
  placeholder: string;
  type: "email" | "password" | "text";
  validation: () => yup.SchemaOf<any>;
  width?: "full" | "half" | "third";
}

export default function useHookForm({
  ...props
}: {
  formFields: FormField[];
  mode?: keyof ValidationMode | undefined;
}): {
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
} {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
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

  return { register, errors, handleSubmit };
}
