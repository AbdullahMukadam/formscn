import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "../components/Form";
import { z } from "zod";

const meta = {
  title: "Components/Form",
  component: Form,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Contact Form",
    description: "Fill out the form below",
    schema: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      message: z.string().min(10, "Message too short"),
    }),
    onSubmit: (values) => console.log("Form submitted:", values),
    className:"space-y-8",
    children: (
      <div className="pt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
        >
          Submit
        </button>
      </div>
    ),
  },
};

export const LoginForm: Story = {
  args: {
    title: "Login Form",
    description: "Enter your credentials",
    schema: z.object({
      email: z.string().min(1, "Email is required").email("Invalid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      remember: z.boolean().optional(),
    }),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: (values) => console.log("Form submitted:", values),
    className:"space-y-5",
    children: (
      <div className="space-y-4 pt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
        >
          Sign In
        </button>
      </div>
    ),
  },
};
