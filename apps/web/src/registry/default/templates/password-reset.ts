import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const passwordResetTemplate: FormTemplate = {
  id: "password-reset",
  name: "Password Reset",
  description: "Request password reset link via email (auth optional)",
  category: "authentication",
  schema: z.object({
    email: z.string().email("Invalid email address"),
  }),
  defaultValues: {
    email: "",
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      description: "We'll send you a password reset link",
      required: true,
      inputType: "email",
    },
  ],
};
