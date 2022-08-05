import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../lib/consts/Routes";
import useHookForm, { FormField } from "../../../../lib/hooks/useHookForm";
import { loginForm, registrationForm } from "../../data/formFields";
import { sliceSettings } from "../../logic/slice";
import ErrorMessageText from "./ErrorMessageText";

export default function AuthForm({ ...props }: { register?: boolean }) {
  const { session, isAuthenticated } = useSelector(sliceSettings.state);
  const actions = sliceSettings.actions;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // * HOOK FORM CONFIG
  // -------------------

  const [formFields, setFormFields] = useState<FormField[]>([]);

  const { errors, register, handleSubmit } = useHookForm({
    formFields,
  });

  // * HANDLERS
  // -------------

  const onSubmit = (data: any) => {
    console.log(data);
    navigate(AppRoutes.movies, { replace: true });
  };

  // * EFFECTS
  // -------------

  useEffect(() => {
    setFormFields(props.register ? registrationForm : loginForm);
  }, [props.register]);
  useEffect(() => {
    dispatch(
      actions.setCredentials({
        isAuthenticated: true,
        session: {
          accessToken: "asdfj;asdifj",
          refreshToken: "asdfjosija",
        },
      })
    );
  }, []);

  // * RENDER
  // -------------

  return (
    <div>
      
      <h3>{props.register ? "Signup" : "Login"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field, i) => (
          <div key={i} className="w-full">
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
          <button type="submit">{props.register ? "Signup" : "Login"}</button>

          {props.register ? (
            <Link to={AppRoutes.login}>
              <span>Already have an account?</span>
            </Link>
          ) : (
            <Link to={AppRoutes.register}>
              <span>Don't have an Account?</span>
            </Link>
          )}

          <Link to={AppRoutes.passwordReset}>
            <span>Forgot password?</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
