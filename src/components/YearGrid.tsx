import type { Holiday } from "@/data/holidays";
import { occurrenceInYear } from "@/lib/dates";
import { getStrings, type Locale } from "@/i18n";

/**
 * Static year-at-a-glance poster: 12 mini-months per year with holiday days
 * marked by each holiday's theme color. Server-rendered (no JS needed) so it
 * doubles as the printable annual calendar via the existing print stylesheet.
 */
export default function YearGrid({
  locale,
  holidays,
  year,
}: {
  locale: Locale;
  holidays: Holiday[];
  year: number;
}) {
  const t = getStrings(locale);
  const byDay = new Map<string, Holiday[]>();
  for (const h of holidays) {
    const d = occurrenceInYear(h.rule, year);
    const key = `${d.getMonth()}-${d.getDate()}`;
    const list = byDay.get(key) ?? [];
    list.push(h);
    byDay.set(key, list);
  }

  return (
    <section aria-labelledby={`year-grid-${year}`}>
      <h3
        id={`year-grid-${year}`}
        className="font-display text-lg font-extrabold text-[var(--color-ink)]"
      >
        {t.calendar.yearTitle(year)}
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 print:grid-cols-4 print:gap-2">
        {Array.from({ length: 12 }, (_, m) => {
          const first = new Date(year, m, 1);
          const dim = new Date(year, m + 1, 0).getDate();
          const lead = first.getDay();
          return (
            <table key={m} className="w-full border-collapse print:break-inside-avoid">
              <caption className="pb-1 text-left text-xs font-bold text-[var(--color-ink)]">
                {t.calendar.monthTitle(m + 1, year)}
              </caption>
              <thead>
                <tr>
                  {t.calendar.weekdays.map((w) => (
                    <th
                      key={w}
                      className="pb-0.5 text-center text-[9px] font-semibold text-[var(--color-faint)]"
                    >
                      {w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  { length: Math.ceil((lead + dim) / 7) },
                  (_, row) => (
                    <tr key={row}>
                      {Array.from({ length: 7 }, (_, col) => {
                        const day = row * 7 + col - lead + 1;
                        if (day < 1 || day > dim) return <td key={col} />;
                        const hols = byDay.get(`${m}-${day}`) ?? [];
                        const names = hols.map((h) => h.name).join(", ");
                        return (
                          <td
                            key={col}
                            title={names || undefined}
                            className="text-center text-[10px] leading-4 text-[var(--color-muted)]"
                          >
                            {hols.length > 0 ? (
                              <span
                                className="inline-block min-w-4 rounded font-bold"
                                style={{ color: hols[0].theme.from }}
                              >
                                {day}
                              </span>
                            ) : (
                              day
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          );
        })}
      </div>
    </section>
  );
}
