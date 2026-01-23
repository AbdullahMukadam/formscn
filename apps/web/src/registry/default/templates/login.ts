import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const loginFormTemplate: FormTemplate = {
  id: "login-form",
  name: "Login Form",
  description: "Simple email and password login",
  category: "authentication",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
  }),
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
  fields: [
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
      required: true,
      inputType: "password",
    },
    {
      type: "checkbox",
      name: "rememberMe",
      label: "Remember me",
    },
  ],
  oauthProviders: ["google", "github"],
};
