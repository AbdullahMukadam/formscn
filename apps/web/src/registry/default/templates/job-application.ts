import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const jobApplicationTemplate: FormTemplate = {
  id: "job-application",
  name: "Job Application",
  description: "Standard job application with resume and cover letter",
  category: "profile",
  schema: z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
    coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
    remote: z.boolean().default(false),
  }),
  defaultValues: {
    fullName: "",
    email: "",
    portfolio: "",
    coverLetter: "",
    remote: false,
  },
  fields: [
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      placeholder: "Jane Doe",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "jane@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "portfolio",
      label: "Portfolio URL",
      placeholder: "https://janedoe.com",
      description: "Link to your personal website or GitHub",
      inputType: "url",
    },
    {
      type: "textarea",
      name: "coverLetter",
      label: "Cover Letter",
      placeholder: "Tell us why you're a great fit...",
      required: true,
    },
    {
      type: "checkbox",
      name: "remote",
      label: "I am applying for a remote position",
    },
  ],
};
