import type { GenerateSubmitLogicConfig, Framework } from "../types";


function getNavigationCall(framework: Framework, path: string): string {
  switch (framework) {
    case "next":
      return `router.push("${path}");`;
    case "tanstack":
      // TanStack Router uses object syntax
      return `navigate({ to: "${path}" });`;
    case "remix":
    case "react":
    default:
      return `navigate("${path}");`;
  }
}

/**
 * Generate submit logic code - framework aware with proper navigation
 */
export function generateSubmitLogic(config: GenerateSubmitLogicConfig): string {
  const { isLogin, isSignup, fields, framework = "next" } = config;

  const redirectCall = getNavigationCall(framework, "/dashboard");
  
  if (isLogin) {
    return `    await signIn.email({
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
          ${redirectCall}
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
      callbackURL: "/dashboard",
      fetchOptions: {
        onRequest: () => {
          toast.loading("Creating your account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account created successfully!");
          ${redirectCall}
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
      toast.error("Something went wrong. Please try again.");
    }`;
}
