import * as z from "zod";
import { type FormTemplate } from "@/registry/default/types";

export const organizationInviteTemplate: FormTemplate = {
  id: "organization-invite",
  name: "Org Invitation",
  description: "Invite new members to your organization",
  category: "authentication",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["admin", "member"]),
  }),
  defaultValues: {
    email: "",
    role: "member",
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "colleague@company.com",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "role",
      label: "Assign Role",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
      ],
    },
  ],
  authPlugins: {
    organization: true,
  },
};
