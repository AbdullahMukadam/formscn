import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const twoFactorSetupTemplate: FormTemplate = {
  id: "two-factor-setup",
  name: "2FA Setup",
  description: "Configure two-factor authentication for user accounts",
  category: "authentication",
  schema: z.object({
    code: z.string().length(6, "Code must be exactly 6 digits"),
  }),
  defaultValues: {
    code: "",
  },
  fields: [
    {
      type: "input",
      name: "code",
      label: "Verification Code",
      placeholder: "000000",
      description: "Enter the 6-digit code from your authenticator app",
      required: true,
      inputType: "text",
    },
  ],
  authPlugins: {
    twoFactor: true,
  },
};
