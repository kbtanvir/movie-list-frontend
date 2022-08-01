import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { AppRoutes } from "../../../../lib/consts/Routes";
import { StateResponse } from "../../models/types/Auth";
import ErrorMessageText from "./ErrorMessageText";

export default function AuthForm({ ...props }: { register?: boolean }) {
  // const { response } = useSelector((state: RootState) => state.global)
  // const dispatch = useDispatch()

  const [state, setState] = useState<StateResponse>({
    status: "loaded",
    message: "",
  });

  const [show, setShow] = useState(false);
  const handlePasswordShowHide = () => setShow(!show);

  // useEffect(() => {
  //   if (response) {
  //     setState(response)
  //   }
  // }, [response])

  const textFields = [
    {
      name: "email",
      label: "Email",
      placeholder: "Type your email",
      fieldType: "email",
      validation: () =>
        yup
          .string()
          .email(`"Doesn't look like an email address" >_<`)
          .required("Required"),
    },
    {
      name: "password",
      label: "Password",
      fieldType: "password",
      placeholder: "Type 8 digit passcode",
      validation: () =>
        yup.string().min(8, "Must be 8 digit long").required("Required"),
    },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      yup.object(
        textFields.reduce(
          (acc, cur) => ({ ...acc, [cur.name]: cur.validation() }),
          {}
        )
      )
    ),
  });

  const onSubmit = (data: any) => {
    if (props.register) {
      return; // dispatch(registerWithEmailPassRequest(data.email, data.password))
    }
    return; // dispatch(signInWithEmailPassRequest(data.email, data.password))
    // console.log(data);
  };

  return (
    <div>
      <h3>{props.register ? "Signup" : "Login"}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {textFields.map(({ name, fieldType, label, placeholder }, i) => (
          <div key={i} className="w-full">
            <input
              autoComplete="on"
              type={fieldType}
              {...register(name)}
              className="input w-full"
              placeholder={placeholder}
            />
            <ErrorMessageText errors={errors} name={name} />
          </div>
        ))}
        <div>
          <button type="submit">
            {state.status === "loading" ? "Loading..." : "Sign in"}
          </button>
          {props.register ? (
            <Link to={AppRoutes.login}>
              <span>Already have an account?</span>
            </Link>
          ) : (
            <Link to={AppRoutes.register}>
              <span>Don't have an Account? Sign up</span>
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
