export function formatPrice(price: string | undefined | null): string {
  if (!price || !price.trim()) return "Rs. —";
  const p = price.trim();
  if (/^Rs\.?\s*/i.test(p)) return p;
  return `Rs. ${p}`;
}
