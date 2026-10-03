import { GiftRecord } from "./gift";

const STORAGE_KEY = "weddingGifts";

export function getStoredGifts(): GiftRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedGifts = localStorage.getItem(STORAGE_KEY);

  if (!savedGifts) {
    return [];
  }

  try {
    const parsedGifts = JSON.parse(savedGifts);

    if (!Array.isArray(parsedGifts)) {
      return [];
    }

    return parsedGifts;
  } catch {
    return [];
  }
}

export function saveGift(gift: GiftRecord): void {
  if (typeof window === "undefined") {
    return;
  }

  const existingGifts = getStoredGifts();

  const updatedGifts = [
    ...existingGifts,
    gift,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedGifts),
  );
}