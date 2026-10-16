const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const success = document.getElementById("successMessage");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setState(input, isValid) {
  input.classList.toggle("is-valid", isValid);
  input.classList.toggle("is-invalid", !isValid);
  return isValid;
}

function validateName() {
  const value = nameInput.value.trim();
  const feedback = document.getElementById("nameFeedback");
  if (value === "") {
    feedback.textContent = "Name is required.";
    return setState(nameInput, false);
  }
  if (value.length < 2) {
    feedback.textContent = "Name must be at least 2 characters.";
    return setState(nameInput, false);
  }
  return setState(nameInput, true);
}

function validateEmail() {
  const value = emailInput.value.trim();
  const feedback = document.getElementById("emailFeedback");
  if (value === "") {
    feedback.textContent = "Email is required.";
    return setState(emailInput, false);
  }
  if (!emailPattern.test(value)) {
    feedback.textContent = "Please enter a valid email address.";
    return setState(emailInput, false);
  }
  return setState(emailInput, true);
}

function validateMessage() {
  const value = messageInput.value.trim();
  const feedback = document.getElementById("messageFeedback");
  if (value === "") {
    feedback.textContent = "Message is required.";
    return setState(messageInput, false);
  }
  if (value.length < 10) {
    feedback.textContent = "Message must be at least 10 characters.";
    return setState(messageInput, false);
  }
  return setState(messageInput, true);
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const results = [validateName(), validateEmail(), validateMessage()];
  const allValid = results.every(Boolean);
  success.classList.toggle("d-none", !allValid);
});
