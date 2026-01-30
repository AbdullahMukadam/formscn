import { OAUTH_PROVIDERS } from "@/lib/oauth-providers-config";
import type { GenerateFormComponentConfig, Framework } from "../types";
import { generateImports } from "./imports";
import { generateZodSchema } from "./schema";
import { generateFormFields } from "./fields";
import { generateSubmitLogic } from "./submit-logic";
import { generateOAuthButtons } from "./oauth";

/**
 * Generate a complete form component with Better Auth integration
 */
export function generateFormComponent(config: GenerateFormComponentConfig): string {
  const { formName, formDescription, fields: initialFields, oauthProviders, framework = "next", steps } = config;
  
  // Use steps fields if steps are provided, otherwise use fields
  const fields = (steps && steps.length > 0) ? steps.flatMap(s => s.fields) : initialFields;
  const hasSteps = !!(steps && steps.length > 0);

  const hasOAuth = oauthProviders.length > 0;
  
  // Extract OAuth icons to import (Not needed anymore since we use SVGs, but kept for cleanup)
  // const oauthIcons = ... (Removed)

  // Auth Detection
  const hasEmail = fields.some(f => f.name === "email" || f.inputType === "email");
  const hasPassword = fields.some(f => f.name === "password" || f.inputType === "password");
  const hasConfirmPassword = fields.some(f => f.name === "confirmPassword");
  const hasName = fields.some(f => ["name", "fullName", "firstName", "username"].includes(f.name));
  
  const isSignup = hasEmail && hasPassword && (hasConfirmPassword || hasName);
  const isLogin = hasEmail && hasPassword && !isSignup;
  const isAuth = isLogin || isSignup || hasOAuth;

  // Add Username hint for plugins
  if (isAuth && !fields.some(f => f.name === 'username') && fields.some(f => f.name === 'fullName')) {
     // Optional: Logic to inject username could go here
  }

  // Generate parts
  const imports = generateImports({
    framework,
    fields,
    oauthProviders,
    isAuth,
    isLogin,
    isSignup,
    hasOAuth,
    hasSteps
  });

  const schema = generateZodSchema(fields);
  const oauthButtons = generateOAuthButtons(oauthProviders);
  const submitLogic = generateSubmitLogic({ isLogin, isSignup, fields, framework });

  // Generate component
  const componentName = formName.replace(/\s+/g, '') + 'Form';
  const defaultValues = fields.map(f => {
    if (f.type === "checkbox") return `      ${f.name}: false,`;
    if (f.type === "date") return `      ${f.name}: undefined,`;
    if (f.type === "file") return `      ${f.name}: undefined,`;
    return `      ${f.name}: "",`;
  }).join('\n');

  let componentBody = '';

  if (hasSteps && steps) {
    // MULTI-STEP LOGIC
    const stepsData = JSON.stringify(steps.map(s => ({ 
      id: s.id, 
      title: s.title, 
      description: s.description,
      fields: s.fields.map(f => f.name) 
    })), null, 2);

    const stepsRender = steps.map((step, index) => {
      const stepFields = generateFormFields(step.fields);
      return `
        {currentStep === ${index} && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
            ${stepFields}
          </div>
        )}`;
    }).join('\n');

    componentBody = `
export interface ${componentName}Props {
  defaultValues?: Partial<FormValues>;
  onValuesChange?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => Promise<void>;
  className?: string;
}

export function ${componentName}({ defaultValues, onValuesChange, onSubmit, className }: ${componentName}Props = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ${stepsData};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${defaultValues}
      ...defaultValues,
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const { isSubmitting } = form.formState;
  const values = form.watch();

  useEffect(() => {
    onValuesChange?.(values);
  }, [values, onValuesChange]);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
${submitLogic}
    }
  };

  const nextStep = async () => {
    const currentStepFields = steps[currentStep].fields;
    const isValid = await form.trigger(currentStepFields as any);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>${formName}</CardTitle>
        <CardDescription>${formDescription}</CardDescription>
        
        {/* Progress Indicator */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="font-medium">
              {steps[currentStep].title}
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          ${stepsRender}

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 0 || isSubmitting}
              className={cn(currentStep === 0 && "invisible")}
            >
              Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}`;
  } else {
    // SINGLE-STEP LOGIC
    const formFields = generateFormFields(fields);
    const submitButtonText = isLogin ? "Sign In" : isSignup ? "Create Account" : "Submit";
    const loadingText = isLogin ? "Signing in..." : isSignup ? "Creating account..." : "Submitting...";
    
    componentBody = `
export interface ${componentName}Props {
  defaultValues?: Partial<FormValues>;
  onValuesChange?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => Promise<void>;
  className?: string;
}

export function ${componentName}({ defaultValues, onValuesChange, onSubmit, className }: ${componentName}Props = {}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${defaultValues}
      ...defaultValues,
    },
  });

  const { isSubmitting } = form.formState;
  const values = form.watch();

  useEffect(() => {
    onValuesChange?.(values);
  }, [values, onValuesChange]);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
${submitLogic}
    }
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>${formName}</CardTitle>
        <CardDescription>${formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
${formFields}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "${loadingText}" : "${submitButtonText}"}
          </Button>
        </form>${hasOAuth ? `

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-${oauthProviders.length} gap-4">
${oauthButtons}
        </div>` : ''}
      </CardContent>
    </Card>
  );
}`;
  }

  return `${imports}${schema}${componentBody}`;
}
