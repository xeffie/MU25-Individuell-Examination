// app.js
// Renders and manages the bookmark list

import { loadBookmarks, addBookmark, removeBookmark } from "./storage.js";

// DOM references
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

  listEl.addEventListener("click", onListClick);
}


/* --------------------------- Rendering ---------------------------- */
function populateList(items) {
  listEl.innerHTML = "";
  items.forEach(appendItem);
  toggleEmpty();
}

// Add a single item to the list (prepend, newest first)
function appendItem(item) {
  const li = document.createElement("li");
  li.className = "bm-item";
  li.dataset.id = item.id;

  li.innerHTML = `
    <div class="bm-main">
      <a class="bm-title" href="${item.url}" target="_blank" rel="noopener">
        ${escapeHtml(item.title)}
      </a>
      <span class="bm-sep">~</span>
      <span class="bm-url" title="${escapeHtml(item.url)}">
        ${escapeHtml(displayUrl(item.url))}
      </span>
    </div>
    <button class="bm-del btn btn-ghost btn-icon" type="button"
      aria-label="Ta bort ${escapeHtml(
        item.title
      )}" title="Remove bookmark">✕</button>
  `;

  listEl.insertBefore(li, listEl.firstChild);
}

/* ---------------------------- Events ------------------------------ */
function onListClick(e) {
  const btn = e.target.closest(".bm-del");
  if (!btn) return;

  const li = btn.closest("li");
  const id = li?.dataset.id;
  if (!id) return;

  const removed = removeBookmark(id);
  if (removed) {
    li.remove();
    toggleEmpty();
  }
}

function onSubmit(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  errorEl.textContent = "";

  const rawTitle = titleInput.value.trim();
  const rawUrl = urlInput.value.trim();

  // Inputs must be non-empty.
  if (!rawTitle || !rawUrl) {
    updateSubmitState();
    return;
  }

  // Normalize and validate URL.
  const normalizedUrl = toNormalizedUrlOrNull(rawUrl);
  if (!normalizedUrl) {
    updateSubmitState();
    return;
  }

  try {
    // Persist and render
    const item = addBookmark({ title: rawTitle, url: normalizedUrl });
    appendItem(item);
    toggleEmpty();
    form.reset();
    titleInput.focus();
  } catch (err) {
    // If duplicate, show error.
    if (err?.code === "DUPLICATE_TITLE") {
      errorEl.textContent = "Title already exist..";
    } else if (err?.code === "DUPLICATE_URL") {
      errorEl.textContent = "URL has already been bookmarked.";
    }
  } finally {
    updateSubmitState();
  }
}

/* --------------------------- UI helpers --------------------------- */
// Display "clean" URL
function displayUrl(u) {
  try {
    const url = new URL(u);
    const path = url.pathname.replace(/\/$/, "");
    return url.hostname + (path || "");
  } catch {
    return u;
  }
}
// Show/hide empty state and list section.
function toggleEmpty() {
  const hasItems = listEl.children.length > 0;
  emptyState.hidden = hasItems;
  listSection.hidden = !hasItems;
}
// Enable/disable submit button based on form state.
function updateSubmitState() {
  const titleOk = titleInput.value.trim().length > 0;
  const urlOk = isValidUrlGuess(urlInput.value.trim());
  submitBtn.disabled = !(titleOk && urlOk);
}

/* --------------------------- Utilities ---------------------------- */
// Escape HTML special characters to prevent XSS.
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );
}

// URL Normalizer
function toNormalizedUrlOrNull(input) {
  let u = input.trim();
  // ADd https if missing
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(u)) u = "https://" + u;

  try {
    const url = new URL(u);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    // Host must be [a–z0–9.-], have a dot, TLD >= 2 chars
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
