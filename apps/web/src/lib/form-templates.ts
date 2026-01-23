import * as z from "zod";

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: "authentication" | "contact" | "ecommerce" | "survey" | "profile";
  schema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  fields: FormField[];
}

export interface FormField {
  type: "input" | "textarea" | "select" | "checkbox" | "radio";
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  inputType?: "text" | "email" | "password" | "tel" | "url" | "number";
}

// Signup Form Template
export const signupFormTemplate: FormTemplate = {
  id: "signup-form",
  name: "Signup Form",
  description: "User registration with email and password",
  category: "authentication",
  schema: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
  defaultValues: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  },
  fields: [
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      placeholder: "••••••••",
      description: "Must be at least 8 characters",
      required: true,
      inputType: "password",
    },
    {
      type: "input",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "••••••••",
      required: true,
      inputType: "password",
    },
    {
      type: "checkbox",
      name: "agreeToTerms",
      label: "I agree to the terms and conditions",
      required: true,
    },
  ],
};

// Login Form Template
export const loginFormTemplate: FormTemplate = {
  id: "login-form",
  name: "Login Form",
  description: "Simple email and password login",
  category: "authentication",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
  }),
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "password",
      label: "Password",
      placeholder: "••••••••",
      required: true,
      inputType: "password",
    },
    {
      type: "checkbox",
      name: "rememberMe",
      label: "Remember me",
    },
  ],
};

// Contact Form Template
export const contactFormTemplate: FormTemplate = {
  id: "contact-form",
  name: "Contact Form",
  description: "Basic contact form with name, email, and message",
  category: "contact",
  schema: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  }),
  defaultValues: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Your Name",
      placeholder: "John Doe",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "subject",
      label: "Subject",
      placeholder: "What is this about?",
      required: true,
      inputType: "text",
    },
    {
      type: "textarea",
      name: "message",
      label: "Message",
      placeholder: "Tell us more...",
      description: "Minimum 10 characters",
      required: true,
    },
  ],
};

// Newsletter Signup Template
export const newsletterFormTemplate: FormTemplate = {
  id: "newsletter-form",
  name: "Newsletter Signup",
  description: "Simple newsletter subscription form",
  category: "contact",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    frequency: z.enum(["daily", "weekly", "monthly"]),
  }),
  defaultValues: {
    email: "",
    frequency: "weekly",
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      description: "We'll never share your email",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "frequency",
      label: "Email Frequency",
      required: true,
      options: [
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
      ],
    },
  ],
};

// Job Application Template
export const jobApplicationTemplate: FormTemplate = {
  id: "job-application",
  name: "Job Application",
  description: "Standard job application with resume and cover letter",
  category: "profile",
  schema: z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
    coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
    remote: z.boolean().default(false),
  }),
  defaultValues: {
    fullName: "",
    email: "",
    portfolio: "",
    coverLetter: "",
    remote: false,
  },
  fields: [
    {
      type: "input",
      name: "fullName",
      label: "Full Name",
      placeholder: "Jane Doe",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "jane@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "portfolio",
      label: "Portfolio URL",
      placeholder: "https://janedoe.com",
      description: "Link to your personal website or GitHub",
      inputType: "url",
    },
    {
      type: "textarea",
      name: "coverLetter",
      label: "Cover Letter",
      placeholder: "Tell us why you're a great fit...",
      required: true,
    },
    {
      type: "checkbox",
      name: "remote",
      label: "I am applying for a remote position",
    },
  ],
};

// Feedback Form Template
export const feedbackFormTemplate: FormTemplate = {
  id: "feedback-form",
  name: "Product Feedback",
  description: "Collect user feedback and suggestions",
  category: "survey",
  schema: z.object({
    name: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    rating: z.string().min(1, "Please select a rating"),
    feedback: z.string().min(10, "Please provide some detail"),
    contactPermission: z.boolean().default(false),
  }),
  defaultValues: {
    name: "",
    email: "",
    rating: "",
    feedback: "",
    contactPermission: false,
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Name (Optional)",
      placeholder: "Your name",
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email (Optional)",
      placeholder: "your@email.com",
      inputType: "email",
    },
    {
      type: "textarea",
      name: "feedback",
      label: "Your Feedback",
      placeholder: "What do you think about our product?",
      required: true,
    },
    {
      type: "checkbox",
      name: "contactPermission",
      label: "You may contact me about this feedback",
    },
  ],
};

