const form = document.getElementById("registerForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const confirmFeedback = document.getElementById("confirmFeedback");
const hobbies = document.querySelectorAll(".hobby");
const hobbiesFeedback = document.getElementById("hobbiesFeedback");
const success = document.getElementById("successMessage");

function checkPasswordMatch() {
  if (confirmPassword.value === "") {
    confirmPassword.setCustomValidity("Please confirm your password.");
    confirmFeedback.textContent = "Please confirm your password.";
  } else if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Passwords do not match.");
    confirmFeedback.textContent = "Passwords do not match.";
  } else {
    confirmPassword.setCustomValidity("");
  }
}

function checkHobbies() {
  const anyChecked = Array.from(hobbies).some((h) => h.checked);
  hobbiesFeedback.classList.toggle("d-none", anyChecked);
  return anyChecked;
}

password.addEventListener("input", checkPasswordMatch);
confirmPassword.addEventListener("input", checkPasswordMatch);
hobbies.forEach((h) =>
  h.addEventListener("change", () => {
    if (form.classList.contains("was-validated")) checkHobbies();
  }),
);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  checkPasswordMatch();
  const hobbiesOk = checkHobbies();
  const formOk = form.checkValidity();

  form.classList.add("was-validated");
  success.classList.toggle("d-none", !(formOk && hobbiesOk));
});

form.addEventListener("reset", function () {
  form.classList.remove("was-validated");
  hobbiesFeedback.classList.add("d-none");
  success.classList.add("d-none");
  confirmPassword.setCustomValidity("");
});
