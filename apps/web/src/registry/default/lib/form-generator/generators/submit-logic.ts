import type { GenerateSubmitLogicConfig } from "../types";

/**
 * Generate production-ready submit logic with proper error handling
 */
export function generateSubmitLogic(config: GenerateSubmitLogicConfig): string {
  const { isLogin, isSignup, fields } = config;

  if (isLogin) {
    return `      try {
        await signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
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
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }`;
  }

  if (isSignup) {
    // Find name field (fullName, name, etc)
    const nameField = fields.find(f =>
      ["name", "fullName", "firstName", "username"].includes(f.name)
    )?.name;

    const nameProp = nameField
      ? `\n          name: data.${nameField},`
      : `\n          name: data.email.split("@")[0],`;

    return `      try {
        await signUp.email({
          email: data.email,
          password: data.password,${nameProp}
          callbackURL: "/dashboard",
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
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }`;
  }

  // Generic form submission (non-auth) with API call template
  return `      try {   
       //submit logic here
        toast.success("Form submitted successfully!");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Something went wrong");
      }`;
}
