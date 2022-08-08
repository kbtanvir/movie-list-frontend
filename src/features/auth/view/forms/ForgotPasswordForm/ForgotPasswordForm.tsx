import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../../lib/atoms/Button/Button";
import CustomInput from "../../../../../lib/atoms/Input/Input";
import { AppRoutes } from "../../../../../lib/consts/appRoutes";
import useHookForm from "../../../../../lib/hooks/useHookForm";
import { ChangePasswordDto } from "../../../data/dto/change-password.dto";
import { passResetFields } from "../../../data/formFields";
import { authService } from "../../../logic/services/auth.service";

export default function FormPasswordPreset() {
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useHookForm({
    formFields: passResetFields,
  });

  const onSubmit = async (dto: ChangePasswordDto) => {
    await authService.updatePassword(dto).then(() => {
      navigate(AppRoutes.passwordReset);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Request new password</h3>
      {passResetFields.map((field, i) => (
        <CustomInput
          key={i}
          register={register}
          errors={errors}
          field={field}
        />
      ))}
      <Button text="Reset password" />
      <div className="bottom-links">
        <Link to={AppRoutes.login}>Back to login</Link>
      </div>
    </form>
  );
}
