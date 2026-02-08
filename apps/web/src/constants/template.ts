import type { CategoriesMap, TemplateCategory } from "@/types/templates";
import { Blocks, Shield, Mail, ShoppingCart, User } from "lucide-react";


export const CATEGORIES: CategoriesMap = {
    all: { 
      label: "All Templates", 
      icon: Blocks,
      description: "Browse all available templates"
    },
    auth: { 
      label: "Authentication", 
      icon: Shield,
      description: "Login, signup, and auth forms"
    },
    contact: { 
      label: "Contact & Forms", 
      icon: Mail,
      description: "Contact, feedback, and general forms"
    },
    ecommerce: { 
      label: "E-commerce", 
      icon: ShoppingCart,
      description: "Checkout and payment forms"
    },
    profile: { 
      label: "Profile & Settings", 
      icon: User,
      description: "User profile and settings forms"
    },
  } as const;
  
  // Category detection patterns
  export const CATEGORY_PATTERNS: Record<TemplateCategory, string[]> = {
    auth: ["login", "signup", "auth", "password", "factor", "passkey"],
    profile: ["profile", "settings", "organization"],
    ecommerce: ["checkout", "payment", "ecommerce"],
    contact: ["contact", "newsletter", "feedback", "support", "application", "booking", "event", "waitlist", "address"],
    all: [],
  };
  