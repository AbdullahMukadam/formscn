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
import { onboardingWizardTemplate } from "./onboarding-wizard";
import { detailedApplicationTemplate } from "./detailed-application";
import { twoFactorSetupTemplate } from "./two-factor-setup-template";
import { organizationInviteTemplate } from "./organization-invite-template";
import { passkeyManagementTemplate } from "./passkey-management-template";
import { profileSettingsTemplate } from "./profile-settings";
import { passwordResetTemplate } from "./password-reset";
import { changePasswordTemplate } from "./change-password";
import { addressFormTemplate } from "./address-form";

export const formTemplates: FormTemplate[] = [
  signupFormTemplate,
  loginFormTemplate,
  twoFactorSetupTemplate,
  organizationInviteTemplate,
  passkeyManagementTemplate,
  profileSettingsTemplate,
  passwordResetTemplate,
  changePasswordTemplate,
  contactFormTemplate,
  newsletterFormTemplate,
  addressFormTemplate,
  jobApplicationTemplate,
  feedbackFormTemplate,
  eventRegistrationTemplate,
  waitlistTemplate,
  supportTicketTemplate,
  bookingRequestTemplate,
  ecommerceCheckoutTemplate,
  onboardingWizardTemplate,
  detailedApplicationTemplate,
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
export * from "./onboarding-wizard";
export * from "./detailed-application";
export * from "./two-factor-setup-template";
export * from "./organization-invite-template";
export * from "./passkey-management-template";
export * from "./two-factor-setup";
export * from "./organization-switcher";
export * from "./passkey-management";
export * from "./profile-settings";
export * from "./password-reset";
export * from "./change-password";
export * from "./address-form";

