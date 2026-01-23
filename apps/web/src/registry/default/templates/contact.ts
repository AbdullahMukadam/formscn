import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const contactFormTemplate: FormTemplate = {
  id: "contact-form",
  name: "Contact Form",
  description: "Basic contact form with name, email, and message",
  category: "contact",
  schema: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  }),
  defaultValues: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Your Name",
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
      name: "subject",
      label: "Subject",
      placeholder: "What is this about?",
      required: true,
      inputType: "text",
    },
    {
      type: "textarea",
      name: "message",
      label: "Message",
      placeholder: "Tell us more...",
      description: "Minimum 10 characters",
      required: true,
    },
  ],
};
