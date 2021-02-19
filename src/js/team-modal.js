const teamBtn = document.querySelector(".footer-developed-students");
const teamModal = document.querySelector(".team");
const closeBtn = document.querySelector(".close");

teamBtn.addEventListener("click", () => {
  teamModal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  teamModal.classList.add("hidden");
});