// Event Registration Template
export const eventRegistrationTemplate: FormTemplate = {
  id: "event-registration",
  name: "Event Registration",
  description: "Register attendees for an upcoming event",
  category: "survey",
  schema: z.object({
    attendeeName: z.string().min(2, "Name is required"),
    attendeeEmail: z.string().email("Invalid email"),
    company: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
  }),
  defaultValues: {
    attendeeName: "",
    attendeeEmail: "",
    company: "",
    dietaryRestrictions: "",
  },
  fields: [
    {
      type: "input",
      name: "attendeeName",
      label: "Full Name",
      placeholder: "John Smith",
      required: true,
      inputType: "text",
    },
    {
      type: "input",
      name: "attendeeEmail",
      label: "Work Email",
      placeholder: "john@company.com",
      required: true,
      inputType: "email",
    },
    {
      type: "input",
      name: "company",
      label: "Company Name",
      placeholder: "Acme Inc.",
      inputType: "text",
    },
    {
      type: "textarea",
      name: "dietaryRestrictions",
      label: "Dietary Requirements",
      placeholder: "Vegetarian, Gluten-free, etc.",
      description: "Let us know if you have any food allergies",
    },
  ],
};

// Waitlist Template
export const waitlistTemplate: FormTemplate = {
  id: "waitlist-form",
  name: "Waitlist Signup",
  description: "Join the waitlist for early access",
  category: "contact",
  schema: z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().optional(),
    referralSource: z.string().optional(),
  }),
  defaultValues: {
    email: "",
    name: "",
    referralSource: "",
  },
  fields: [
    {
      type: "input",
      name: "name",
      label: "Name (Optional)",
      placeholder: "Your Name",
      inputType: "text",
    },
    {
      type: "input",
      name: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "referralSource",
      label: "How did you hear about us?",
      options: [
        { label: "Twitter / X", value: "twitter" },
        { label: "LinkedIn", value: "linkedin" },
        { label: "Friend / Colleague", value: "friend" },
        { label: "Other", value: "other" },
      ],
    },
  ],
};

// Support Ticket Template
export const supportTicketTemplate: FormTemplate = {
  id: "support-ticket",
  name: "Support Ticket",
  description: "Submit a support request or bug report",
  category: "contact",
  schema: z.object({
    email: z.string().email("Invalid email"),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    category: z.enum(["bug", "feature", "billing", "other"]),
    subject: z.string().min(5, "Subject is required"),
    description: z.string().min(20, "Please provide more details"),
  }),
  defaultValues: {
    email: "",
    priority: "medium",
    category: "bug",
    subject: "",
    description: "",
  },
  fields: [
    {
      type: "input",
      name: "email",
      label: "Contact Email",
      placeholder: "you@company.com",
      required: true,
      inputType: "email",
    },
    {
      type: "select",
      name: "category",
      label: "Issue Category",
      required: true,
      options: [
        { label: "Bug Report", value: "bug" },
        { label: "Feature Request", value: "feature" },
        { label: "Billing", value: "billing" },
        { label: "Other", value: "other" },
      ],
    },
    {
      type: "radio",
      name: "priority",
      label: "Priority Level",
      required: true,
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Urgent", value: "urgent" },
      ],
    },
    {
      type: "input",
      name: "subject",
      label: "Subject",
      placeholder: "Brief summary of the issue",
      required: true,
      inputType: "text",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      placeholder: "Please describe the issue in detail...",
      required: true,
      description: "Include steps to reproduce if applicable",
    },
  ],
};

// All templates array
export const formTemplates: FormTemplate[] = [
  signupFormTemplate,
  loginFormTemplate,
  waitlistTemplate,
  supportTicketTemplate,
  contactFormTemplate,
  newsletterFormTemplate,
  jobApplicationTemplate,
  feedbackFormTemplate,
  eventRegistrationTemplate,
];
