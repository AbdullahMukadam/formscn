import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const feedbackFormTemplate: FormTemplate = {
  id: "feedback-form",
  name: "Product Feedback",
  description: "Collect user feedback and suggestions",
  category: "survey",
  schema: z.object({
    name: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    rating: z.string().min(1, "Please select a rating"),
    feedback: z.string().min(10, "Please provide some detail"),
    contactPermission: z.boolean().default(false),
  }),
  defaultValues: {
    name: "",
    email: "",
    rating: "",
    feedback: "",
    contactPermission: false,
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Name (Optional)",
      placeholder: "Your name",
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email (Optional)",
      placeholder: "your@email.com",
      inputType: "email",
    },
    {
      type: "textarea",
      name: "feedback",
      label: "Your Feedback",
      placeholder: "What do you think about our product?",
      required: true,
    },
    {
      type: "checkbox",
      name: "contactPermission",
      label: "You may contact me about this feedback",
    },
  ],
};
