import * as yup from "yup";
import { SocialPlatform } from "../interfaces";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const registerSchema = yup.object({
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
    .min(8, "Password should be at least 8 characters.")
    .max(100, "Must be 100 characters or less")
    .matches(
      passwordRegex,
      "Must have uppercase, lowercase, digit, and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

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
      .max(100, "Must be 100 characters or less")
      .matches(
        passwordRegex,
        "Must have uppercase, lowercase, digit, and special character"
      ),
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
    .of(yup.string().uuid())
    .min(1, "At least one field is required"),
  technologies: yup
    .array()
    .required("Technologies are required")
    .of(yup.string().uuid())
    .min(1, "At least one technology is required"),
});

export const userProfileSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "first Name must be at least 3 characters")
    .max(15, "first Name must be at most 15 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(5, "last Name must be at least 5 characters")
    .max(15, "last Name must be at most 15 characters")
    .required("Last Name is required"),
  brief: yup.string().required("Brief is required"),
  skillsIds: yup
    .array()
    .of(yup.string().uuid())
    .min(3, "At least three Skill is required")
    .required("Skills are required"),
  socialAccountRequests: yup
    .array()
    .of(
      yup.object({
        platformName: yup
          .mixed<SocialPlatform>()
          .oneOf(["LINKEDIN", "GITHUB", "X", "FACEBOOK"])
          .required("Platform is required"),
        profileUrl: yup
          .string()
          .required("Profile URL is required")
          .url("Please enter a valid URL"),
      })
    )
    .min(1, "At least one social account is required")
    .required(),
});
export type IUserProfileRequestType = yup.InferType<typeof userProfileSchema>;
