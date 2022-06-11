import { SortDirection } from "@mui/material";

export function getNextSortDirection(direction: SortDirection): SortDirection {
  switch (direction) {
    case "asc":
      return "desc";
    case "desc":
      return false;
    default:
      return "asc";
  }
}

export function parseSort(
  sort: string | null
): { column: string; direction: SortDirection } | undefined {
  if (sort === null) return;
  const parsed = sort.split(",");
  if (parsed.length !== 2 || (parsed[1] !== "asc" && parsed[1] !== "desc"))
    return;
  return { column: parsed[0], direction: parsed[1] };
}

export function stringifySort(sort: {
  column: string;
  direction: SortDirection;
}) {
  if (sort.direction === "asc" || sort.direction === "desc")
    return [sort.column, sort.direction].join(",");
  return null;
}
