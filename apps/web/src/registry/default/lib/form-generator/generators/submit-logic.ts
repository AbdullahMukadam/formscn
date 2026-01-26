import { error } from "console";
import type { GenerateSubmitLogicConfig } from "../types";

/**
 * Generate submit logic code - simplified (no navigation)
 */
export function generateSubmitLogic(config: GenerateSubmitLogicConfig): string {
  const { isLogin, isSignup, fields } = config;

  if (isLogin) {
    return `    await signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onRequest: () => {
          toast.loading("Signing in...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Welcome back!");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message || "Invalid email or password");
        },
      },
    });`;
  }

  if (isSignup) {
    // Find name field (fullName, name, etc)
    const nameField = fields.find(f =>
      ["name", "fullName", "firstName", "username"].includes(f.name)
    )?.name;

    const nameProp = nameField
      ? `\n      name: data.${nameField},`
      : `\n      name: data.email.split("@")[0],`;

    return `    await signUp.email({
      email: data.email,
      password: data.password,${nameProp}
      fetchOptions: {
        onRequest: () => {
          toast.loading("Creating your account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account created successfully!");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message || "Failed to create account");
        },
      },
    });`;
  }

  // Generic form submission (non-auth)
  return `    try {
      // TODO: Replace with your API endpoint
      console.log("Form submitted:", data);
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error( error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }`;
}

