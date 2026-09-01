import Link from "next/link";
import type { AdminViewServerProps } from "payload";
import { Gutter } from "@payloadcms/ui";
import {
  formatClockTime,
  formatStaffDate,
  austinDayRange,
  staffGreeting,
} from "@/lib/dates";
import {
  emptyLeadCounts,
  LEAD_LINKS,
  pendingListHref,
  staffGivenName,
} from "@/lib/staff";

const WEBSITE_SHORTCUTS = [
  {
    href: "/admin/collections/services",
    label: "Services",
    copy: "Scopes, prices, and availability",
  },
  {
    href: "/admin/globals/site-settings",
    label: "Hours & contact",
    copy: "Name, hours, address, and socials",
  },
  {
    href: "/admin/collections/projects",
    label: "Projects",
    copy: "Residential, commercial, industrial",
  },
] as const;

export async function StaffHome({ payload, user }: AdminViewServerProps) {
  const counts = emptyLeadCounts();
  let todayConsultations = 0;
  let todayBook: {
    id: number;
    name: string;
    time: string;
    projectType: string;
    status: string;
  }[] = [];
  try {
    const { start, end } = austinDayRange();
    const [queueResults, today] = await Promise.all([
      Promise.all(
        LEAD_LINKS.map((item) =>
          payload.find({
            collection: item.slug,
            limit: 1,
            where: { status: { equals: item.status } },
          }),
        ),
      ),
      payload.find({
        collection: "consultations",
        limit: 12,
        sort: "time",
        where: {
          and: [
            { date: { greater_than_equal: start } },
            { date: { less_than: end } },
            { status: { not_equals: "cancelled" } },
          ],
        },
      }),
    ]);

    LEAD_LINKS.forEach((item, index) => {
      counts[item.slug] = queueResults[index]?.totalDocs ?? 0;
    });
    todayConsultations = today.totalDocs;
    todayBook = today.docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      time: doc.time,
      projectType: doc.projectType ?? "none",
      status: doc.status,
    }));
  } catch {
    Object.assign(counts, emptyLeadCounts());
  }

  const name = staffGivenName(
    user && "email" in user ? String(user.email) : null,
  );
  const greeting = name
    ? `${staffGreeting()}, ${name}`
    : `${staffGreeting()} from Apex`;

  return (
    <Gutter className="apex-home">
      <header className="apex-home__intro">
        <p className="apex-home__kicker">{formatStaffDate()}</p>
        <h1 className="apex-home__title">{greeting}</h1>
        <p className="apex-home__copy">
          {todayConsultations === 0
            ? "No consultations on the schedule today"
            : `${todayConsultations} consultation${todayConsultations === 1 ? "" : "s"} on the schedule today`}
        </p>
      </header>

      <section className="apex-home__section" aria-labelledby="apex-attention">
        <h2 id="apex-attention" className="apex-home__heading">
          Needs attention
        </h2>
        <nav className="apex-home__queues">
          {LEAD_LINKS.map((item) => {
            const count = counts[item.slug];
            return (
              <Link
                key={item.slug}
                href={pendingListHref(item.slug, item.status)}
                className="apex-home__queue"
              >
                <span className="apex-home__count">{count}</span>
                <span className="apex-home__queue-label">
                  {count === 1 ? item.noun : `${item.noun}s`}
                </span>
              </Link>
            );
          })}
        </nav>
      </section>

      <section className="apex-home__section" aria-labelledby="apex-book">
        <div className="apex-home__section-head">
          <h2 id="apex-book" className="apex-home__heading">
            Today&apos;s schedule
          </h2>
          <Link
            className="apex-home__more"
            href="/admin/collections/consultations"
          >
            All consultations
          </Link>
        </div>
        {todayBook.length === 0 ? (
          <p className="apex-home__empty">The schedule is clear for today.</p>
        ) : (
          <ul className="apex-book">
            {todayBook.map((row) => (
              <li key={row.id}>
                <Link
                  className="apex-book__row"
                  href={`/admin/collections/consultations/${row.id}`}
                >
                  <span className="apex-book__time">
                    {formatClockTime(row.time)}
                  </span>
                  <span className="apex-book__name">{row.name}</span>
                  <span className="apex-book__party">{row.projectType}</span>
                  <span className={`apex-status apex-status--${row.status}`}>
                    {row.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="apex-home__section" aria-labelledby="apex-website">
        <h2 id="apex-website" className="apex-home__heading">
          Website
        </h2>
        <nav className="apex-home__shortcuts">
          {WEBSITE_SHORTCUTS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="apex-home__shortcut"
            >
              <span className="apex-home__shortcut-label">{item.label}</span>
              <span className="apex-home__shortcut-copy">{item.copy}</span>
            </Link>
          ))}
        </nav>
      </section>
    </Gutter>
  );
}
