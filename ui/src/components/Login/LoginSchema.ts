import * as yup from "yup";

export type LoginForm = {
  username: string;
  password: string;
};

export const LoginSchema = yup.object({
  username: yup.string().required("Obligatoire"),
  password: yup.string().required("Obligatoire"),
});
