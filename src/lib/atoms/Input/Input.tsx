import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { FormField } from "../../hooks/useHookForm";
import ErrorMessage from "./ErrorMessage";
import styles from "./Input.module.css";

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
    <div className={styles.inputWrap}>
      <input
        className={styles.input}
        autoComplete="on"
        type={field.type}
        {...register(field.name.toString())}
        placeholder={field.placeholder}
      />
      <ErrorMessage errors={errors} name={field.name} />
    </div>
  );
}
