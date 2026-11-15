/*
 * Local discovery progress for the current browser.
 * It survives normal page navigation and reloading the website after NFC scans.
 * It does not synchronize progress across different phones or browsers.
 */
const STORAGE_KEY = "goat-island-found-animal-ids";

export function getFoundAnimalIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter((value) => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveFoundAnimal(id) {
  const current = getFoundAnimalIds();
  const updated = current.includes(id) ? current : [...current, id];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // The UI still works if local storage is blocked.
  }

  return updated;
}
