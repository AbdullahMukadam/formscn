import { OAUTH_PROVIDERS, type OAuthProvider } from "@/lib/oauth-providers-config";

/**
 * Generate OAuth buttons JSX
 */
export function generateOAuthButtons(oauthProviders: OAuthProvider[]): string {
  return oauthProviders.map(providerId => {
    const provider = OAUTH_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return '';

    const iconComponent = provider.iconSvg || `<${provider.icon.name} className="mr-2 h-4 w-4" />`;

    return `          <Button
            variant="outline"
            onClick={() => signIn.social({ provider: "${provider.betterAuthId}" })}
          >
            ${iconComponent}
            ${provider.name}
          </Button>`;
  }).filter(Boolean).join('\n');
}
