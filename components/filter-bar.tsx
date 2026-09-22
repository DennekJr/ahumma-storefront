"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { SORTS, type Facet, type FacetId } from "@/lib/shop-filters";

/**
 * Filter chips and sort, as the reference lays them out: a left-aligned row of
 * chips that open panels, with sort pushed to the right.
 *
 * The URL is the single source of truth. Every change is a router push, the
 * server re-filters, and this component holds no copy of the result — so a
 * filtered page is shareable, survives reload, and cannot disagree with the
 * grid it sits above.
 */
export function FilterBar({
  facets,
  total,
}: {
  facets: Facet[];
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [openPanel, setOpenPanel] = useState<FacetId | "sort" | "all" | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // A panel left open while the pointer moves elsewhere is a panel in the way.
  useEffect(() => {
    if (!openPanel) return;

    function onPointerDown(event: MouseEvent) {
      if (!barRef.current?.contains(event.target as Node)) setOpenPanel(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPanel(null);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openPanel]);

  const selected = (id: FacetId) => params.get(id)?.split(",").filter(Boolean) ?? [];
  const activeCount = facets.reduce((sum, facet) => sum + selected(facet.id).length, 0);
  const currentSort = params.get("sort") ?? "recommended";

  function push(next: URLSearchParams) {
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggle(id: FacetId, value: string) {
    const next = new URLSearchParams(params.toString());
    const current = selected(id);
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    if (updated.length) next.set(id, updated.join(","));
    else next.delete(id);
    push(next);
  }

  function setSort(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "recommended") next.delete("sort");
    else next.set("sort", value);
    push(next);
    setOpenPanel(null);
  }

  function clearAll() {
    const next = new URLSearchParams(params.toString());
    facets.forEach((facet) => next.delete(facet.id));
    push(next);
    setOpenPanel(null);
  }

  if (!facets.length) return null;

  return (
    <div className="filter-bar" ref={barRef}>
      <div className="filter-bar__chips">
        {facets.map((facet) => {
          const chosen = selected(facet.id);
          return (
            <div className="filter-chip-wrap" key={facet.id}>
              <button
                type="button"
                className={`filter-chip${chosen.length ? " is-active" : ""}`}
                aria-expanded={openPanel === facet.id}
                onClick={() => setOpenPanel(openPanel === facet.id ? null : facet.id)}
              >
                {facet.label}
                {chosen.length ? <em>{chosen.length}</em> : null}
                <ChevronDown size={13} />
              </button>
              {openPanel === facet.id ? (
                <div className="filter-panel" role="group" aria-label={facet.label}>
                  {facet.options.map((option) => (
                    <label className="filter-option" key={option.value}>
                      <input
                        type="checkbox"
                        checked={chosen.includes(option.value)}
                        onChange={() => toggle(facet.id, option.value)}
                      />
                      <span className="filter-option__box" aria-hidden="true">
                        <Check size={12} />
                      </span>
                      <span>{option.label}</span>
                      <small>{option.count}</small>
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="filter-chip-wrap">
          <button
            type="button"
            className={`filter-chip${activeCount ? " is-active" : ""}`}
            aria-expanded={openPanel === "all"}
            onClick={() => setOpenPanel(openPanel === "all" ? null : "all")}
          >
            <SlidersHorizontal size={13} /> All filters
            {activeCount ? <em>{activeCount}</em> : null}
          </button>
          {openPanel === "all" ? (
            <div className="filter-panel filter-panel--all" role="group" aria-label="All filters">
              {facets.map((facet) => (
                <div className="filter-panel__group" key={facet.id}>
                  <span>{facet.label}</span>
                  {facet.options.map((option) => (
                    <label className="filter-option" key={option.value}>
                      <input
                        type="checkbox"
                        checked={selected(facet.id).includes(option.value)}
                        onChange={() => toggle(facet.id, option.value)}
                      />
                      <span className="filter-option__box" aria-hidden="true">
                        <Check size={12} />
                      </span>
                      <span>{option.label}</span>
                      <small>{option.count}</small>
                    </label>
                  ))}
                </div>
              ))}
              {activeCount ? (
                <button type="button" className="filter-clear" onClick={clearAll}>
                  Clear all <X size={13} />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        {activeCount ? (
          <button type="button" className="filter-reset" onClick={clearAll}>
            Clear <X size={12} />
          </button>
        ) : null}
      </div>

      <div className="filter-bar__sort">
        <span className="filter-bar__count">{total} items</span>
        <div className="filter-chip-wrap">
          <button
            type="button"
            className="filter-sort"
            aria-expanded={openPanel === "sort"}
            onClick={() => setOpenPanel(openPanel === "sort" ? null : "sort")}
          >
            Sort by:{" "}
            <strong>{SORTS.find((s) => s.value === currentSort)?.label}</strong>
            <ChevronDown size={13} />
          </button>
          {openPanel === "sort" ? (
            <div className="filter-panel filter-panel--right" role="group" aria-label="Sort by">
              {SORTS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`filter-option filter-option--sort${
                    option.value === currentSort ? " is-selected" : ""
                  }`}
                  onClick={() => setSort(option.value)}
                >
                  {option.label}
                  {option.value === currentSort ? <Check size={13} /> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
