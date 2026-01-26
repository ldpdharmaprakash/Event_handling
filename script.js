function toggleDetails(btn) {
  const full = btn.previousElementSibling;
  full.classList.toggle("hidden");

  btn.innerText = full.classList.contains("hidden")
    ? "Show More"
    : "Show Less";
}

function toggle(btn) {
  const full = btn.previousElementSibling;
  full.classList.toggle("hidden");
  btn.innerText = full.classList.contains("hidden") ? "Show More" : "Show Less";
}
