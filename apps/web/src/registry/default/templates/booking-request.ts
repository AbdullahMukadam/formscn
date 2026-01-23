import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const bookingRequestTemplate: FormTemplate = {
  id: "booking-request",
  name: "Booking Request",
  description: "Request a booking or appointment",
  category: "booking",
  schema: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    date: z.string().min(1, "Date is required"),
    service: z.enum(["consultation", "demo", "support"]),
    notes: z.string().optional(),
  }),
  defaultValues: {
    name: "",
    email: "",
    date: "",
    service: "consultation",
    notes: "",
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
      name: "date",
      label: "Preferred Date",
      required: true,
      inputType: "date",
    },
    {
      type: "select",
      name: "service",
      label: "Service Type",
      required: true,
      options: [
        { label: "Consultation", value: "consultation" },
        { label: "Product Demo", value: "demo" },
        { label: "Technical Support", value: "support" },
      ],
    },
    {
      type: "textarea",
      name: "notes",
      label: "Additional Notes",
      placeholder: "Any specific requirements?",
    },
  ],
};
