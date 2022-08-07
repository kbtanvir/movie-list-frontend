import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../lib/consts/appRoutes";
import useHookForm, { FormField } from "../../../../lib/hooks/useHookForm";
import { loginForm, registrationForm } from "../../data/formFields";
import { AuthService } from "../../logic/services/auth.service";
import { sliceStore } from "../../logic/slice";
import ErrorMessageText from "./ErrorMessageText";

export default function AuthForm({ ...props }: { register?: boolean }) {
  const actions = sliceStore.actions;
  const { user, session } = useSelector(sliceStore.state);
  const dispatch = useDispatch();
  const auth = new AuthService();

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
  };

  // * EFFECTS
  // -------------

  useEffect(() => {
    setFormFields(props.register ? registrationForm : loginForm);
  }, [props.register]);

  // * RENDER
  // -------------

  function handleLogin() {
    (async () => {
      await auth.login({
        email: "something@gmail.com",
        password: "newpassword",
      });
    })();
  }
  function handleRegister() {
    (async () => {
      await auth.register({
        email: "something@gmail.com",
        password: "123456",
      });
    })();
  }
  function handleTest() {
    (async () => {
      await auth.testAuth({
        test: "working",
      });
    })();
  }
  function handleRefreshToken() {
    (async () => {
      await auth.refreshToken({
        refreshToken: session!.refreshToken,
      });
    })();
  }
  function handleLogout() {
    (async () => {
      await auth.logout({
        refreshToken: session!.refreshToken,
      });
    })();
  }
  function updatePassword() {
    (async () => {
      await auth.updatePassword({
        uid: user!.id,
        oldPassword: "newpassword",
        newPassword: "newpassword",
        confirmNewPassword: "newpassword",
      });
    })();
  }

  return (
    <div>
      {/* TODO: remove buttons */}
      <div>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRefreshToken}>RefreshToken</button>
        <button onClick={handleTest}>Test Private</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={updatePassword}>updatePassword</button>
      </div>
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
