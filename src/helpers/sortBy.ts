export function sortBy<T>(
  arr: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return arr.sort((a: Record<keyof T, any>, b: Record<keyof T, any>) => {
    const asc = direction === "asc";
    if (a[key] > b[key]) return asc ? 1 : -1;
    if (a[key] < b[key]) return asc ? -1 : 1;
    return 0;
  });
}
