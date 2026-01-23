import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const supportTicketTemplate: FormTemplate = {
  id: "support-ticket",
  name: "Support Ticket",
  description: "Submit a support request or bug report",
  category: "contact",
  schema: z.object({
    email: z.string().email("Invalid email"),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    category: z.enum(["bug", "feature", "billing", "other"]),
    subject: z.string().min(5, "Subject is required"),
    description: z.string().min(20, "Please provide more details"),
  }),
  defaultValues: {
    email: "",
    priority: "medium",
    category: "bug",
    subject: "",
    description: "",
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Contact Email",
      placeholder: "you@company.com",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "category",
      label: "Issue Category",
      required: true,
      options: [
        { label: "Bug Report", value: "bug" },
        { label: "Feature Request", value: "feature" },
        { label: "Billing", value: "billing" },
        { label: "Other", value: "other" },
      ],
    },
    {
      type: "radio",
      name: "priority",
      label: "Priority Level",
      required: true,
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Urgent", value: "urgent" },
      ],
    },
    {
      type: "input",
      name: "subject",
      label: "Subject",
      placeholder: "Brief summary of the issue",
      required: true,
      inputType: "text",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      placeholder: "Please describe the issue in detail...",
      required: true,
      description: "Include steps to reproduce if applicable",
    },
  ],
};
