"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  attendeeName: z.string().min(2, "Name is required"),
  attendeeEmail: z.string().email("Invalid email"),
  company: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
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
    toast.success("Successfully registered for the event!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Event Registration</CardTitle>
        <CardDescription>Register for our upcoming event</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="attendeeName">Full Name</Label>
            <Input
              id="attendeeName"
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
              placeholder="Acme Inc."
              {...form.register("company")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">Dietary Requirements</Label>
            <Textarea
              id="dietaryRestrictions"
              placeholder="Vegetarian, Gluten-free, etc."
              className="min-h-[80px]"
              {...form.register("dietaryRestrictions")}
            />
            <p className="text-sm text-muted-foreground">
              Let us know if you have any food allergies
            </p>
          </div>

          <Button type="submit" className="w-full">Register Now</Button>
        </form>
      </CardContent>
    </Card>
  );
}
