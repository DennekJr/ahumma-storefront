"use client";

import Image from "next/image";
import Link from "next/link";
import { ALL_CONCERN, ALL_TILE, CONCERNS, concernImage } from "@/lib/concerns";
import type { ProductSummary } from "@/lib/store-types";

/**
 * The visual rail above the grid.
 *
 * Tile selection updates the shop's client-side query state without waiting
 * for another server render.
 */
export function ConcernRail({
  selected,
  products,
  onSelectAction,
}: {
  selected: string;
  products: ProductSummary[];
  onSelectAction?: (id: string) => void;
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

          const className = `concern-tile${isSelected ? " is-selected" : ""}`;
          const content = (
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
          );

          return (
            <li key={tile.id}>
              {onSelectAction ? (
                <button
                  type="button"
                  className={className}
                  aria-pressed={isSelected}
                  onClick={() => onSelectAction(tile.id)}
                >
                  {content}
                </button>
              ) : (
                <Link
                  className={className}
                  href={
                    tile.id === ALL_CONCERN
                      ? "/shop"
                      : `/shop?concern=${tile.id}`
                  }
                  aria-current={isSelected ? "true" : undefined}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
