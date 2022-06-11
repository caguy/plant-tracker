export function parseSort(
  sort: string | undefined,
): { property: string; direction: "asc" | "desc" } | undefined {
  if (sort === undefined) return;
  const parsed = sort.split(",");
  if (parsed.length !== 2 || (parsed[1] !== "asc" && parsed[1] !== "desc"))
    return;
  return { property: parsed[0], direction: parsed[1] };
}
