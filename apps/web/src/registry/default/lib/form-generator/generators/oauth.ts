import { OAUTH_PROVIDERS, type OAuthProvider } from "@/lib/oauth-providers-config";

/**
 * Generate production-ready OAuth buttons with proper error handling
 */
export function generateOAuthButtons(oauthProviders: OAuthProvider[]): string {
  return oauthProviders.map(providerId => {
    const provider = OAUTH_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return '';

    const iconComponent = provider.iconSvg || `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

    return `          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn("${provider.betterAuthId}")}
            disabled={isSubmitting}
          >
            ${iconComponent}
            ${provider.name}
          </Button>`;
  }).filter(Boolean).join('\n');
}
