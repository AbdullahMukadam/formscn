import type { FormField } from "@/registry/default/types";

/**
 * Utility functions for password strength calculation and styling
 */
const PASSWORD_UTILS = `
// Password strength types and utilities
type PasswordStrength = "weak" | "fair" | "good" | "strong";

const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password || password.length === 0) return "weak";

  let score = 0;

  // Length checks
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety checks
  if (/[a-z]/.test(password)) score++; // lowercase
  if (/[A-Z]/.test(password)) score++; // uppercase
  if (/[0-9]/.test(password)) score++; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) score++; // special chars

  // Determine strength
  if (score <= 2) return "weak";
  if (score <= 3) return "fair";
  if (score <= 4) return "good";
  return "strong";
};

const getPasswordStrengthStyles = (strength: PasswordStrength): string => {
  const styles = {
    weak: "bg-destructive w-1/4",
    fair: "bg-orange-500 w-2/4",
    good: "bg-yellow-500 w-3/4",
    strong: "bg-green-500 w-full",
  };
  return styles[strength];
};

const getPasswordStrengthColor = (strength: PasswordStrength): string => {
  const colors = {
    weak: "text-destructive",
    fair: "text-orange-600",
    good: "text-yellow-600",
    strong: "text-green-600",
  };
  return colors[strength];
};`;

/**
 * Utility function for social sign-in handlers
 */
const SOCIAL_SIGNIN_HANDLER = `
const handleSocialSignIn = async (provider: string) => {
  try {
    await signIn.social({ 
      provider,
      callbackURL: "/dashboard"
    });
  } catch (error) {
    toast.error(error instanceof Error ? error.message : \`Failed to sign in with \${provider.charAt(0).toUpperCase() + provider.slice(1)}\`);
  }
};`;

/**
 * Generate utility functions section for the component
 */
export function generateUtilityFunctions(isSignup: boolean, hasOAuth: boolean): string {
  const parts: string[] = [];
  
  // Only add password strength utilities for signup forms
  if (isSignup) {
    parts.push(PASSWORD_UTILS);
  }
  
  if (hasOAuth) {
    parts.push(SOCIAL_SIGNIN_HANDLER);
  }
  
  return parts.length > 0 ? '\n' + parts.join('\n\n') : '';
}

/**
 * Generate useEffect hook for password strength monitoring
 */
export function generatePasswordStrengthEffect(): string {
  return `
  // Monitor password strength
  const password = form.watch("password");

  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
      setShowStrengthIndicator(true);
    } else {
      setShowStrengthIndicator(false);
    }
  }, [password]);`;
}
