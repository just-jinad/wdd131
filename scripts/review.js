const reviewCountKey = "wdd131-review-count";

function getReviewCount() {
  const storedCount = Number(window.localStorage.getItem(reviewCountKey));
  return Number.isFinite(storedCount) ? storedCount : 0;
}

function setReviewCount(count) {
  window.localStorage.setItem(reviewCountKey, String(count));
}

function addSummaryRow(label, value) {
  const summary = document.getElementById("summary");
  if (!summary) {
    return;
  }

  const row = document.createElement("div");
  row.className = "summary-row";

  const labelEl = document.createElement("div");
  labelEl.className = "summary-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("div");
  valueEl.className = "summary-value";
  valueEl.textContent = value || "N/A";

  row.append(labelEl, valueEl);
  summary.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const hasSubmission = params.has("productName") || params.has("rating") || params.has("installDate");

  const summary = document.getElementById("summary");
  if (summary) {
    summary.innerHTML = "";
  }

  if (hasSubmission) {
    setReviewCount(getReviewCount() + 1);

    addSummaryRow("Product", params.get("productName"));
    addSummaryRow("Rating", params.get("rating") ? `${params.get("rating")} / 5` : "N/A");
    addSummaryRow("Installed", params.get("installDate"));
    addSummaryRow("Features", params.getAll("features").length ? params.getAll("features").join(", ") : "None selected");
    addSummaryRow("Review", params.get("review"));
    addSummaryRow("Name", params.get("userName") || "Anonymous");
  } else if (summary) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "Review details will appear here after the form submits.";
    summary.appendChild(emptyState);
  }

  const reviewCount = document.getElementById("reviewCount");
  if (reviewCount) {
    reviewCount.textContent = String(getReviewCount());
  }
});