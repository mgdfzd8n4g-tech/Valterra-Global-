
document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {

  // AUTOMATIC COPYRIGHT YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MOBILE NAVIGATION
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // FLOATING GOLD PARTICLES
  const particleContainer = document.querySelector(".particles");

  if (particleContainer) {
    const amount = window.innerWidth < 700 ? 12 : 28;

    for (let i = 0; i < amount; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 9 + "s";
      particle.style.animationDuration = 6 + Math.random() * 7 + "s";

      particleContainer.appendChild(particle);
    }
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const selectedPackage = params.get("package");
    const packageField = document.getElementById("package");

    if (packageField && selectedPackage) {
      const optionExists = Array.from(packageField.options)
        .some(option => option.value === selectedPackage);

      if (optionExists) {
        packageField.value = selectedPackage;
      }
    }

    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const name = document.getElementById("name").value.trim();
      const business = document.getElementById("business").value.trim();
      const email = document.getElementById("email").value.trim();
      const packageName = document.getElementById("package").value;
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent("Valterra Global Website Enquiry");

      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Business: ${business}\n` +
        `Email: ${email}\n` +
        `Package: ${packageName}\n\n` +
        `Message:\n${message}`
      );

      // Replace this with your real business email address.
      window.location.href =
        `mailto:hello@yourdomain.co.za?subject=${subject}&body=${body}`;
    });
  }

});
