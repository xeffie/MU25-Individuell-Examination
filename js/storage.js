// storage.js
// Lightweight persistence layer for bookmarks using localStorage

const KEY = "bm:list";

// Parse JSON from localStorage.
export function loadBookmarks() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}

// Save to localStorage.
export function saveBookmarks(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Generate a unique id.
function uid() {
  return (Date.now().toString(36) + Math.random().toString(36).slice(2));
}

// Add a bookmark if it doesn't collide on title or URL.
export function addBookmark({ title, url }) {
  const list = loadBookmarks();

  // Normalized keys for duplicate checks.
  const titleKey = title.trim().toLowerCase();
  const urlKey = normalizeForCompare(url);

  // Don't allow duplicate titles.
  if (list.some(i => (i.title ?? "").trim().toLowerCase() === titleKey)) {
    const err = new Error("Duplicate title");
    err.code = "DUPLICATE_TITLE";
    throw err;
  }

  // Don't allow duplicate URLs.
  if (list.some(i => normalizeForCompare(i.url) === urlKey)) {
    const err = new Error("Duplicate URL");
    err.code = "DUPLICATE_URL";
    throw err;
  }

  const item = {
    id: uid(),
    title: title.trim(),
    url: url.trim(),
    createdAt: Date.now()
  };
  list.push(item);
  saveBookmarks(list);
  return item;
}

// Remove a bookmark by id.
export function removeBookmark(id) {
  const list = loadBookmarks();
  const next = list.filter(i => i.id !== id);
  saveBookmarks(next);
  return list.length !== next.length;
}

// Normalize rhe URL for comparison.
function normalizeForCompare(u) {
  try {
    const url = new URL(u);
    url.hash = "";
    url.hostname = url.hostname.toLowerCase();
    return url.toString();
  } catch {
    return String(u).trim().toLowerCase();
  }
}