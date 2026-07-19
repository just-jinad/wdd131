// place.js — Nigeria place page
// Handles the footer year/last-modified stamp and the static wind chill display.

// ---- Footer: current year + last modified date ----
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// ---- Wind chill ----
// Static values for now (this course milestone doesn't call a weather API yet).
// Matches the Temperature / Wind values rendered in the "Weather" card above.
const currentTemperatureC = 31;
const currentWindSpeedKmh = 12;

/**
 * Returns the wind chill factor (Celsius) for a given air temperature (°C)
 * and wind speed (km/h), using the Environment Canada / NWS metric formula.
 * @param {number} tempC
 * @param {number} windKmh
 * @returns {number}
 */
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

// Wind chill is only physically meaningful when it's cold and breezy enough
// to matter. Per spec: metric conditions are temp <= 10°C AND wind > 4.8 km/h.
const windChillDisplay = document.getElementById("wind-chill");

if (currentTemperatureC <= 10 && currentWindSpeedKmh > 4.8) {
  const windChill = calculateWindChill(currentTemperatureC, currentWindSpeedKmh);
  windChillDisplay.textContent = `${windChill.toFixed(1)} \u00B0C`;
} else {
  windChillDisplay.textContent = "N/A";
}