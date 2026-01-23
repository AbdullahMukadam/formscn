"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email Address is required"),
  portfolio: z.string().optional().or(z.literal("")),
  coverLetter: z.string().min(1, "Cover Letter is required"),
  remote: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;
export function JobApplicationForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      portfolio: "",
      coverLetter: "",
      remote: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Job Application</CardTitle>
        <CardDescription>Standard job application with resume and cover letter</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jane Doe"
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
              placeholder="jane@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input
              id="portfolio"
              type="url"
              placeholder="https://janedoe.com"
              {...form.register("portfolio")}
            />
            {form.formState.errors.portfolio && (
            <p className="text-sm text-destructive">{form.formState.errors.portfolio.message}</p>
          )}
          <p className="text-sm text-muted-foreground">Link to your personal website or GitHub</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're a great fit..."
              {...form.register("coverLetter")}
            />
            {form.formState.errors.coverLetter && (
            <p className="text-sm text-destructive">{form.formState.errors.coverLetter.message}</p>
          )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              control={form.control}
              name="remote"
              render={({ field }) => (
                <Checkbox
                  id="remote"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="remote" className="font-normal">
              I am applying for a remote position
            </Label>
            {form.formState.errors.remote && (
            <p className="text-sm text-destructive">{form.formState.errors.remote.message}</p>
          )}
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}