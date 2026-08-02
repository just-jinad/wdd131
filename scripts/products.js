
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
];


document.addEventListener("DOMContentLoaded", () => {
  const productSelect = document.getElementById("productName");
  if (productSelect) {
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const lastModEl = document.getElementById("lastModified");
  if (lastModEl) {
    lastModEl.textContent = formatLastModified(document.lastModified);
  }
});

function formatLastModified(rawDateString) {
  const d = new Date(rawDateString);

 
  if (isNaN(d.getTime())) {
    return rawDateString;
  }

  const pad = (n) => String(n).padStart(2, "0");

  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}