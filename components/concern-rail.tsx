import Image from "next/image";
import Link from "next/link";
import { ALL_CONCERN, ALL_TILE, CONCERNS, concernImage } from "@/lib/concerns";
import type { ProductSummary } from "@/lib/store-types";

/**
 * The visual rail above the grid.
 *
 * Tiles are links rather than client-side filter buttons so each concern has a
 * shareable URL and works before hydration — the grid is server-rendered from
 * the same query, so there is no second source of truth for what is selected.
 */
export function ConcernRail({
  selected,
  products,
}: {
  selected: string;
  products: ProductSummary[];
}) {
  const tiles = [
    ALL_TILE,
    ...CONCERNS.map((concern) => ({
      ...concern,
      image: concernImage(concern, products),
    })),
  ];

  return (
    <nav className="concern-rail" aria-label="Shop by concern">
      <ul>
        {tiles.map((tile) => {
          const isSelected =
            tile.id === selected || (tile.id === ALL_CONCERN && !selected);

          return (
            <li key={tile.id}>
              <Link
                className={`concern-tile${isSelected ? " is-selected" : ""}`}
                href={
                  tile.id === ALL_CONCERN ? "/shop" : `/shop?concern=${tile.id}`
                }
                aria-current={isSelected ? "true" : undefined}
                scroll={false}
              >
                <span className="concern-tile__image">
                  {tile.image ? (
                    <Image
                      src={tile.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 38vw, 13vw"
                    />
                  ) : null}
                  <span className="concern-tile__label">{tile.label}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
