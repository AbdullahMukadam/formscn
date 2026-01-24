import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const detailedApplicationTemplate: FormTemplate = {
  id: "detailed-application",
  name: "Detailed Application",
  description: "Comprehensive multi-step application form",
  category: "survey",
  schema: z.object({
    // Contact
    fullName: z.string().min(2, "Name required"),
    email: z.string().email(),
    phone: z.string().optional(),
    // Experience
    currentRole: z.string().min(2, "Role required"),
    experienceYears: z.string(),
    skills: z.string().min(10, "List some skills"),
    // Additional
    portfolioUrl: z.string().url().optional().or(z.literal("")),
    availability: z.enum(["immediate", "two-weeks", "one-month"]),
    comments: z.string().optional(),
  }),
  defaultValues: {
    fullName: "",
    email: "",
    phone: "",
    currentRole: "",
    experienceYears: "",
    skills: "",
    portfolioUrl: "",
    availability: "immediate",
    comments: "",
  },
  fields: [],
  steps: [
    {
      id: "contact",
      title: "Contact Info",
      description: "How can we reach you?",
      fields: [
        {
          type: "input",
          name: "fullName",
          label: "Full Name",
          required: true,
          inputType: "text",
        },
        {
          type: "input",
          name: "email",
          label: "Email Address",
          required: true,
          inputType: "email",
        },
        {
          type: "input",
          name: "phone",
          label: "Phone Number",
          inputType: "tel",
        },
      ],
    },
    {
      id: "experience",
      title: "Experience",
      description: "Your professional background",
      fields: [
        {
          type: "input",
          name: "currentRole",
          label: "Current Role",
          required: true,
          inputType: "text",
        },
        {
          type: "select",
          name: "experienceYears",
          label: "Years of Experience",
          required: true,
          options: [
            { label: "0-2 years", value: "0-2" },
            { label: "3-5 years", value: "3-5" },
            { label: "5+ years", value: "5+" },
          ],
        },
        {
          type: "textarea",
          name: "skills",
          label: "Key Skills",
          placeholder: "React, Node.js, TypeScript...",
          required: true,
        },
      ],
    },
    {
      id: "additional",
      title: "Additional Info",
      description: "Almost there",
      fields: [
        {
          type: "input",
          name: "portfolioUrl",
          label: "Portfolio URL",
          inputType: "url",
        },
        {
          type: "radio",
          name: "availability",
          label: "When can you start?",
          required: true,
          options: [
            { label: "Immediately", value: "immediate" },
            { label: "Two Weeks", value: "two-weeks" },
            { label: "One Month", value: "one-month" },
          ],
        },
        {
          type: "textarea",
          name: "comments",
          label: "Additional Comments",
        },
      ],
    },
  ],
};
