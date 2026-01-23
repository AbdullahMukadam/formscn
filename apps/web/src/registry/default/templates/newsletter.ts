import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const newsletterFormTemplate: FormTemplate = {
  id: "newsletter-form",
  name: "Newsletter Signup",
  description: "Simple newsletter subscription form",
  category: "contact",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    frequency: z.enum(["daily", "weekly", "monthly"]),
  }),
  defaultValues: {
    email: "",
    frequency: "weekly",
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      description: "We'll never share your email",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "frequency",
      label: "Email Frequency",
      required: true,
      options: [
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
      ],
    },
  ],
};
