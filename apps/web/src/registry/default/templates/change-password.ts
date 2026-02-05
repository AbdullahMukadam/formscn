import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const changePasswordTemplate: FormTemplate = {
  id: "change-password",
  name: "Change Password",
  description: "Update password with current password verification (auth optional)",
  category: "authentication",
  schema: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
  defaultValues: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  fields: [
    {
      type: "input",
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter your current password",
      required: true,
      inputType: "password",
    },
    {
      type: "input",
      name: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
      description: "Must be at least 8 characters",
      required: true,
      inputType: "password",
    },
    {
      type: "input",
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Re-enter new password",
      required: true,
      inputType: "password",
    },
  ],
};
