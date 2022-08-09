import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../../lib/atoms/Button/Button";
import CustomInput from "../../../../../lib/atoms/Input/Input";
import { AppRoutes } from "../../../../../lib/consts/appRoutes";
import useHookForm from "../../../../../lib/hooks/useHookForm";
import { ReqChangePasswordDTO } from "../../../data/dto/change-password.dto";
import { requestChangePassFields } from "../../../data/formFields";
import { authService } from "../../../logic/services/auth.service";

export default function RequestChangePassForm() {
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useHookForm({
    formFields: requestChangePassFields,
  });

  const onSubmit = async (dto: ReqChangePasswordDTO) => {
    await authService.requestChangePass(dto).then(res => {
      navigate(AppRoutes.passwordReset, {
        state: {
          token: res.token,
        },
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Send password reset link</h3>
      {requestChangePassFields.map((field, i) => (
        <CustomInput
          key={i}
          register={register}
          errors={errors}
          field={field}
        />
      ))}
      <Button text="Submit" />
      <div className="bottom-links">
        <Link to={AppRoutes.login}>Back to login</Link>
      </div>
    </form>
  );
}
