import type { ServerProps } from "payload";
import { NavHamburger, NavWrapper } from "@payloadcms/next/client";
import { AdminLogo } from "@/components/admin/logo";
import { StaffNavClient } from "@/components/admin/nav-client";
import { emptyLeadCounts, LEAD_LINKS } from "@/lib/staff";

export async function StaffNav({ payload }: ServerProps) {
  const counts = emptyLeadCounts();

  if (payload) {
    try {
      const results = await Promise.all(
        LEAD_LINKS.map((item) =>
          payload.find({
            collection: item.slug,
            limit: 1,
            where: { status: { equals: item.status } },
          }),
        ),
      );
      LEAD_LINKS.forEach((item, index) => {
        counts[item.slug] = results[index]?.totalDocs ?? 0;
      });
    } catch {
      Object.assign(counts, emptyLeadCounts());
    }
  }

  return (
    <NavWrapper baseClass="nav">
      <nav className="nav__wrap apex-nav" aria-label="Apex Team">
        <div className="apex-nav__brand">
          <AdminLogo />
        </div>
        <StaffNavClient counts={counts} />
      </nav>
      <div className="nav__header">
        <div className="nav__header-content">
          <NavHamburger baseClass="nav" />
        </div>
      </div>
    </NavWrapper>
  );
}
