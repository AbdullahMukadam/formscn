import { type FormTemplate } from "@/registry/default/types";
import { signupFormTemplate } from "./signup";
import { loginFormTemplate } from "./login";
import { contactFormTemplate } from "./contact";
import { newsletterFormTemplate } from "./newsletter";
import { jobApplicationTemplate } from "./job-application";
import { feedbackFormTemplate } from "./feedback";
import { eventRegistrationTemplate } from "./event-registration";
import { waitlistTemplate } from "./waitlist";
import { supportTicketTemplate } from "./support-ticket";
import { bookingRequestTemplate } from "./booking-request";
import { ecommerceCheckoutTemplate } from "./ecommerce-checkout";

export const formTemplates: FormTemplate[] = [
  signupFormTemplate,
  loginFormTemplate,
  contactFormTemplate,
  newsletterFormTemplate,
  jobApplicationTemplate,
  feedbackFormTemplate,
  eventRegistrationTemplate,
  waitlistTemplate,
  supportTicketTemplate,
  bookingRequestTemplate,
  ecommerceCheckoutTemplate,
];

export * from "./signup";
export * from "./login";
export * from "./contact";
export * from "./newsletter";
export * from "./job-application";
export * from "./feedback";
export * from "./event-registration";
export * from "./waitlist";
export * from "./support-ticket";
export * from "./booking-request";
export * from "./ecommerce-checkout";
