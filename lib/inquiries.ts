import { z } from "zod";
import { austinToday } from "@/lib/dates";

export const projectInquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  targetDate: z
    .string()
    .trim()
    .min(1, "Choose a target start date.")
    .refine(
      (value) => value >= austinToday(),
      "Choose a date from today onward.",
    ),
  approxSqFt: z.coerce
    .number()
    .int()
    .min(100, "Enter at least 100 sq ft.")
    .max(100000),
  homeType: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type ProjectInquiryValues = z.infer<typeof projectInquirySchema>;
