const KEY = "bm:list";

export function loadBookmarks() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}

export function saveBookmarks(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

function uid() {
  return (crypto?.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2));
}

export function addBookmark({ title, url }) {
  const list = loadBookmarks();
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