import * as yup from "yup";
import { FormField } from "../../../lib/hooks/useHookForm";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

export const registrationFields: FormField<RegisterDto>[] = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    validation: () => yup.string().required("First name is required"),
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    validation: () => yup.string().required("Last name is required"),
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
export const loginFields: FormField<LoginDto>[] = [
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
export const passResetFields: FormField<ChangePasswordDto>[] = [
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
    name: "oldPassword",
    label: "Old Password",
    type: "password",
    placeholder: "Type your old password",
    validation: () =>
      yup.string().min(8, "Must be 8 digit long").required("Required"),
  },
  {
    name: "newPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Type 8 digit passcode",
    validation: () =>
      yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  },
  {
    name: "confirmNewPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Type 8 digit passcode",
    validation: () =>
      yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  },
];
