import Image from "next/image";
import type { ProductInfo } from "@/lib/store-types";

type DescriptionBlock = NonNullable<ProductInfo["descriptionBlocks"]>[number];

/**
 * Renders `info.descriptionBlocks` — FrontDesk's ordered rich list of text and
 * image blocks, shown after the prose in `longDescription`.
 *
 * The API may add block kinds later, so anything unrecognised that still
 * carries text falls back to a paragraph rather than vanishing. Blocks are
 * sorted by `sort` because array order is not guaranteed to be display order.
 */
export function ProductDescriptionBlocks({
  blocks,
}: {
  blocks: DescriptionBlock[];
}) {
  const ordered = [...blocks].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  return (
    <div className="product-blocks">
      {ordered.map((block) => {
        if (block.kind === "image" && block.url) {
          return (
            <figure
              className={`product-block product-block--image product-block--${block.width ?? "full"}`}
              key={block.id}
            >
              <Image
                src={block.url}
                alt={block.alt ?? ""}
                width={1200}
                height={900}
                sizes="(max-width: 850px) 100vw, 60vw"
              />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        if (!block.text) return null;

        return (
          <div className="product-block product-block--text" key={block.id}>
            {block.text
              .split(/\n{2,}/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        );
      })}
    </div>
  );
}
