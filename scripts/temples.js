// ---------- Footer: dynamic year + last modified date ----------
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ---------- Hamburger menu toggle ----------
const hamburger = document.getElementById("hamburger");
const primaryNav = document.getElementById("primary-nav");

hamburger.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");

  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  hamburger.querySelector(".hamburger-icon").innerHTML = isOpen
    ? "&#10005;" // X
    : "&#9776;"; // hamburger lines
});