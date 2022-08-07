import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../../../lib/atoms/Input";
import { AppRoutes } from "../../../../../lib/consts/appRoutes";
import useHookForm from "../../../../../lib/hooks/useHookForm";
import { LoginDto } from "../../../data/dto/login.dto";
import { loginFields, registrationFields } from "../../../data/formFields";
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

  const onSubmit = (dto: LoginDto) => {
    (async () => {
      try {
        await authService.login(dto);
        navigate(AppRoutes.movies);
      } catch (error) {
        throw error;
      }
    })();
  };

  // * EFFECTS
  // -------------

  // * RENDER
  // -------------

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>LOGIN</h3>
      {loginFields.map((field, i) => (
        <CustomInput
          key={i}
          register={register}
          errors={errors}
          field={field}
        />
      ))}

      <div>
        <button type="submit">Continue</button>

        <Link to={AppRoutes.register}>
          <span>Don't have an account?</span>
        </Link>

        <Link to={AppRoutes.passwordReset}>
          <span>Forgot password?</span>
        </Link>
      </div>
    </form>
  );
}
