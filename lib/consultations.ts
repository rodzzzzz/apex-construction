import { z } from "zod";
import { austinToday } from "@/lib/dates";

export const TIME_OPTIONS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export const PROJECT_TYPE_OPTIONS = [
  { value: "none", label: "General inquiry" },
  { value: "custom-home", label: "Custom home" },
  { value: "remodel", label: "Remodel" },
  { value: "commercial", label: "Commercial build" },
  { value: "addition", label: "Addition or ADU" },
  { value: "repair", label: "Repair or restoration" },
  { value: "other", label: "Other" },
] as const;

export const consultationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z.string().trim().min(7, "Enter a phone number.").max(40),
  date: z
    .string()
    .trim()
    .min(1, "Choose a date.")
    .refine(
      (value) => value >= austinToday(),
      "Choose a date from today onward.",
    ),
  time: z.enum(TIME_OPTIONS, { message: "Choose a time." }),
  projectType: z.enum([
    "none",
    "custom-home",
    "remodel",
    "commercial",
    "addition",
    "repair",
    "other",
  ]),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
