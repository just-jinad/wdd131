// getdates.js
// Populates the footer's dynamic year and last-modified date.
// Loaded with `defer`, so the DOM is guaranteed to exist — no need
// to wrap this in a DOMContentLoaded listener.

const currentYear = document.getElementById("currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;