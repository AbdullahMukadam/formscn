import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const ecommerceCheckoutTemplate: FormTemplate = {
  id: "ecommerce-checkout",
  name: "Checkout",
  description: "Checkout form with shipping and payment details",
  category: "ecommerce",
  schema: z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    zipCode: z.string().min(4, "ZIP code is required"),
    paymentMethod: z.enum(["credit_card", "paypal", "apple_pay"]),
  }),
  defaultValues: {
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "credit_card",
  },
  fields: [
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
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
      name: "address",
      label: "Shipping Address",
      placeholder: "123 Main St",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "city",
      label: "City",
      placeholder: "New York",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "zipCode",
      label: "ZIP Code",
      placeholder: "10001",
      required: true,
      inputType: "text",
    },
    {
      type: "radio",
      name: "paymentMethod",
      label: "Payment Method",
      required: true,
      options: [
        { label: "Credit Card", value: "credit_card" },
        { label: "PayPal", value: "paypal" },
        { label: "Apple Pay", value: "apple_pay" },
      ],
    },
  ],
};
