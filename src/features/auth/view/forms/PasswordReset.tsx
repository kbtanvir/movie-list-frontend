import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../../lib/consts/appRoutes";
import useHookForm from "../../../../lib/hooks/useHookForm";
import { NetworkResponse } from "../../../../lib/types/Network";
import { passResetFields } from "../../data/formFields";
import ErrorMessageText from "./ErrorMessageText";

export default function FormPasswordPreset() {
  const { errors, register, handleSubmit } = useHookForm({
    formFields: passResetFields,
  });

  const response: NetworkResponse = {
    status: "initial",
  };

  const onSubmit = (data: any) => {
    //    dispatch(signInWithEmailPassRequest(data.email, data.password))
    console.log(data);
  };

  if (response.status === "success") {
    return (
      <div>
        <Link to={AppRoutes.login}>
          <span onClick={() => {}}>
            <IoIosArrowBack /> Back to login
          </span>
        </Link>

        <p>
          If an account exists for <span>email</span>, you will get an email
          with instructions on resetting your password. If it doesn&apos;t
          arrive, be sure to check your spam folder.
        </p>
      </div>
    );
  }

  if (response.status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={AppRoutes.login}>
        <span onClick={() => {}}>
          <IoIosArrowBack /> Back to login
        </span>
      </Link>

      <h3>Enter email to reset password </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        {passResetFields.map((field, i) => (
          <div key={i}>
            <input
              autoComplete="on"
              type={field.type}
              {...register(field.name)}
              placeholder={field.placeholder}
            />
            <ErrorMessageText errors={errors} name={field.name} />
          </div>
        ))}
        <div>
          <button type="submit">Reset password</button>
        </div>
      </form>
    </div>
  );
}
