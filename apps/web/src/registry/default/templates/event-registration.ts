import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const eventRegistrationTemplate: FormTemplate = {
  id: "event-registration",
  name: "Event Registration",
  description: "Register attendees for an upcoming event",
  category: "survey",
  schema: z.object({
    attendeeName: z.string().min(2, "Name is required"),
    attendeeEmail: z.string().email("Invalid email"),
    company: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
  }),
  defaultValues: {
    attendeeName: "",
    attendeeEmail: "",
    company: "",
    dietaryRestrictions: "",
  },
  fields: [
    {
      type: "input",
      name: "attendeeName",
      label: "Full Name",
      placeholder: "John Smith",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "attendeeEmail",
      label: "Work Email",
      placeholder: "john@company.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "company",
      label: "Company Name",
      placeholder: "Acme Inc.",
      inputType: "text",
    },
    {
      type: "textarea",
      name: "dietaryRestrictions",
      label: "Dietary Requirements",
      placeholder: "Vegetarian, Gluten-free, etc.",
      description: "Let us know if you have any food allergies",
    },
  ],
};
