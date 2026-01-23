import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const signupFormTemplate: FormTemplate = {
  id: "signup-form",
  name: "Signup Form",
  description: "User registration with email and password",
  category: "authentication",
  schema: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
  defaultValues: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  },
  fields: [
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      placeholder: "••••••••",
      description: "Must be at least 8 characters",
      required: true,
      inputType: "password",
    },
    {
      type: "input",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "••••••••",
      required: true,
      inputType: "password",
    },
    {
      type: "checkbox",
      name: "agreeToTerms",
      label: "I agree to the terms and conditions",
      required: true,
    },
  ],
};
