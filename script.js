document.addEventListener("DOMContentLoaded", () => {
  // === Theme Toggle ===
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });

  // === Menu Toggle (if used) ===
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.querySelector("header").classList.toggle("active");
    });
  }

  // === Contact Form Validation ===
  const form = document.getElementById("contactForm");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  const emailApiKey = "bb14d1fa574249b0b60171c425122ea2"; // Replace with your actual email API key

  // === Email Validation ===
  emailInput.addEventListener("blur", () => {
    const email = emailInput.value.trim();
    if (!email) return;

    fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${emailApiKey}&email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.deliverability === "DELIVERABLE" && data.is_valid_format.value) {
          emailError.textContent = "✔ Valid email";
          emailError.style.color = "green";

          if (data.autocorrect) {
            emailError.textContent += ` (Did you mean: ${data.autocorrect}?)`;
          }
          if (data.domain) {
            emailError.textContent += ` — Domain: ${data.domain}`;
          }
        } else {
          emailError.textContent = "✘ Invalid or undeliverable email";
          emailError.style.color = "red";
        }
      })
      .catch(() => {
        emailError.textContent = "Error checking email.";
        emailError.style.color = "red";
      });
  });

  // === Form Submission ===
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you for contacting us!");

    form.reset();
    emailError.textContent = "";
  });
});
