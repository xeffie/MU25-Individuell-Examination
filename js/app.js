
import { loadBookmarks, addBookmark } from "./storage.js";

const listSection = document.getElementById("list-section");
const listEl = document.getElementById("bookmark-list");
const emptyState = document.getElementById("empty-state");

const form = document.getElementById("add-form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const submitBtn = form.querySelector('button[type="submit"]');
const errorEl = document.getElementById("form-error");

init();

function init() {
  populateList(loadBookmarks());
  updateSubmitState();

  titleInput.addEventListener("input", updateSubmitState);
  urlInput.addEventListener("input", updateSubmitState);

  form.addEventListener("submit", onSubmit);
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

function updateSubmitState() {
  errorEl.textContent = "";
  const titleOk = titleInput.value.trim().length > 0;
  const urlOk = isValidUrlGuess(urlInput.value.trim());
  submitBtn.disabled = !(titleOk && urlOk);
}

function onSubmit(e) {
  e.preventDefault();
  errorEl.textContent = "";
  submitBtn.disabled = true;

  const rawTitle = titleInput.value.trim();
  const rawUrl = urlInput.value.trim();

  if (!rawTitle || !rawUrl) {
    errorEl.textContent = "Titel och URL måste fyllas i.";
    updateSubmitState();
    return;
  }

  let normalizedUrl;
  try {
    normalizedUrl = normalizeUrl(rawUrl);
  } catch {
    errorEl.textContent = "Ogiltig URL. Exempel: https://example.com";
    updateSubmitState();
    return;
  }

  const item = addBookmark({ title: rawTitle, url: normalizedUrl });
  appendItem(item);
  toggleEmpty();

  form.reset();
  titleInput.focus();
  updateSubmitState();
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function normalizeUrl(input) {
  let u = input.trim();
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(u)) {
    u = "https://" + u;
  }
  const { href } = new URL(u);
  return href;
}

function isValidUrlGuess(input) {
  try { normalizeUrl(input); return true; }
  catch { return false; }
}