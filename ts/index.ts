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




// Date Picker
// Fixed:
// 1. Correct ID (#dateOfBirth)
// 2. Null safety
// 3. Browser compatibility
// 4. Prevent future dates
// 5. Minimum age = 14 years


function showDateModal(): void {

  const date = document.querySelector(
    "#dateOfBirth"
  ) as HTMLInputElement | null;

  if (!date) return;

  // ---------------------------------------
  // Prevent selecting future dates
  // ---------------------------------------

  const today = new Date();

  date.max = today.toISOString().split("T")[0];

  date.addEventListener("click", (e) => {

    const target = e.target as HTMLInputElement;

    if ("showPicker" in target) {
      target.showPicker();
    }

  });

  // ---------------------------------------
  // Live validation
  // ---------------------------------------

  date.addEventListener("change", () => {

    validateDateOfBirth();

  });

}

// Date of Birth Validation
//
// Rules
// 1. Cannot be empty
// 2. Cannot be a future date
// 3. Applicant must be at least 14 years old


function validateDateOfBirth(): boolean {

  const input = document.getElementById(
    "dateOfBirth"
  ) as HTMLInputElement | null;

  const error = document.getElementById(
    "dateOfBirth-error"
  ) as HTMLSpanElement | null;

  if (!input || !error) {
    return true;
  }

  error.textContent = "";

  input.classList.remove("error");

  if (!input.value) {
    return true;
  }

  const birthDate = new Date(input.value);

  const today = new Date();

  // -------------------------
  // Future date
  // -------------------------

  if (birthDate > today) {

    error.textContent =
      "";

    input.classList.add("error");

    return false;

  }

  // -------------------------
  // Calculate age
  // -------------------------

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age--;
  }

  if (age < 14) {

    error.textContent =
      "";

    input.classList.add("error");

    return false;

  }

  return true;

}


// Populate Role Dropdown
// Automatically sorts roles alphabetically.
// Any newly added role will appear in the correct position.

const developerRoles: string[] = [
  "3D Artist/Developer",
  "Agent operator",
  "Backend developer",
  "Code annotation",
  "Code reviewer",
  "Content Moderator & rater",
  "Creative engineer",
  "Data annotator",
  "Data collector",
  "Data scientist",
  "Design engineer",
  "Devops engineer",
  "Frontend developer",
  "Full-stack developer",
  "Game developer",
  "Ghostbuster",
  "Graphics designer + illustrator",
  "Hardware engineer",
  "ML engineer",
  "ML researcher",
  "Mobile developer",
  "Prompt engineer",
  "Research engineer",
  "Rider",
  "Robotics engineer",
  "UI researcher",
  "UI/UX designer",
  "UX experimenter",
  "Vibe coder",
  "Video editor",
  "Visual/animation designer"
];

function populateRoleDropdown(): void {

  const roleSelect =
    document.getElementById(
      "role-select"
    ) as HTMLSelectElement | null;

  if (!roleSelect) return;

  developerRoles
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        sensitivity: "base"
      })
    )
    .forEach((role) => {

      const option =
        document.createElement("option");

      option.value = role;

      option.textContent = role;

      roleSelect.appendChild(option);

    });

}


// Role Selection
// GitHub Account is OPTIONAL for every role.

function handleRoleSelection(): void {

  const roleSelect = document.getElementById(
    "role-select"
  ) as HTMLSelectElement | null;

  const githubInput = document.getElementById(
    "githubAccount"
  ) as HTMLInputElement | null;

  const githubRequiredText = document.getElementById(
    "githubAccount-required"
  ) as HTMLSpanElement | null;

  if (!roleSelect || !githubInput || !githubRequiredText) {
    return;
  }

  roleSelect.addEventListener("change", () => {

    // ----------------------------------------
    // GitHub is OPTIONAL for ALL roles.
    // ----------------------------------------

    githubInput.removeAttribute("required");

    // Remove the visual red asterisk.
    githubRequiredText.textContent = "";

  });

}


interface RequiredField {
  input: HTMLInputElement | HTMLSelectElement | null;
  errorEl: HTMLElement | null;
  name: string;
}

