import * as yup from "yup";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .required("Username is required")
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be 20 characters or less")
      .matches(
        /^[a-zA-Z0-9_.]+$/,
        "Only letters, numbers, underscores, and dots allowed"
      ),
    email: yup
      .string()
      .required("Email is required")
      .max(320, "Must be 320 characters or less")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 charachters.")
      .max(100, "Must be 100 characters or less")
      .matches(
        passwordRegex,
        "Must have uppercase, lowercase, digit, and special character"
      ),
  })
  .required();
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .max(320, "Must be 320 characters or less")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 charachters.")
      .max(100, "Must be 100 characters or less"),
  })
  .required();
export interface ICreateSessionRequest {
  name: string;
  description: string;
  isPrivate: boolean;
  system: string;
  field: string[];
  technologies: string[];
}
export const SessionSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(30, "Name must be at most 30 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(500, "Description must be at least 500 characters")
    .max(1000, "Description must be at most 1000 characters"),

  isPrivate: yup.boolean().required("isPrivate is required"),
  system: yup
    .string()
    .required("System is required")
    .uuid("System must be a valid UUID"),
  field: yup
    .array()
    .required("Fields are required")
    .of(yup.string().uuid("Field must be a valid UUID"))
    .min(1, "At least one field is required"),
  technologies: yup
    .array()
    .required("Technologies are required")
    .of(yup.string().uuid("Technology must be a valid UUID"))
    .min(1, "At least one technology is required"),
});
