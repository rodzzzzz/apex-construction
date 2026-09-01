"use client";

import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FormSuccess, fieldControlProps } from "@/components/form-field";
import { austinToday } from "@/lib/dates";
import {
  PROJECT_TYPE_OPTIONS,
  TIME_OPTIONS,
  consultationFormSchema,
  type ConsultationFormValues,
} from "@/lib/consultations";

const EMPTY: ConsultationFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "09:00",
  projectType: "none",
  notes: "",
};

export default function ConsultationForm() {
  const [values, setValues] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ConsultationFormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<ConsultationFormValues | null>(
    null,
  );
  const minDate = useMemo(() => austinToday(), []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = consultationFormSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ConsultationFormValues, string>> =
        {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ConsultationFormValues | undefined;
        if (key) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await fetch("/api/consultation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(data.error ?? "Could not send your request.");
        return;
      }
      toast.success("Request received. We will confirm by email.");
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
    const projectType =
      PROJECT_TYPE_OPTIONS.find(
        (option) => option.value === submitted.projectType,
      )?.label ?? submitted.projectType;
    return (
      <FormSuccess
        title="We have your consultation request"
        resetLabel="Request another time"
        onReset={() => setSubmitted(null)}
      >
        <p>
          {submitted.name} · {submitted.date} at {submitted.time}
        </p>
        {submitted.projectType !== "none" ? <p>{projectType}</p> : null}
        <p>
          This is not yet a confirmation. We will email {submitted.email} within
          one business day to confirm the slot.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <fieldset disabled={isSubmitting} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="consultation-name"
            label="Name"
            error={fieldErrors.name}
            required
          >
            <Input
              {...fieldControlProps("consultation-name", fieldErrors.name)}
              autoComplete="name"
              value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </Field>
          <Field
            id="consultation-email"
            label="Email"
            error={fieldErrors.email}
            required
          >
            <Input
              {...fieldControlProps("consultation-email", fieldErrors.email)}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </Field>
          <Field
            id="consultation-phone"
            label="Phone"
            error={fieldErrors.phone}
            required
          >
            <Input
              {...fieldControlProps("consultation-phone", fieldErrors.phone)}
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </Field>
          <Field
            id="consultation-project-type"
            label="Project type"
            error={fieldErrors.projectType}
            required
          >
            <Select
              value={values.projectType}
              onValueChange={(projectType) =>
                setValues((prev) => ({
                  ...prev,
                  projectType:
                    projectType as ConsultationFormValues["projectType"],
                }))
              }
            >
              <SelectTrigger id="consultation-project-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field
            id="consultation-date"
            label="Preferred date"
            error={fieldErrors.date}
            required
          >
            <Input
              {...fieldControlProps("consultation-date", fieldErrors.date)}
              type="date"
              min={minDate}
              value={values.date}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, date: event.target.value }))
              }
            />
          </Field>
          <Field
            id="consultation-time"
            label="Preferred time"
            error={fieldErrors.time}
            required
          >
            <Select
              value={values.time}
              onValueChange={(time) =>
                setValues((prev) => ({
                  ...prev,
                  time: time as ConsultationFormValues["time"],
                }))
              }
            >
              <SelectTrigger
                id="consultation-time"
                aria-invalid={Boolean(fieldErrors.time)}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_OPTIONS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field
          id="consultation-notes"
          label="Project notes"
          error={fieldErrors.notes}
          optional
        >
          <Textarea
            {...fieldControlProps("consultation-notes", fieldErrors.notes)}
            value={values.notes ?? ""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, notes: event.target.value }))
            }
          />
        </Field>
      </fieldset>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Request consultation
      </Button>
    </form>
  );
}
