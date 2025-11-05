
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
  const titleOk = titleInput.value.trim().length > 0;
  const urlOk = isValidUrlGuess(urlInput.value.trim());
  submitBtn.disabled = !(titleOk && urlOk);
}

function onSubmit(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  errorEl.textContent = "";

  const rawTitle = titleInput.value.trim();
  const rawUrl = urlInput.value.trim();

  if (!rawTitle || !rawUrl) {
    updateSubmitState();
    return;
  }

  const normalizedUrl = toNormalizedUrlOrNull(rawUrl);
  if (!normalizedUrl) {
    updateSubmitState();
    return;
  }

  try {
    const item = addBookmark({ title: rawTitle, url: normalizedUrl });
    appendItem(item);
    toggleEmpty();
    form.reset();
    titleInput.focus();
  } catch (err) {
    if (err?.code === "DUPLICATE_TITLE") {
      errorEl.textContent = "Titeln finns redan.";
    } else if (err?.code === "DUPLICATE_URL") {
      errorEl.textContent = "Länken är redan sparad.";
    } else {
      errorEl.textContent = "Kunde inte spara bokmärket.";
    }
  } finally {
    updateSubmitState();
  }
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function toNormalizedUrlOrNull(input) {
  let u = input.trim();
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(u)) u = "https://" + u;

  try {
    const url = new URL(u);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    const host = url.hostname;
    if (!/^[a-z0-9.-]+$/i.test(host)) return null;
    if (!host.includes(".")) return null;
    const tld = host.split(".").pop() || "";
    if (tld.length < 2) return null;

    return url.toString();
  } catch {
    return null;
  }
}

function isValidUrlGuess(input) {
  return toNormalizedUrlOrNull(input) !== null;
}