import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../../lib/atoms/Button/Button";
import CustomInput from "../../../../../lib/atoms/Input/Input";
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

  const onSubmit = async (dto: RegisterDto) => {
    authService.register(dto).then(() => {
      navigate(AppRoutes.movies);
    });
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
      <Button text="Continue" />
      <div className="bottom-links">
        <Link to={AppRoutes.login}>Already have an account?</Link>
        <Link to={AppRoutes.requestChangePassword}>Forgot password?</Link>
      </div>
    </form>
  );
}
