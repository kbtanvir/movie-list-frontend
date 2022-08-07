import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../../../lib/atoms/Input";
import { AppRoutes } from "../../../../../lib/consts/appRoutes";
import useHookForm from "../../../../../lib/hooks/useHookForm";
import { RegisterDto } from "../../../data/dto/register.dto";
import { registrationFields } from "../../../data/formFields";
import { authService } from "../../../logic/services/auth.service";

export default function RegistrationForm() {
  const navigate = useNavigate();

  // * HOOK FORM CONFIG
  // -------------------

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useHookForm({
    formFields: registrationFields,
  });

  // * HANDLERS
  // -------------

  const onSubmit = (dto: RegisterDto) => {
    (async () => {
      try {
        await authService.register(dto);
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
      <h3>Signup</h3>
      {registrationFields.map((field, i) => (
        <CustomInput
          key={i}
          register={register}
          errors={errors}
          field={field}
        />
      ))}
      <div>
        <button type="submit">Continue</button>

        <Link to={AppRoutes.login}>
          <span>Already have an account?</span>
        </Link>

        <Link to={AppRoutes.passwordReset}>
          <span>Forgot password?</span>
        </Link>
      </div>
    </form>
  );
}
