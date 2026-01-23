"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  attendeeName: z.string().min(1, "Full Name is required"),
  attendeeEmail: z.string().email("Invalid email address").min(1, "Work Email is required"),
  company: z.string().optional().or(z.literal("")),
  dietaryRestrictions: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;
export function EventRegistrationForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendeeName: "",
      attendeeEmail: "",
      company: "",
      dietaryRestrictions: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Event Registration</CardTitle>
        <CardDescription>Register attendees for an upcoming event</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="attendeeName">Full Name</Label>
            <Input
              id="attendeeName"
              type="text"
              placeholder="John Smith"
              {...form.register("attendeeName")}
            />
            {form.formState.errors.attendeeName && (
            <p className="text-sm text-destructive">{form.formState.errors.attendeeName.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendeeEmail">Work Email</Label>
            <Input
              id="attendeeEmail"
              type="email"
              placeholder="john@company.com"
              {...form.register("attendeeEmail")}
            />
            {form.formState.errors.attendeeEmail && (
            <p className="text-sm text-destructive">{form.formState.errors.attendeeEmail.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              type="text"
              placeholder="Acme Inc."
              {...form.register("company")}
            />
            {form.formState.errors.company && (
            <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>
          )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">Dietary Requirements</Label>
            <Textarea
              id="dietaryRestrictions"
              placeholder="Vegetarian, Gluten-free, etc."
              {...form.register("dietaryRestrictions")}
            />
            {form.formState.errors.dietaryRestrictions && (
            <p className="text-sm text-destructive">{form.formState.errors.dietaryRestrictions.message}</p>
          )}
          <p className="text-sm text-muted-foreground">Let us know if you have any food allergies</p>
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}