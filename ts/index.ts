let Country: string;
let State: string;

const handleCountryChange = () => {
  const selected = document.getElementById(
    "country-select"
  ) as HTMLSelectElement;
  if (!selected) return;

  selected.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selectedCountry = target.value;
    Country = selectedCountry;
    window.handleFetching.getStates({ country: selectedCountry });
    checkInputDisability();
  });
};
const handleStateChange = () => {
  const selected = document.getElementById("state-select") as HTMLSelectElement;
  if (!selected) return;

  console.log(selected);

  selected.addEventListener("change", (e: Event) => {
    console.log("changed");
    const target = e.target as HTMLSelectElement;
    const selectedState = target.value;
    State = selectedState;
    console.log(selectedState);
    window.handleFetching.getCities({ country: Country, state: selectedState });
    console.log("called cities");
    checkInputDisability();
  });
};

const checkInputDisability = () => {
  const stateSelect = document.getElementById(
    "state-select"
  ) as HTMLSelectElement;
  const countrySelect = document.getElementById(
    "country-select"
  ) as HTMLSelectElement;
  const citySelect = document.getElementById(
    "city-select"
  ) as HTMLSelectElement;

  [stateSelect, countrySelect, citySelect].forEach((select) => {
    if (select && select.options.length === 0) {
      select.classList.add("disabled");
    } else {
      select.classList.remove("disabled");
    }
  });
};

// function showDateModal() {
//   const date = document.querySelector("#dob") as HTMLInputElement;
//   date.addEventListener("click", (e) => {
//     (e.target as HTMLInputElement).showPicker();
//   });
// }

// ============================
// Date Picker
// Fixed:
// 1. Correct ID (#dateOfBirth)
// 2. Null safety
// 3. Browser compatibility
// ============================

function showDateModal() {
  const date = document.querySelector(
    "#dateOfBirth"
  ) as HTMLInputElement;

  if (!date) return;

  date.addEventListener("click", (e) => {
    const target = e.target as HTMLInputElement;

    if ("showPicker" in target) {
      target.showPicker();
    }
  });
}

function handleFormSubmit() {
  const form = document.getElementById("developer-form") as HTMLFormElement
  
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault()
  })
}



// ==========================================================
// Social Media Modal
// Handles:
// - Open modal
// - Close modal
// - Save URLs
// - Store URLs inside hidden input
// ==========================================================

function handleSocialMediaModal() {

  const openBtn = document.getElementById(
    "open-social-modal"
  ) as HTMLButtonElement;

  const closeBtn = document.getElementById(
    "close-social-modal"
  ) as HTMLButtonElement;

  const cancelBtn = document.getElementById(
    "cancel-social-btn"
  ) as HTMLButtonElement;

  const saveBtn = document.getElementById(
    "save-social-btn"
  ) as HTMLButtonElement;

  const modal = document.getElementById(
    "social-media-modal"
  ) as HTMLDivElement;

  const hiddenInput = document.getElementById(
    "socialMediaProfiles"
  ) as HTMLInputElement;

  if (
    !openBtn ||
    !closeBtn ||
    !cancelBtn ||
    !saveBtn ||
    !modal ||
    !hiddenInput
  ) {
    return;
  }

  // -----------------------------
  // Open Modal
  // -----------------------------

  openBtn.addEventListener("click", () => {

    modal.classList.add("active");

  });

  // -----------------------------
  // Close Modal
  // -----------------------------

  const closeModal = () => {

    modal.classList.remove("active");

  };

  closeBtn.addEventListener("click", closeModal);

  cancelBtn.addEventListener("click", closeModal);

  // Close when clicking outside

  modal.addEventListener("click", (e) => {

    if (e.target === modal) {

      closeModal();

    }

  });

  // -----------------------------
  // Save URLs
  // -----------------------------

  saveBtn.addEventListener("click", () => {

    const socialMedia = {

      linkedin:
        (
          document.getElementById("linkedinUrl") as HTMLInputElement
        ).value.trim(),

      github:
        (
          document.getElementById("gitlabUrlModal") as HTMLInputElement
        ).value.trim(),

      twitter:
        (
          document.getElementById("twitterUrl") as HTMLInputElement
        ).value.trim(),

      facebook:
        (
          document.getElementById("facebookUrl") as HTMLInputElement
        ).value.trim(),

      instagram:
        (
          document.getElementById("instagramUrl") as HTMLInputElement
        ).value.trim(),

      tiktok:
        (
          document.getElementById("tiktokUrl") as HTMLInputElement
        ).value.trim(),

      youtube:
        (
          document.getElementById("youtubeUrl") as HTMLInputElement
        ).value.trim(),

      behance:
        (
          document.getElementById("behanceUrl") as HTMLInputElement
        ).value.trim(),

      dribbble:
        (
          document.getElementById("dribbbleUrl") as HTMLInputElement
        ).value.trim(),

      other:
        (
          document.getElementById("otherSocialUrl") as HTMLInputElement
        ).value.trim()

    };

    hiddenInput.value = JSON.stringify(socialMedia);

    closeModal();

  });

}

// ==========================================================
// Initialize Page
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

  showDateModal();

  checkInputDisability();

  handleCountryChange();

  handleStateChange();

  handleSocialMediaModal();

});

// showDateModal();

// checkInputDisability();
// handleCountryChange();
// handleStateChange();
