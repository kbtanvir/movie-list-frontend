import * as yup from "yup";
import { FormField } from "../../../lib/hooks/useHookForm";

 const registrationForm: FormField[] = [
  {
    name: "fname",
    placeholder: "First Name",
    type: "text",
    validation: () => yup.string(),
  },
  {
    name: "lname",
    placeholder: "Last Name",
    type: "text",
    validation: () => yup.string(),
  },

  {
    name: "email",
    placeholder: "Type your email",
    type: "email",
    validation: () =>
      yup
        .string()
        .email(`"Doesn't look like an email address" >_<`)
        .required(`"Email is required" >_<`),
  },
  {
    name: "password",
    type: "password",
    placeholder: "Type 8 digit passcode",
    validation: () =>
      yup.string().min(8, "Must be 8 digit long").required("Required"),
  },
];

 const loginForm: FormField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Type your email",
    type: "email",
    validation: () =>
      yup
        .string()
        .email(`"Doesn't look like an email address" >_<`)
        .required(`"Email is required" >_<`),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Type 8 digit passcode",
    validation: () =>
      yup.string().min(8, "Must be 8 digit long").required("Required"),
  },
];
 const passResetFields: FormField[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Type your email",
    type: "email",
    validation: () =>
      yup
        .string()
        .email(`"Doesn't look like an email address" >_<`)
        .required(`"Email is required" >_<`),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Type 8 digit passcode",
    validation: () =>
      yup.string().min(8, "Must be 8 digit long").required("Required"),
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Type 8 digit passcode",
    validation: () =>
      yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  },
];

export { registrationForm, loginForm, passResetFields };

