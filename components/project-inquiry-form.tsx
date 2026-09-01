"use client";

import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormSuccess, fieldControlProps } from "@/components/form-field";
import { Stepper } from "@/components/stepper";
import { austinToday } from "@/lib/dates";
import {
  projectInquirySchema,
  type ProjectInquiryValues,
} from "@/lib/inquiries";

const SQFT_STEP = 100;

const EMPTY: ProjectInquiryValues = {
  name: "",
  email: "",
  phone: "",
  targetDate: "",
  approxSqFt: 2500,
  homeType: "",
  message: "",
};

export default function ProjectInquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ProjectInquiryValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ProjectInquiryValues | null>(null);
  const minDate = useMemo(() => austinToday(), []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = projectInquirySchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ProjectInquiryValues, string>> =
        {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ProjectInquiryValues | undefined;
        if (key) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(data.error ?? "Could not send your inquiry.");
        return;
      }
      toast.success(
        "Received. Our team will follow up within one business day.",
      );
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
        title="Your inquiry is with our team"
        resetLabel="Send another inquiry"
        onReset={() => setSubmitted(null)}
      >
        <p>
          {submitted.name} · target start {submitted.targetDate} ·{" "}
          {submitted.approxSqFt.toLocaleString()} sq ft
        </p>
        {submitted.homeType ? <p>{submitted.homeType}</p> : null}
        <p>We will email {submitted.email} within one business day.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <fieldset disabled={isSubmitting} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="inquiry-name"
            label="Name"
            error={fieldErrors.name}
            required
          >
            <Input
              {...fieldControlProps("inquiry-name", fieldErrors.name)}
              autoComplete="name"
              value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </Field>
          <Field
            id="inquiry-email"
            label="Email"
            error={fieldErrors.email}
            required
          >
            <Input
              {...fieldControlProps("inquiry-email", fieldErrors.email)}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </Field>
          <Field
            id="inquiry-phone"
            label="Phone"
            error={fieldErrors.phone}
            required
          >
            <Input
              {...fieldControlProps("inquiry-phone", fieldErrors.phone)}
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </Field>
          <Field
            id="inquiry-sqft"
            label="Approximate square feet"
            error={fieldErrors.approxSqFt}
            required
          >
            <Stepper
              id="inquiry-sqft"
              value={values.approxSqFt}
              min={100}
              max={50000}
              step={SQFT_STEP}
              onChange={(approxSqFt) =>
                setValues((prev) => ({ ...prev, approxSqFt }))
              }
              disabled={isSubmitting}
            />
          </Field>
          <Field
            id="inquiry-date"
            label="Target start"
            error={fieldErrors.targetDate}
            required
          >
            <Input
              {...fieldControlProps("inquiry-date", fieldErrors.targetDate)}
              type="date"
              min={minDate}
              value={values.targetDate}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  targetDate: event.target.value,
                }))
              }
            />
          </Field>
          <Field
            id="inquiry-type"
            label="Project type"
            error={fieldErrors.homeType}
            optional
          >
            <Input
              {...fieldControlProps("inquiry-type", fieldErrors.homeType)}
              placeholder="Modern farmhouse, hillside home…"
              value={values.homeType ?? ""}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, homeType: event.target.value }))
              }
            />
          </Field>
        </div>
        <Field
          id="inquiry-message"
          label="Details"
          error={fieldErrors.message}
          optional
        >
          <Textarea
            {...fieldControlProps("inquiry-message", fieldErrors.message)}
            value={values.message ?? ""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, message: event.target.value }))
            }
          />
        </Field>
      </fieldset>
      <Button
        type="submit"
        variant="amber"
        className="mt-2 w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Start the conversation
      </Button>
    </form>
  );
}
