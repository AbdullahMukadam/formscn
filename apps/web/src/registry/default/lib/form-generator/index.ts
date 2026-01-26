
// Re-export types
export type {
  OAuthProvider,
  DatabaseAdapter,
  Framework,
  AuthPluginsConfig,
  GenerateImportsConfig,
  GenerateSubmitLogicConfig,
  GenerateFormComponentConfig,
  GenerateAuthConfigOptions,
} from "./types";

// Re-export form component generator (main entry point)
export { generateFormComponent } from "./generators/component";

// Re-export individual generators (for advanced use cases)
export { generateImports } from "./generators/imports";
export { generateZodSchema } from "./generators/schema";
export { generateFormFields } from "./generators/fields";
export { generateSubmitLogic } from "./generators/submit-logic";
export { generateOAuthButtons } from "./generators/oauth";

// Re-export auth generators
export { generateAuthConfig, generateAuthClient } from "./auth";

// Re-export database generators
export {
  generatePrismaSchema,
  generatePrismaClient,
  generateDrizzleSchema,
  generateDrizzleClient,
} from "./database";
