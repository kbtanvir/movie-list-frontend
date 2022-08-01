import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import * as yup from "yup";
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
    <div className="flex-col-start gap-7">
      <p
        className="flex flex-row items-center gap-2"
        onClick={() => {
          false
        }}
      >
        <IoIosArrowBack /> Back to login
      </p>

      {state.status !== "loaded" ? (
        <h3 className="text-xl font-light">Enter email to reset password </h3>
      ) : (
        <h3 className="text-xl font-light">
          If an account exists for <span>email</span>, you will get an email
          with instructions on resetting your password. If it doesn&apos;t
          arrive, be sure to check your spam folder.
        </h3>
      )}

      {state.status !== "loaded" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-col-start w-full gap-5 lg:w-[440px]"
        >
          {formFields.map((field, i) => (
            <div key={i} className="w-full">
              <input
                autoComplete="on"
                type={field.type}
                {...register(field.name)}
                className="input w-full"
                placeholder={field.placeholder}
              />
              <ErrorMessageText errors={errors} name={field.name} />
            </div>
          ))}
          <div className="flex items-center justify-start gap-5 sm:flex-row">
            <button
              type="submit"
              className="button button--contrast min-w-fit  font-caveat text-xl  sm:w-full lg:min-w-[200px]"
            >
              {state.status === "loading" ? "Loading..." : "Send reset link"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
