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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  currentRole: z.string().min(2, "Role required"),
  experienceYears: z.string().min(1, "Required"),
  skills: z.string().min(10, "List some skills"),
  portfolioUrl: z.string().optional().or(z.literal("")),
  availability: z.enum(["immediate", "two-weeks", "one-month"]),
  comments: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function DetailedApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
  {
    "id": "contact",
    "title": "Contact Info",
    "description": "How can we reach you?",
    "fields": [
      "fullName",
      "email",
      "phone"
    ]
  },
  {
    "id": "experience",
    "title": "Experience",
    "description": "Your professional background",
    "fields": [
      "currentRole",
      "experienceYears",
      "skills"
    ]
  },
  {
    "id": "additional",
    "title": "Additional Info",
    "description": "Almost there",
    "fields": [
      "portfolioUrl",
      "availability",
      "comments"
    ]
  }
];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      currentRole: "",
      experienceYears: "",
      skills: "",
      portfolioUrl: "",
      availability: "immediate",
      comments: "",
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
        <CardTitle>Detailed Application</CardTitle>
        <CardDescription>Comprehensive multi-step application form</CardDescription>
        
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
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder=""
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
            <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder=""
              {...form.register("email")}
            />
            {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder=""
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
            <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
          )}
          </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
                      <div className="space-y-2">
            <Label htmlFor="currentRole">Current Role</Label>
            <Input
              id="currentRole"
              type="text"
              placeholder=""
              {...form.register("currentRole")}
            />
            {form.formState.errors.currentRole && (
            <p className="text-sm text-destructive">{form.formState.errors.currentRole.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceYears">Years of Experience</Label>
            <Controller
              control={form.control}
              name="experienceYears"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="experienceYears">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.experienceYears && (
            <p className="text-sm text-destructive">{form.formState.errors.experienceYears.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills</Label>
            <Textarea
              id="skills"
              placeholder="React, Node.js, TypeScript..."
              {...form.register("skills")}
            />
            {form.formState.errors.skills && (
            <p className="text-sm text-destructive">{form.formState.errors.skills.message}</p>
          )}
          </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
                      <div className="space-y-2">
            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
            <Input
              id="portfolioUrl"
              type="url"
              placeholder=""
              {...form.register("portfolioUrl")}
            />
            {form.formState.errors.portfolioUrl && (
            <p className="text-sm text-destructive">{form.formState.errors.portfolioUrl.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label>When can you start?</Label>
            <Controller
              control={form.control}
              name="availability"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="availability-immediate" />
                    <Label htmlFor="availability-immediate">Immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="two-weeks" id="availability-two-weeks" />
                    <Label htmlFor="availability-two-weeks">Two Weeks</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-month" id="availability-one-month" />
                    <Label htmlFor="availability-one-month">One Month</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {form.formState.errors.availability && (
            <p className="text-sm text-destructive">{form.formState.errors.availability.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea
              id="comments"
              placeholder=""
              {...form.register("comments")}
            />
            {form.formState.errors.comments && (
            <p className="text-sm text-destructive">{form.formState.errors.comments.message}</p>
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
