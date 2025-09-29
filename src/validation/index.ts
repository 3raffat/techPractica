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

export const createSessionSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  isPrivate: yup.boolean().required("isPrivate is required"),
  system: yup
    .string()
    .uuid("System must be a valid UUID")
    .required("System is required"),
  requirements: yup
    .array()
    .of(
      yup.object({
        field: yup
          .string()
          .uuid("Field must be a valid UUID")
          .required("Field is required"),
        technologies: yup
          .array()
          .of(yup.string().uuid("Technology must be a valid UUID").required())
          .min(1, "At least one technology is required")
          .required("Technologies are required"),
      })
    )
    .min(1, "At least one requirement is required")
    .required("Requirements are required"),
});
