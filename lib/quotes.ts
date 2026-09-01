import { z } from "zod";

export const briefItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
  unitPrice: z.number().min(0),
});

export const quoteFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100),
    email: z.string().trim().email("Enter a valid email address.").max(200),
    phone: z.string().trim().min(7, "Enter a phone number.").max(40),
    projectStage: z.enum(["planning", "ready", "design"]),
    address: z.string().trim().max(400).optional().or(z.literal("")),
    notes: z.string().trim().max(2000).optional().or(z.literal("")),
    items: z.array(briefItemSchema).min(1, "Add at least one service."),
  })
  .superRefine((data, ctx) => {
    if (!data.address?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["address"],
        message: "Enter the project address or site location.",
      });
    }
  });

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const PROJECT_STAGE_OPTIONS = [
  { value: "planning", label: "Planning & budgeting" },
  { value: "design", label: "Design in progress" },
  { value: "ready", label: "Ready to build" },
] as const;
