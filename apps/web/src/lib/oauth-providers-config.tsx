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
    iconSvg: `<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.699.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
    </svg>`,
    betterAuthId: "discord",
    color: "#5865F2",
    enabled: true,
  },
  {
    id: "twitter",
    name: "X",
    icon: Twitter,
    iconSvg: `<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>`,
    betterAuthId: "twitter",
    color: "#000000",
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
    iconSvg: `<svg className="mr-2 h-4 w-4" viewBox="0 0 23 23" fill="currentColor">
      <path fill="#f25022" d="M1 1h10v10H1z"/>
      <path fill="#00a4ef" d="M12 1h10v10H12z"/>
      <path fill="#7fba00" d="M1 12h10v10H1z"/>
      <path fill="#ffb900" d="M12 12h10v10H12z"/>
    </svg>`,
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
