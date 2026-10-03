import { GuestRecord } from "./guest";

const STORAGE_KEY = "weddingGuests";

export function getStoredGuests(): GuestRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedGuests = localStorage.getItem(STORAGE_KEY);

  if (!savedGuests) {
    return [];
  }

  try {
    const parsedGuests = JSON.parse(savedGuests);

    if (!Array.isArray(parsedGuests)) {
      return [];
    }

    return parsedGuests;
  } catch {
    return [];
  }
}

export function saveGuest(guest: GuestRecord): void {
  if (typeof window === "undefined") {
    return;
  }

  const existingGuests = getStoredGuests();

  const updatedGuests = [
    ...existingGuests,
    guest,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedGuests),
  );
}