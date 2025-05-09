// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });
  // Theme Switcher
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});


// Contact Form Validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");

    // API Keys (replace with your actual keys)
    const phoneApiKey = "0a8c38ac52944fa2851c6a4ee7cdf484"; // Replace with your actual API key
    const emailApiKey = "bb14d1fa574249b0b60171c425122ea2"; // Replace with your actual API key

    // Phone Validation
    let phoneTimeout = null;
    phoneInput.addEventListener("input", () => {
      const number = phoneInput.value.trim();
      clearTimeout(phoneTimeout);
      phoneTimeout = setTimeout(() => {
        if (number.length < 10) {
          phoneError.textContent = "";
          return;
        }
        const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{1,4}\)?[- ]?\d{1,4}[- ]?\d{1,4}$/;
        if (!phoneRegex.test(number)) {
          phoneError.textContent = "✘ Invalid phone number format";
          phoneError.style.color = "red";
          return;
        }
        fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${phoneApiKey}&phone=${encodeURIComponent(number)}`)
          .then(res => res.json())
          .then(data => {
            if (data.valid) {
              phoneError.textContent = `✔ Valid number (${data.location || "unknown location"})`;
              phoneError.style.color = "green";
            } else {
              phoneError.textContent = "✘ Invalid number";
              phoneError.style.color = "red";
            }
          })
          .catch(() => {
            phoneError.textContent = "Error checking number.";
            phoneError.style.color = "red";
          });
      }, 600);
    });

    // Email Validation
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

    // Form Submission
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you for contacting us!");

      // Reset the form and clear errors
      form.reset();
      phoneError.textContent = "";
      phoneInput.style.borderColor = "";
      emailError.textContent = "";
      emailInput.style.borderColor = "";
    });
  });