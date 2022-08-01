import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import * as yup from "yup";
import { StateResponse } from "../../../models/types/Auth";
import ErrorMessageText from "./ErrorMessageText";

export default function AuthForm() {
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
    //    dispatch(signInWithEmailPassRequest(data.email, data.password))
    console.log(data);
  };

  return (
    <div className="flex-col-start w-full gap-7">
      <p
        className="flex flex-row items-center gap-2"
        onClick={() =>
          // todo: router.push("/auth/login")
          false
        }
      >
        <IoIosArrowBack /> Go Back
      </p>

      <h3 className="text-xl font-light">Log in with email</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col-start w-full gap-5"
      >
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
        <div className="flex w-full flex-col items-center justify-start gap-5 sm:flex-row">
          <button
            type="submit"
            className="button button--contrast font-caveat text-xl sm:max-w-[200px] "
          >
            {state.status === "loading" ? "Loading..." : "Sign in"}
          </button>
          <p
            onClick={() => {
              // todo: router.push("/auth/login")
              false;
            }}
          >
            Forgot password?
          </p>
        </div>
      </form>
    </div>
  );
}
