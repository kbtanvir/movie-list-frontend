import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import ErrorMessageText from "../../../features/auth/view/ErrorMessageText";
import { FormField } from "../../hooks/useHookForm";

export default function CustomInput({
  register,
  errors,
  field,
}: {
  register: UseFormRegister<any>;
  errors: FieldErrorsImpl;
  field: FormField<any>;
}): JSX.Element {
  return (
    <div className="w-full">
      <input
        autoComplete="on"
        type={field.type}
        {...register(field.name.toString())}
        placeholder={field.placeholder}
      />
      <ErrorMessageText errors={errors} name={field.name} />
    </div>
  );
}
