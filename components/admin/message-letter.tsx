"use client";

import { useField } from "@payloadcms/ui";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase();
}

function isFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function MessageLetter() {
  const name = useField<string>({ path: "name" });
  const email = useField<string>({ path: "email" });
  const phone = useField<string>({ path: "phone" });
  const message = useField<string>({ path: "message" });
  const isComposer =
    !isFilled(name.initialValue) && !isFilled(message.initialValue);

  const nameValue = name.value?.trim() ?? "";
  const emailValue = email.value?.trim() ?? "";
  const phoneValue = phone.value?.trim() ?? "";
  const messageValue = message.value?.trim() ?? "";
  const replyHref = emailValue
    ? `mailto:${emailValue}?subject=${encodeURIComponent("Re: your message to Apex Construction")}`
    : null;

  return (
    <article className="apex-letter">
      <header className="apex-letter__head">
        <p className="apex-letter__kicker">From the contact form</p>
        <div className="apex-letter__from">
          <span className="apex-letter__mark" aria-hidden="true">
            {initials(nameValue)}
          </span>
          <div className="apex-letter__identity">
            {isComposer ? (
              <label className="apex-letter__label">
                Name
                <input
                  className="apex-letter__input apex-letter__input--name"
                  value={name.value ?? ""}
                  onChange={(event) => name.setValue(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
            ) : (
              <h2 className="apex-letter__name">{nameValue || "Sender"}</h2>
            )}
            <p className="apex-letter__role">Website message</p>
          </div>
        </div>
      </header>

      <dl className="apex-letter__meta">
        <div>
          <dt>Email</dt>
          <dd>
            {isComposer ? (
              <input
                className="apex-letter__input"
                type="email"
                value={email.value ?? ""}
                onChange={(event) => email.setValue(event.target.value)}
                autoComplete="email"
                required
              />
            ) : emailValue ? (
              <a href={`mailto:${emailValue}`}>{emailValue}</a>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            {isComposer ? (
              <input
                className="apex-letter__input"
                type="tel"
                value={phone.value ?? ""}
                onChange={(event) => phone.setValue(event.target.value)}
                autoComplete="tel"
              />
            ) : phoneValue ? (
              <a href={`tel:${phoneValue}`}>{phoneValue}</a>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>

      <div className="apex-letter__body">
        {isComposer ? (
          <label className="apex-letter__label">
            Message
            <textarea
              className="apex-letter__textarea"
              value={message.value ?? ""}
              onChange={(event) => message.setValue(event.target.value)}
              rows={6}
              required
            />
          </label>
        ) : (
          <blockquote>
            {messageValue ? (
              messageValue
                .split("\n")
                .map((line, index) => <p key={index}>{line || "\u00a0"}</p>)
            ) : (
              <p className="apex-letter__empty">No message was included.</p>
            )}
          </blockquote>
        )}
      </div>

      {!isComposer && (replyHref || phoneValue) ? (
        <footer className="apex-letter__actions">
          {replyHref ? (
            <a className="apex-letter__action" href={replyHref}>
              Reply by email
            </a>
          ) : null}
          {phoneValue ? (
            <a className="apex-letter__action" href={`tel:${phoneValue}`}>
              Call
            </a>
          ) : null}
        </footer>
      ) : null}
    </article>
  );
}

export function MessageExcerpt({ cellData }: { cellData?: string | null }) {
  if (!cellData) return null;
  return (
    <span className="apex-message-excerpt">
      {cellData.replace(/\s+/g, " ").trim()}
    </span>
  );
}
