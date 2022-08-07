import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import CustomInput from "../../../../../lib/atoms/Input";
import { AppRoutes } from "../../../../../lib/consts/appRoutes";
import useHookForm from "../../../../../lib/hooks/useHookForm";
import { NetworkResponse } from "../../../../../lib/types/Network";
import { ChangePasswordDto } from "../../../data/dto/change-password.dto";
import { passResetFields } from "../../../data/formFields";

export default function FormPasswordPreset() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useHookForm({
    formFields: passResetFields,
  });

  const response: NetworkResponse = {
    status: "initial",
  };

  const onSubmit = (data: ChangePasswordDto) => {
    console.log(data);
  };

  return (
    <div>
      <Link to={AppRoutes.login}>
        <span onClick={() => {}}>
          <IoIosArrowBack /> Back to login
        </span>
      </Link>

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
        <div>
          <button type="submit">Reset password</button>
        </div>
      </form>
    </div>
  );
}
