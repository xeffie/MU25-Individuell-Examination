const KEY = "bm:list";

export function loadBookmarks() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}

export function saveBookmarks(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

function uid() {
  return (Date.now().toString(36) + Math.random().toString(36).slice(2));
}

export function addBookmark({ title, url }) {
  const list = loadBookmarks();

  const titleKey = title.trim().toLowerCase();
  const urlKey = normalizeForCompare(url);

  if (list.some(i => (i.title ?? "").trim().toLowerCase() === titleKey)) {
    const err = new Error("Duplicate title");
    err.code = "DUPLICATE_TITLE";
    throw err;
  }

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