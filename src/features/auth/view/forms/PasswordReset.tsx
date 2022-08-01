import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { AppRoutes } from "../../../../lib/consts/Routes";
import { StateResponse } from "../../models/types/Auth";
import ErrorMessageText from "./ErrorMessageText";

export default function FormPasswordPreset() {
  // const { response } = useSelector((state: RootState) => state.global)
  // const dispatch = useDispatch()

  // const router = useRouter();

  const [state, setState] = useState<StateResponse>({
    status: "loaded",
    message: "",
  });

  const [email, setemail] = useState<String>("");

  const [show, setShow] = useState(false);
  const handlePasswordShowHide = () => setShow(!show);

  // useEffect(() => {
  //   if (response) {
  //     setState(response)
  //   }
  // }, [response])

  const formFields = [
    {
      name: "email",
      label: "Email",
      placeholder: "Type your email",
      type: "email",
      validation: () =>
        yup
          .string()
          .email(`"Doesn't look like an email address" >_<`)
          .required("Required"),
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
        formFields.reduce(
          (acc, cur) => ({ ...acc, [cur.name]: cur.validation() }),
          {}
        )
      )
    ),
  });

  const onSubmit = (data: any) => {
    //    dispatch(signInWithEmailPassRequest(data.email, data.password))
    console.log(data);
    setState({ ...state, status: "loaded" });
    setemail(data.email);
  };

  return (
    <div>
      <Link to={AppRoutes.login}>
        <span onClick={() => {}}>
          <IoIosArrowBack /> Back to login
        </span>
      </Link>

      {state.status !== "loaded" ? (
        <h3>Enter email to reset password </h3>
      ) : (
        <h3>
          If an account exists for <span>email</span>, you will get an email
          with instructions on resetting your password. If it doesn&apos;t
          arrive, be sure to check your spam folder.
        </h3>
      )}

      {state.status !== "loaded" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map((field, i) => (
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
            <button type="submit">
              {state.status === "loading" ? "Loading..." : "Send reset link"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
