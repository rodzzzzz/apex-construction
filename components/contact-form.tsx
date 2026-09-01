"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormSuccess, fieldControlProps } from "@/components/form-field";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact";

const EMPTY: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ContactFormValues | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues | undefined;
        if (key) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(data.error ?? "Could not send your message.");
        return;
      }
      toast.success("Thank you. We will be in touch shortly.");
      setSubmitted(parsed.data);
      setValues(EMPTY);
      setFieldErrors({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <FormSuccess
        title="Your message is with our team"
        resetLabel="Send another message"
        onReset={() => setSubmitted(null)}
      >
        <p>
          Thank you, {submitted.name}. We will reply to {submitted.email} within
          one business day.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <fieldset disabled={isSubmitting} className="grid gap-5">
        <Field id="contact-name" label="Name" error={fieldErrors.name} required>
          <Input
            {...fieldControlProps("contact-name", fieldErrors.name)}
            autoComplete="name"
            value={values.name}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </Field>
        <Field
          id="contact-email"
          label="Email"
          error={fieldErrors.email}
          required
        >
          <Input
            {...fieldControlProps("contact-email", fieldErrors.email)}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
        </Field>
        <Field
          id="contact-phone"
          label="Phone"
          error={fieldErrors.phone}
          optional
        >
          <Input
            {...fieldControlProps("contact-phone", fieldErrors.phone)}
            type="tel"
            autoComplete="tel"
            value={values.phone ?? ""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, phone: event.target.value }))
            }
          />
        </Field>
        <Field
          id="contact-message"
          label="Message"
          error={fieldErrors.message}
          required
        >
          <Textarea
            {...fieldControlProps("contact-message", fieldErrors.message)}
            value={values.message}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, message: event.target.value }))
            }
          />
        </Field>
      </fieldset>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Send message
      </Button>
    </form>
  );
}
