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
    onSubmit: (values) => console.log(values),
  },
};