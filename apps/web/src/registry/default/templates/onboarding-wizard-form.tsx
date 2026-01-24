"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email Address is required"),
  password: z.string().min(1, "Password is required"),
  fullName: z.string().min(1, "Full Name is required"),
  bio: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  theme: z.enum(["light", "dark", "system"]),
  notifications: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function OnboardingWizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
  {
    "id": "account",
    "title": "Account",
    "description": "Create your secure account",
    "fields": [
      "email",
      "password"
    ]
  },
  {
    "id": "profile",
    "title": "Profile",
    "description": "Tell us about yourself",
    "fields": [
      "fullName",
      "bio",
      "website"
    ]
  },
  {
    "id": "preferences",
    "title": "Preferences",
    "description": "Customize your experience",
    "fields": [
      "theme",
      "notifications"
    ]
  }
];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      bio: "",
      website: "",
      theme: "system",
      notifications: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
  };

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any);
    if (output) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Onboarding Wizard</CardTitle>
        <CardDescription>Multi-step user onboarding process</CardDescription>
        
        {/* Stepper */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="font-medium">
              {steps[currentStep].title}
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>
        <div className="text-center text-sm font-medium text-muted-foreground pt-1">
          {steps[currentStep].title}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
        {currentStep === 0 && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
                      <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          )}
          </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
                      <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
            <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="I am a software engineer..."
              {...form.register("bio")}
            />
            {form.formState.errors.bio && (
            <p className="text-sm text-destructive">{form.formState.errors.bio.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              {...form.register("website")}
            />
            {form.formState.errors.website && (
            <p className="text-sm text-destructive">{form.formState.errors.website.message}</p>
          )}
          </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
                      <div className="space-y-2">
            <Label htmlFor="theme">Theme Preference</Label>
            <Controller
              control={form.control}
              name="theme"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.theme && (
            <p className="text-sm text-destructive">{form.formState.errors.theme.message}</p>
          )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <Checkbox
                  id="notifications"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="notifications" className="font-normal">
              Enable Email Notifications
            </Label>
            {form.formState.errors.notifications && (
            <p className="text-sm text-destructive">{form.formState.errors.notifications.message}</p>
          )}
          </div>
          </div>
        )}

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 0}
              className={cn(currentStep === 0 && "invisible")}
            >
              Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
