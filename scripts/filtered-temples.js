// ==========================================================================
// Temple Album — filtered rendering
//
// Design: data -> filter predicate -> render. Each layer is independently
// testable — a junior can swap the DOM-building step for something else
// (say, a template engine) without touching the filter logic, and vice versa.
// ==========================================================================

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  // ---- Added temples (exactly 3, per rubric: "seven original + three added") ----
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 119619,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-utah-temple-exterior.jpg",
  },
  {
    templeName: "Philadelphia Pennsylvania",
    location: "Philadelphia, Pennsylvania, United States",
    dedicated: "2016, September, 18",
    area: 60000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/philadelphia-pennsylvania/400x250/philadelphia-pennsylvania-temple-exterior.jpg",
  },
  {
    templeName: "Cardston Alberta",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923, August, 26",
    area: 60000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cardston-alberta/400x250/cardston-alberta-temple-exterior.jpg",
  },
];

// ---------- Filter predicates ----------
// Pure functions: (temple) -> boolean. No DOM, no side effects — this is
// the part you'd unit test in isolation.
const dedicatedYear = (temple) => parseInt(temple.dedicated.split(",")[0], 10);

const filters = {
  home: () => true,
  old: (t) => dedicatedYear(t) < 1900,
  new: (t) => dedicatedYear(t) > 2000,
  large: (t) => t.area > 90000,
  small: (t) => t.area < 10000,
};

const pageHeadings = {
  home: "Home",
  old: "Old",
  new: "New",
  large: "Large",
  small: "Small",
};

// ---------- Rendering ----------
const gallery = document.getElementById("gallery");
const pageHeading = document.getElementById("pageHeading");

function templeCardHTML(temple) {
  return `
    <figure class="temple-card">
      <img
        src="${temple.imageUrl}"
        alt="${temple.templeName} Temple"
        width="400"
        height="300"
        loading="lazy"
      >
      <figcaption>
        <p class="temple-name">${temple.templeName}</p>
        <dl>
          <dt>Location</dt>
          <dd>${temple.location}</dd>
          <dt>Dedicated</dt>
          <dd>${temple.dedicated}</dd>
          <dt>Area</dt>
          <dd>${temple.area.toLocaleString()} sq ft</dd>
        </dl>
      </figcaption>
    </figure>
  `;
}

function renderTemples(filterKey) {
  const predicate = filters[filterKey] ?? filters.home;
  const matches = temples.filter(predicate);

  gallery.innerHTML = matches.length
    ? matches.map(templeCardHTML).join("")
    : `<p class="empty-state">No temples match this filter.</p>`;

  pageHeading.textContent = pageHeadings[filterKey] ?? pageHeadings.home;
}


const primaryNav = document.getElementById("primary-nav");
const hamburger = document.getElementById("hamburger");

primaryNav.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-filter]");
  if (!link) return;

  event.preventDefault();

  primaryNav
    .querySelectorAll("a")
    .forEach((a) => a.removeAttribute("aria-current"));
  link.setAttribute("aria-current", "page");

  renderTemples(link.dataset.filter);

  
  if (primaryNav.classList.contains("is-open")) {
    primaryNav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
    hamburger.querySelector(".hamburger-icon").innerHTML = "&#9776;";
  }
});

// ---------- Hamburger menu toggle ----------
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

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

renderTemples("home");