function validateFields(
  fields: RequiredField[]
): boolean {

  let allValid = true;

  let firstInvalidInput:
    HTMLInputElement | HTMLSelectElement | null = null;

  fields.forEach(({ input, errorEl, name }) => {

    if (!input || !errorEl) return;

    const value = input.value.trim();

    errorEl.textContent = "";

    input.classList.remove("error");

    const flagWrapper =
      input
        .closest(".selected-option")
        ?.querySelector("div");

    // ----------------------------
    // Required field
    // ----------------------------

    if (!value) {

      errorEl.textContent =
        "This field is required.";

      input.classList.add("error");

      if (name === "whatsappNumber") {

        flagWrapper?.classList.add(
          "error-border"
        );

      }

      if (firstInvalidInput === null) {

        firstInvalidInput = input;

      }

      allValid = false;

      return;

    }

    // ----------------------------
    // Email
    // ----------------------------

    if (
      input instanceof HTMLInputElement &&
      input.type === "email" &&
      !/^\S+@\S+\.\S+$/.test(value)
    ) {

      errorEl.textContent =
        "Please enter a valid email address.";

      input.classList.add("error");

      if (firstInvalidInput === null) {

        firstInvalidInput = input;

      }

      allValid = false;

      return;

    }

    // ----------------------------
    // URL
    // ----------------------------

    if (
      input instanceof HTMLInputElement &&
      input.type === "url" &&
      !/^https?:\/\/.+\..+/.test(value)
    ) {

      errorEl.textContent =
        "Please enter a valid URL.";

      input.classList.add("error");

      if (firstInvalidInput === null) {

        firstInvalidInput = input;

      }

      allValid = false;

      return;

    }

    // ----------------------------
    // Telephone
    // ----------------------------

    if (
      input instanceof HTMLInputElement &&
      input.type === "tel" &&
      !/^\+[\d()]{7,20}$/.test(value)
    ) {

      errorEl.textContent =
        "Please enter a valid phone number.";

      input.classList.add("error");

      if (firstInvalidInput === null) {

        firstInvalidInput = input;

      }

      allValid = false;

      return;

    }

    // ----------------------------
    // Account Number
    // ----------------------------

    if (
      name === "accountNumber" &&
      !/^\d{10}$/.test(value)
    ) {

      errorEl.textContent =
        "Account number must be exactly 10 digits.";

      input.classList.add("error");

      if (firstInvalidInput === null) {

        firstInvalidInput = input;

      }

      allValid = false;

      return;

    }

    // ----------------------------
    // Remove WhatsApp error border
    // ----------------------------

    if (name === "whatsappNumber") {

      flagWrapper?.classList.remove(
        "error-border"
      );

    }

    input.classList.remove("error");

  });

  // ----------------------------
  // Validate Date of Birth
  // ----------------------------

  if (!validateDateOfBirth()) {

    allValid = false;

    if (!firstInvalidInput) {

      const dob =
        document.getElementById(
          "dateOfBirth"
        ) as HTMLInputElement | null;

      firstInvalidInput = dob;

    }

  }

  firstInvalidInput?.focus();

  return allValid;

}

//form submission
const form = document.getElementById("developer-form") as HTMLFormElement;

console.log("Form found:", form);


form.addEventListener("submit", async (e: Event) => {

    e.preventDefault();

    const requiredFields = getRequiredFields(form);
    const isValid = validateFields(requiredFields);
    console.log(isValid);

    if (!isValid) {

      console.warn(
        "Form validation failed."
      );

      return;

    }

    const data = getFormData(form);
    const btn = document.getElementById("btn-submit") as HTMLButtonElement;
    const messageEl = document.getElementById("success-message") as HTMLParagraphElement;

    try {

      btn.disabled = true;

      btn.innerHTML = `<span class="spinner"></span> Submitting...`;

      const res = await fetch("https://pedxo-back-project.onrender.com/talent/details", {

          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(data),
        }
      );

      let result: any = null;

      try {

        result = await res.json();

      } catch {}

      if (res.ok) {

        alert(
          result?.message ??
          "Form submitted successfully!"
        );

        messageEl.textContent =  "Form submitted successfully!";

        messageEl.style.color = "green";

        form.reset();

      }

      else {

        alert(
          result?.message ??
          "Something went wrong."
        );

        messageEl.textContent =
          result?.message ??
          "Something went wrong.";

        messageEl.style.color =
          "red";

      }

    }

    catch (error) {

      console.error("Error submitting form:", error);
      messageEl.textContent = "Network error. Please check your connection.";

      messageEl.style.color = "red";

    }

    finally {
      btn.disabled = false;
      btn.innerHTML = "Submit";
    } 

  } 
);


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
    "socialProfiles"
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

    const socialProfiles: Record<string, string> = {};

    const addProfile = (key: string, id: string): void => {

        const value = (
            document.getElementById(id) as HTMLInputElement
        ).value.trim();

        if (value !== "") {

            socialProfiles[key] = value;

        }

    };

    addProfile("linkedinAccount", "linkedinUrl");
    addProfile("gitlabAccount", "gitlabUrlModal");
    addProfile("twitterAccount", "twitterUrl");
    addProfile("facebookAccount", "facebookUrl");
    addProfile("instagramAccount", "instagramUrl");
    addProfile("tiktokAccount", "tiktokUrl");
    addProfile("youtubeAccount", "youtubeUrl");
    addProfile("behanceAccount", "behanceUrl");
    addProfile("dribbbleAccount", "dribbbleUrl");
    addProfile("other", "otherSocialUrl");

    hiddenInput.value = JSON.stringify(socialProfiles);

    closeModal();
  });

}



// Build form payload before sending to backend
// Converts socialMediaProfiles JSON string into object
// and aligns frontend field with backend field (socialProfiles)


function getFormData(form: HTMLFormElement) {

  const formData = new FormData(form);

  const data: Record<string, any> = {};

  formData.forEach((value, key) => {

    // -------------------------------------------------
    // Convert hidden social media JSON string
    // into an object expected by backend
    // -------------------------------------------------

    if (key === "socialProfiles") {

      if (value.toString().trim() !== "") {

        try {

          const profiles = JSON.parse(value.toString());

          Object.keys(profiles).forEach((profile) => {

              if (
                  profiles[profile] === "" ||
                  profiles[profile] === null ||
                  profiles[profile] === undefined
              ) {

                  delete profiles[profile];

              }

          });

          data.socialProfiles = profiles;

        } catch {

          data.socialProfiles = {};

        }

      }

      return;

    }

    data[key] = value;

  });

  return data;

}

// ==========================================================
// Initialize Page
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  populateRoleDropdown();

  showDateModal();

  checkInputDisability();

  handleCountryChange();

  handleStateChange();

  handleRoleSelection();

  handleSocialMediaModal();

  validateDateOfBirth();

});

// showDateModal();

// checkInputDisability();
// handleCountryChange();
// handleStateChange();
