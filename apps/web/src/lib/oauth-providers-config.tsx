import { 
  Github, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Apple, 
  Linkedin, 
  Cloud,
  Mail,
  type LucideIcon 
} from "lucide-react";

export type OAuthProvider = 
  | "google" 
  | "github" 
  | "discord" 
  | "twitter" 
  | "facebook" 
  | "apple" 
  | "microsoft" 
  | "linkedin";

export interface OAuthProviderConfig {
  id: OAuthProvider;
  name: string;
  icon: LucideIcon;
  iconSvg?: string; // For custom SVG icons like Google
  betterAuthId: string; // The ID used in Better Auth
  color?: string; // Brand color for styling
  enabled: boolean; // Can be disabled without removing from config
}

/**
 * Centralized OAuth Providers Configuration
 * 
 * To add a new provider:
 * 1. Add the provider ID to the OAuthProvider type above
 * 2. Add a new entry to the OAUTH_PROVIDERS array below
 * 3. That's it! The UI and code generation will automatically pick it up
 */
export const OAUTH_PROVIDERS: OAuthProviderConfig[] = [
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    betterAuthId: "github",
    color: "#333",
    enabled: true,
  },
  {
    id: "google",
    name: "Google",
    icon: Mail,
    iconSvg: `<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>`,
    betterAuthId: "google",
    color: "#4285F4",
    enabled: true,
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageCircle,
    betterAuthId: "discord",
    color: "#5865F2",
    enabled: true,
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: Twitter,
    betterAuthId: "twitter",
    color: "#1DA1F2",
    enabled: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    betterAuthId: "facebook",
    color: "#1877F2",
    enabled: true,
  },
  {
    id: "apple",
    name: "Apple",
    icon: Apple,
    betterAuthId: "apple",
    color: "#000",
    enabled: true,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: Cloud,
    betterAuthId: "microsoft",
    color: "#00A4EF",
    enabled: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    betterAuthId: "linkedin",
    color: "#0A66C2",
    enabled: true,
  },
];

/**
 * Get enabled OAuth providers
 */
export const getEnabledOAuthProviders = () => 
  OAUTH_PROVIDERS.filter(p => p.enabled);

/**
 * Get OAuth provider config by ID
 */
export const getOAuthProvider = (id: OAuthProvider) => 
  OAUTH_PROVIDERS.find(p => p.id === id);

/**
 * Get OAuth provider icon component
 */
export const getOAuthProviderIcon = (id: OAuthProvider) => {
  const provider = getOAuthProvider(id);
  return provider?.icon;
};
