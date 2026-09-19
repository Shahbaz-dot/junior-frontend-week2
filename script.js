(() => {
  "use strict";

  // Turn off the no-JavaScript fallback only after this script loads successfully.
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  try {
    const accordion = document.getElementById("faq-accordion");
    const toggleAllButton = document.getElementById("toggle-all");
    const status = document.getElementById("status");

    if (!accordion || !toggleAllButton || !status) {
      throw new Error("Required accordion elements were not found.");
    }

    const triggers = Array.from(
      accordion.querySelectorAll(".accordion-trigger")
    );

    if (triggers.length === 0) {
      throw new Error("No accordion controls were found.");
    }

    function setPanelState(trigger, shouldOpen, announce = true) {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      if (!panel) {
        console.warn(`Panel not found: ${panelId}`);
        return;
      }

      trigger.setAttribute("aria-expanded", String(shouldOpen));
      panel.hidden = false;
      panel.classList.toggle("is-open", shouldOpen);

      // Delay hiding until the close transition has finished.
      if (!shouldOpen) {
        window.setTimeout(() => {
          if (trigger.getAttribute("aria-expanded") === "false") {
            panel.hidden = true;
          }
        }, 300);
      }

      if (announce) {
        status.textContent = shouldOpen
          ? "Section opened."
          : "Section closed.";
      }
    }

    function closeOtherItems(currentTrigger) {
      triggers.forEach((trigger) => {
        if (trigger !== currentTrigger) {
          setPanelState(trigger, false, false);
        }
      });
    }

    function updateToggleAllButton() {
      const allOpen = triggers.every(
        (trigger) => trigger.getAttribute("aria-expanded") === "true"
      );

      toggleAllButton.setAttribute("aria-expanded", String(allOpen));
      toggleAllButton.textContent = allOpen ? "Collapse all" : "Expand all";
    }

    // Click interaction: one section is open at a time.
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        closeOtherItems(trigger);
        setPanelState(trigger, !isOpen);
        updateToggleAllButton();
      });

      // Keyboard navigation: Arrow keys, Home, End.
      trigger.addEventListener("keydown", (event) => {
        const currentIndex = triggers.indexOf(trigger);
        let nextIndex = null;

        switch (event.key) {
          case "ArrowDown":
            nextIndex = (currentIndex + 1) % triggers.length;
            break;
          case "ArrowUp":
            nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            break;
          case "Home":
            nextIndex = 0;
            break;
          case "End":
            nextIndex = triggers.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        triggers[nextIndex].focus();
      });
    });

    // Expand/collapse all provides a useful additional interaction.
    toggleAllButton.addEventListener("click", () => {
      const allOpen = triggers.every(
        (trigger) => trigger.getAttribute("aria-expanded") === "true"
      );

      triggers.forEach((trigger) => {
        setPanelState(trigger, !allOpen, false);
      });

      status.textContent = allOpen
        ? "All sections collapsed."
        : "All sections expanded.";

      updateToggleAllButton();
    });

    // Initial state: first item open, remaining items closed.
    triggers.forEach((trigger, index) => {
      setPanelState(trigger, index === 0, false);
    });

    updateToggleAllButton();
  } catch (error) {
    // Fallback: keep content readable if an unexpected JS error occurs.
    console.error("Accordion initialization failed:", error);
    document.documentElement.classList.remove("js");
    document.documentElement.classList.add("no-js");

    const panels = document.querySelectorAll(".accordion-panel");
    panels.forEach((panel) => {
      panel.hidden = false;
      panel.classList.remove("is-open");
    });
  }
})();
