import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const passkeyManagementTemplate: FormTemplate = {
  id: "passkey-management",
  name: "Passkey Management",
  description: "Register and manage secure passkeys (Better Auth plugin optional)",
  category: "authentication",
  schema: z.object({
    name: z.string().min(1, "Name is required"),
  }),
  defaultValues: {
    name: "",
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Device Name",
      placeholder: "e.g. MacBook Pro, iPhone",
      description: "Give this passkey a recognizable name",
      required: true,
      inputType: "text",
    },
  ],
};

