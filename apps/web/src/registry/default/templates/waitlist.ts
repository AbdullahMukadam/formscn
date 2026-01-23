import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const waitlistTemplate: FormTemplate = {
  id: "waitlist-form",
  name: "Waitlist Signup",
  description: "Join the waitlist for early access",
  category: "contact",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().optional(),
    referralSource: z.string().optional(),
  }),
  defaultValues: {
    email: "",
    name: "",
    referralSource: "",
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Name (Optional)",
      placeholder: "Your Name",
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "referralSource",
      label: "How did you hear about us?",
      options: [
        { label: "Twitter / X", value: "twitter" },
        { label: "LinkedIn", value: "linkedin" },
        { label: "Friend / Colleague", value: "friend" },
        { label: "Other", value: "other" },
      ],
    },
  ],
};
