
import { loadBookmarks } from "./storage.js";

const listSection = document.getElementById("list-section");
const listEl = document.getElementById("bookmark-list");
const emptyState = document.getElementById("empty-state");

init();

function init() {
  populateList(loadBookmarks());
}

function populateList(items) {
  listEl.innerHTML = "";
  items.forEach(appendItem);
  toggleEmpty();
}

function appendItem(item) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a>`;
  listEl.appendChild(li);
}

function toggleEmpty() {
  const hasItems = listEl.children.length > 0;
  emptyState.hidden = hasItems;
  listSection.hidden = !hasItems;
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}