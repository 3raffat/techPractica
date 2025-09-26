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
export const ResetSchema = yup
  .object({
    userEmail: yup
      .string()
      .required("Email is required")
      .max(320, "Must be 320 characters or less")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
  })
  .required();

export const ResetPassSchema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 charachters.")
      .max(100, "Must be 100 characters or less"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();
export const sessionSchema = yup.object({
  nameSession: yup
    .string()
    .required("Session name is required")
    .min(8, "Minimum 8 characters")
    .max(30, "Maximum 30 characters"),

  descriptionSession: yup
    .string()
    .required("Description is required")
    .min(100, "Minimum 100 characters")
    .max(1000, "Maximum 1000 characters"),

  system: yup.string().required("Select a category"),

  categories: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one field")
    .required("Fields are required"),

  technologies: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one technology")
    .required("Technologies are required"),
});
export const ApplySchema = yup.object({
  brief: yup
    .string()
    .required("brief is required")
    .min(500, "Minimum 500 characters")
    .max(1000, "Maximum 1000 characters"),

  categoryName: yup.string().required("Select a category"),
});
