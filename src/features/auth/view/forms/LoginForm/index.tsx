import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../../lib/atoms/Button/Button";
import CustomInput from "../../../../../lib/atoms/Input/Input";
import { AppRoutes } from "../../../../../lib/consts/appRoutes";
import useHookForm from "../../../../../lib/hooks/useHookForm";
import { LoginDto } from "../../../data/dto/login.dto";
import { loginFields } from "../../../data/formFields";
import { authService } from "../../../logic/services/auth.service";

export default function LoginForm() {
  const navigate = useNavigate();

  // * HOOK FORM CONFIG
  // -------------------

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useHookForm({
    formFields: loginFields,
  });

  // * HANDLERS
  // -------------

  const onSubmit = async (dto: LoginDto) => {
    await authService.login(dto).then(() => {
      navigate(AppRoutes.movies);
    });
  };

  // * EFFECTS
  // -------------

  // * RENDER
  // -------------

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Login</h3>
      {loginFields.map((field, i) => (
        <CustomInput
          key={i}
          register={register}
          errors={errors}
          field={field}
        />
      ))}

      <Button text="Continue" />

      <div className="bottom-links">
        <Link to={AppRoutes.register}>Don't have an account?</Link>
        <Link to={AppRoutes.requestChangePassword}>Forgot password?</Link>
      </div>
    </form>
  );
}
