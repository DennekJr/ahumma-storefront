import type { ProductInfo } from "@/lib/store-types";

export type DetailRow = { label: string; value: string };

/**
 * Builds the product Details table.
 *
 * The FrontDesk docs specify this table as `info.specs` ({label, value}[])
 * combined with brand, modelName, manufacturer, countryOfOrigin and sku. Rows
 * with no value are dropped so a sparsely filled product shows a short table
 * rather than a list of blanks — and none at all when nothing is set.
 *
 * Merchant-authored specs come first: they are the product-specific facts
 * (scent profile, ingredients, suitability), and the fixed fields are
 * catalogue metadata.
 */
export function buildDetailRows(info: ProductInfo | null | undefined) {
  if (!info) return [];

  const specRows = [...(info.specs ?? [])]
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((spec) => ({
      label: spec.label,
      value: [spec.value, spec.unit].filter(Boolean).join(" ").trim(),
    }));

  const weight =
    info.weightValue != null
      ? [info.weightValue, info.weightUnit].filter(Boolean).join(" ").trim()
      : "";

  // llms.txt: warranty is warrantyText, or "N months" from warrantyMonths.
  const warranty =
    info.warrantyText ??
    (info.warrantyMonths != null ? `${info.warrantyMonths} months` : "");

  const fixedRows: DetailRow[] = [
    { label: "Brand", value: info.brand ?? "" },
    { label: "Model", value: info.modelName ?? "" },
    { label: "Net weight", value: weight },
    { label: "Origin", value: info.countryOfOrigin ?? "" },
    { label: "Made by", value: info.manufacturer ?? "" },
    { label: "Warranty", value: warranty },
    { label: "SKU", value: info.sku ?? "" },
  ];

  return [...specRows, ...fixedRows].filter((row) => row.label && row.value);
}
