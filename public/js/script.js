(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  const taxSwitch = document.getElementById("flexSwitchCheckDefault");
  if (taxSwitch) {
    taxSwitch.addEventListener("click", () => {
      const taxInfo = document.getElementsByClassName("tax-info");
      for (const info of taxInfo) {
        info.style.display = info.style.display === "inline" ? "none" : "inline";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const filtersContainer = document.getElementById("filters-container");
    const firstFilter = document.querySelector(".filter");

    if (leftBtn && rightBtn && filtersContainer && firstFilter) {
      const filterWidth = firstFilter.offsetWidth + 32;

      leftBtn.addEventListener("click", function () {
        filtersContainer.scrollLeft -= filterWidth;
      });

      rightBtn.addEventListener("click", function () {
        filtersContainer.scrollLeft += filterWidth;
      });
    }

    const container = document.getElementById("filters-container");
    if (container) {
      let startX;
      let scrollLeft;

      container.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = startX - x;
        container.scrollLeft = scrollLeft + walk;
      });
    }

    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-out-cubic",
        once: true,
        offset: 40,
      });
    }

    // Navbar scrolled class toggle for premium shadow transition
    const navbar = document.querySelector(".ss-navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
          navbar.classList.add("navbar-scrolled");
        } else {
          navbar.classList.remove("navbar-scrolled");
        }
      });
      // Initial check in case page starts scrolled
      if (window.scrollY > 20) {
        navbar.classList.add("navbar-scrolled");
      }
    }
  });
})();
