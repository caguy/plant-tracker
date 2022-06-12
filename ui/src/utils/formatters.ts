export const formatDateForDisplay = (date: Date) =>
  `${date.toLocaleDateString()} à ${date.toLocaleTimeString().slice(0, 5)}`;
