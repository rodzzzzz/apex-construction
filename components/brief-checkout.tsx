"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormSuccess, fieldControlProps } from "@/components/form-field";
import { FormPanel } from "@/components/form-panel";
import { QuantityControl } from "@/components/stepper";
import { briefTotal, useBrief } from "@/lib/brief";
import { formatUsd } from "@/lib/utils";
import {
  PROJECT_STAGE_OPTIONS,
  quoteFormSchema,
  type QuoteFormValues,
} from "@/lib/quotes";

export default function BriefCheckout() {
  const { items, setQuantity, removeItem, clear } = useBrief();
  const [projectStage, setProjectStage] =
    useState<QuoteFormValues["projectStage"]>("planning");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof QuoteFormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{
    name: string;
    email: string;
    total: number;
  } | null>(null);

  const total = briefTotal(items);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = quoteFormSchema.safeParse({
      name,
      email,
      phone,
      projectStage,
      address,
      notes,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });

    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof QuoteFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuoteFormValues | undefined;
        if (key) nextErrors[key] = issue.message;
      }
      setFieldErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        toast.error(data.error ?? "Could not send your quote request.");
        return;
      }
      toast.success(
        "Brief received. We will respond with a detailed estimate.",
      );
      setSubmitted({
        name: parsed.data.name,
        email: parsed.data.email,
        total: briefTotal(items),
      });
      clear();
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setNotes("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <FormSuccess
        title="Your brief is with our estimating team"
        resetLabel="Start another brief"
        onReset={() => setSubmitted(null)}
      >
        <p>
          Thank you, {submitted.name}. Starting estimate of{" "}
          {formatUsd(submitted.total)}.
        </p>
        <p>
          We will email {submitted.email} within one business day to schedule a
          site walk and firm up the numbers.
        </p>
      </FormSuccess>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-amber">
          Quote builder
        </p>
        <p className="mt-5 font-serif text-3xl font-bold md:text-4xl">
          Your brief is empty
        </p>
        <p className="mx-auto mt-4 max-w-sm text-lg text-muted-foreground">
          Add services from the catalog, then open the brief to request your
          quote.
        </p>
        <Button asChild variant="amber" size="lg" className="mt-8">
          <Link href="/services">Browse services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 border-b border-border py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-serif text-xl font-bold">{item.name}</p>
              <p className="text-sm text-amber">
                from {formatUsd(item.unitPrice)}
              </p>
            </div>
            <QuantityControl
              quantity={item.quantity}
              onDecrease={() => setQuantity(item.id, item.quantity - 1)}
              onIncrease={() => setQuantity(item.id, item.quantity + 1)}
              onRemove={() => removeItem(item.id)}
            />
          </div>
        ))}
        <p className="text-right font-serif text-2xl font-bold">
          Estimate <span className="text-amber">{formatUsd(total)}</span>
        </p>
        <p className="text-right text-sm text-muted-foreground">
          A starting point only — final pricing is set after a site walk.
        </p>
      </div>
      <FormPanel
        kicker="Details"
        title="Project & contact"
        description="Tell us about the site and where you are in the process."
      >
        <form onSubmit={onSubmit} className="grid gap-5">
          <fieldset disabled={isSubmitting} className="grid gap-5">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {PROJECT_STAGE_OPTIONS.map((option) => {
                const isSelected = projectStage === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setProjectStage(option.value)}
                    className={`flex h-11 items-center justify-center border px-1.5 text-center font-mono text-[10px] leading-tight uppercase tracking-[0.08em] transition-colors duration-500 sm:px-2 ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-amber"
                    }`}
                  >
                    {option.label
                      .replace(" & budgeting", "")
                      .replace(" in progress", "")}
                  </button>
                );
              })}
            </div>
            <Field
              id="quote-name"
              label="Name"
              error={fieldErrors.name}
              required
            >
              <Input
                {...fieldControlProps("quote-name", fieldErrors.name)}
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Field
              id="quote-email"
              label="Email"
              error={fieldErrors.email}
              required
            >
              <Input
                {...fieldControlProps("quote-email", fieldErrors.email)}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
            <Field
              id="quote-phone"
              label="Phone"
              error={fieldErrors.phone}
              required
            >
              <Input
                {...fieldControlProps("quote-phone", fieldErrors.phone)}
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Field>
            <Field
              id="quote-address"
              label="Project address"
              error={fieldErrors.address}
              required
            >
              <Textarea
                {...fieldControlProps("quote-address", fieldErrors.address)}
                autoComplete="street-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Field>
            <Field
              id="quote-notes"
              label="Notes"
              error={fieldErrors.notes}
              optional
            >
              <Textarea
                {...fieldControlProps("quote-notes", fieldErrors.notes)}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </Field>
          </fieldset>
          {fieldErrors.items ? (
            <p className="text-sm text-destructive">{fieldErrors.items}</p>
          ) : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Request quote
          </Button>
        </form>
      </FormPanel>
    </div>
  );
}
