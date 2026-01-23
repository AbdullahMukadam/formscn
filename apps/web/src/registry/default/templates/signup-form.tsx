"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { signUp } from "@/lib/auth-client";

const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email Address is required"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to I agree to the terms and conditions" }),
});

type FormValues = z.infer<typeof formSchema>;
export function SignupFormForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: data.fullName,
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          // toast.loading("Creating account...");
        },
        onRequest: () => {
          toast.loading("Creating account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account created successfully!");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Signup Form</CardTitle>
        <CardDescription>User registration with email and password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <p className="text-sm text-muted-foreground">Must be at least 8 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
          )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <Checkbox
                  id="agreeToTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="agreeToTerms" className="font-normal">
              I agree to the terms and conditions
            </Label>
            {form.formState.errors.agreeToTerms && (
            <p className="text-sm text-destructive">{form.formState.errors.agreeToTerms.message}</p>
          )}
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}