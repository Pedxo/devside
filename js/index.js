"use strict";
let Country;
let State;
const handleCountryChange = () => {
    const selected = document.getElementById("country-select");
    if (!selected)
        return;
    selected.addEventListener("change", (e) => {
        const target = e.target;
        const selectedCountry = target.value;
        Country = selectedCountry;
        window.handleFetching.getStates({ country: selectedCountry });
        checkInputDisability();
    });
};
const handleStateChange = () => {
    const selected = document.getElementById("state-select");
    if (!selected)
        return;
    // console.log(selected);
    selected.addEventListener("change", (e) => {
        console.log("changed");
        const target = e.target;
        const selectedState = target.value;
        State = selectedState;
        console.log(selectedState);
        window.handleFetching.getCities({ country: Country, state: selectedState });
        console.log("called cities");
        checkInputDisability();
    });
};
const checkInputDisability = () => {
    const stateSelect = document.getElementById("state-select");
    const countrySelect = document.getElementById("country-select");
    const citySelect = document.getElementById("city-select");
    [stateSelect, countrySelect, citySelect].forEach((select) => {
        if (select && select.options.length === 0) {
            select.classList.add("disabled");
        }
        else {
            select.classList.remove("disabled");
        }
    });
};



// Date Picker
// Prevent future dates
// Live Date of Birth validation

function showDateModal() {

  const date = document.querySelector("#dateOfBirth");

  if (!date) return;

  // ---------------------------------------
  // Prevent selecting future dates
  // ---------------------------------------

  const today = new Date();

  date.max = today.toISOString().split("T")[0];

  date.addEventListener("click", (e) => {

      const target = e.target;

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


function validateDateOfBirth() {

  const input = document.getElementById("dateOfBirth");

  const error = document.getElementById("dateOfBirth-error");

  if (!input || !error) {

      return true;

  }

  // Clear previous error

  error.textContent = "";

  input.classList.remove("error");

  // Allow empty value here.
  // Required-field validation is handled elsewhere.

  if (!input.value) {

      return true;

  }

  const birthDate = new Date(input.value);

  const today = new Date();

  // ---------------------------------------
  // Future Date Validation
  // ---------------------------------------

  if (birthDate > today) {

      error.textContent =
          "";

      input.classList.add("error");

      return false;

  }

  // ---------------------------------------
  // Calculate Age
  // ---------------------------------------

  let age =
      today.getFullYear() -
      birthDate.getFullYear();

  const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

  if (
      monthDifference < 0 ||
      (
          monthDifference === 0 &&
          today.getDate() < birthDate.getDate()
      )
  ) {

      age--;

  }

  // ---------------------------------------
  // Minimum Age Validation
  // ---------------------------------------

  if (age < 14) {

      error.textContent =
          "";

      input.classList.add("error");

      return false;

  }

  return true;

}


// Role Selection
// GitHub Account is OPTIONAL for every role.
// Portfolio remains required because the HTML already marks it
// as required.


function handleRoleSelection() {

  const roleSelect = document.getElementById("role-select");

  const githubInput = document.getElementById("githubAccount");

  const githubRequiredText = document.getElementById("githubAccount-required");

  if (!roleSelect || !githubInput || !githubRequiredText) {
      return;
  }

  roleSelect.addEventListener("change", () => {

      // GitHub should always stay optional.

      githubInput.removeAttribute("required");

      githubRequiredText.textContent = "";

  });

}




function getRequiredFields(form) {
  return Array.from(form.querySelectorAll("label > span"))
    .filter((span) => span.textContent.trim() === "*")
    .map((span) => {
      const label = span.closest("label");
      const fieldId = label.getAttribute("for");
      return {
        input: form.querySelector(`[name="${fieldId}"]`),
        errorEl: document.getElementById(`${fieldId}-error`),
        name: fieldId,
      };
    });
}

function validateFields(fields) {
  let allValid = true;
  let firstInvalidInput = null;

  fields.forEach(({ input, errorEl, name }) => {
    if (!input || !errorEl) return;
   
    const value = input.value.trim();
    errorEl.textContent = ""; // Reset error
    input.classList.remove("error"); // Reset input error class

     const flagWrapper = input.closest(".selected-option")?.querySelector("div");
    if (!value) {
      errorEl.textContent = "This field is required.";
      input.classList.add("error");
       if (name === "whatsappNumber") flagWrapper?.classList.add("error-border");
       if (!firstInvalidInput) firstInvalidInput = input;
      allValid = false;
    } else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        errorEl.textContent = "Please enter a valid email address.";
        input.classList.add("error");
        if (!firstInvalidInput) firstInvalidInput = input;
        allValid = false;
    } else if (input.type === "url" && !/^https?:\/\/.+\..+/.test(value)) {
        errorEl.textContent = "Please enter a valid URL.";
        input.classList.add("error");
        if (!firstInvalidInput) firstInvalidInput = input;
        allValid = false;
    } else if (input.type === "tel" && !/^\+[\d()]{7,20}$/.test(value)) {
        errorEl.textContent = "Please enter a valid phone number.";
        input.classList.add("error");
        if (!firstInvalidInput) firstInvalidInput = input;
        allValid = false;
    } else if (name === "accountNumber" && !/^\d{10}$/.test(value)) {
        errorEl.textContent = "Account number must be exactly 10 digits.";
        input.classList.add("error");
        if (!firstInvalidInput) firstInvalidInput = input;
      allValid = false;
    }
    else {
      // Clear WhatsApp flag border if valid
      if (name === "whatsappNumber") flagWrapper?.classList.remove("error-border");
       input.classList.remove("error");
    }
  });

      // Validate Date of Birth

    if (!validateDateOfBirth()) {

      allValid = false;

      if (!firstInvalidInput) {

          firstInvalidInput =
              document.getElementById("dateOfBirth");

      }

    }

    // Focus first invalid field

    if (firstInvalidInput) {

      firstInvalidInput.focus();

    }

    return allValid;
}


//submit form
const form = document.getElementById("developer-form");
console.log("Form found:", form);

form.addEventListener("submit",async (e) => {
  e.preventDefault();

  console.log("submit");
  

  const requiredFields = getRequiredFields(form);
  const isValid = validateFields(requiredFields);
    console.log(isValid);

 if (isValid) {
  const data = getFormData(form);
  const btn = document.getElementById("btn-submit");
  const messageEl = document.getElementById("success-message");

  try {
    // Show loading state
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Submitting...`;

    const res = await fetch("https://pedxo-back-project.onrender.com/talent/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let result;
    try {
      result = await res.json();
    } catch {
      result = null;
    }

    if (res.ok) {
      //  Success
      console.log("Submitted Form Data:", data);
       alert(result?.message || "Form submitted successfully!");
      messageEl.textContent = "Form submitted successfully!";
      messageEl.style.color = "green";
      form.reset();
    } else {
      //  Server error
      console.error("Error response:", result);
      alert(result?.message || "Something went wrong. Please try again.");
      messageEl.textContent = result?.message || "Something went wrong. Please try again.";
      messageEl.style.color = "red";
    }
  } catch (error) {
    //  Network error
    console.error("Error submitting form:", error);
    messageEl.textContent = "Network error. Please check your connection.";
    messageEl.style.color = "red";
  } finally {
    // Reset button state
    btn.disabled = false;
    btn.innerHTML = "Submit";
  }
} else {
  console.warn("Form validation failed.");
}

});



// function handleFormSubmit() {
//   const form = document.getElementById("developer-form");
//   if (!form) {
//     console.error("Form not found");
//     return;
//   }

// }



// showDateModal();
// checkInputDisability();
// handleCountryChange();
// handleStateChange();
// handleFormSubmit();


document.addEventListener("DOMContentLoaded", () => {
  // showDateModal();
  checkInputDisability();
  handleCountryChange();
  handleStateChange();
  // handleFormSubmit();
});


// addEventListener("DOMContentLoaded", () => {
//   showDateModal();
//   checkInputDisability();
//   handleCountryChange();
//   handleStateChange();
//   handleFormSubmit();
// });


function handleFormSubmit() {
    const form = document.getElementById("developer-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}


// ==========================================================
// Social Media Modal
// ==========================================================

function handleSocialMediaModal() {

  const openBtn = document.getElementById("open-social-modal");
  const closeBtn = document.getElementById("close-social-modal");
  const cancelBtn = document.getElementById("cancel-social-btn");
  const saveBtn = document.getElementById("save-social-btn");
  const modal = document.getElementById("social-media-modal");
  const hiddenInput = document.getElementById("socialProfiles");

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

  // Open modal

  openBtn.addEventListener("click", () => {

      modal.classList.add("active");

  });

  // Close modal

  const closeModal = () => {

      modal.classList.remove("active");

  };

  closeBtn.addEventListener("click", closeModal);

  cancelBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {

      if (e.target === modal) {

          closeModal();

      }

  });

  // SOcial Media Modal Validation
  function validateSocialMediaUrls() {

    const socialFields = [
      {
        id: "linkedinUrl",
        domains: [
          "https://linkedin.com",
          "https://www.linkedin.com"
        ]
      },
  
      {
        id: "gitlabUrlModal",
        domains: [
          "https://gitlab.com",
          "https://www.gitlab.com"
        ]
      },
  
      {
        id: "twitterUrl",
        domains: [
          "https://x.com",
          "https://twitter.com",
          "https://www.x.com",
          "https://www.twitter.com"
        ]
      },
  
      {
        id: "facebookUrl",
        domains: [
          "https://facebook.com",
          "https://www.facebook.com"
        ]
      },
  
      {
        id: "instagramUrl",
        domains: [
          "https://instagram.com",
          "https://www.instagram.com"
        ]
      },
  
      {
        id: "tiktokUrl",
        domains: [
          "https://tiktok.com",
          "https://www.tiktok.com"
        ]
      },
  
      {
        id: "youtubeUrl",
        domains: [
          "https://youtube.com",
          "https://www.youtube.com",
          "https://youtu.be"
        ]
      },
  
      {
        id: "behanceUrl",
        domains: [
          "https://behance.net",
          "https://www.behance.net"
        ]
      },
  
      {
        id: "dribbbleUrl",
        domains: [
          "https://dribbble.com",
          "https://www.dribbble.com"
        ]
      },
  
      {
        id: "otherSocialUrl",
        domains: [
          "https://"
        ]
      }
    ];
  
    let isValid = true;
  
    socialFields.forEach((field) => {
  
      const input = document.getElementById(field.id);
  
      const error = document.getElementById(`${field.id}-error`);
  
      const value = input.value.trim();
  
      error.textContent = "";
      input.classList.remove("error");
  
      if (!value) return;
  
      const matched = field.domains.some(domain =>
        value.startsWith(domain)
      );
  
      if (!matched) {
  
        error.textContent =
          "Please enter a valid " +
          input.previousElementSibling.textContent +
          " profile URL.";
  
        input.classList.add("error");
  
        isValid = false;
      }
  
    });
    
    return isValid;
  }

  //live update validation
  [
    "linkedinUrl",
    "gitlabUrlModal",
    "twitterUrl",
    "facebookUrl",
    "instagramUrl",
    "tiktokUrl",
    "youtubeUrl",
    "behanceUrl",
    "dribbbleUrl",
    "otherSocialUrl"
  ].forEach((id) => {
  
    const input = document.getElementById(id);
  
    input.addEventListener("input", () => {
  
      validateSocialMediaUrls();
  
    });
  
  });

  // Save URLs

  saveBtn.addEventListener("click", () => {

    if(!validateSocialMediaUrls()) {
      return;
    }

      const socialProfiles = {

          linkedin: document.getElementById("linkedinUrl").value.trim(),

          gitlab: document.getElementById("gitlabUrlModal").value.trim(),

          twitter: document.getElementById("twitterUrl").value.trim(),

          facebook: document.getElementById("facebookUrl").value.trim(),

          instagram: document.getElementById("instagramUrl").value.trim(),

          tiktok: document.getElementById("tiktokUrl").value.trim(),

          youtube: document.getElementById("youtubeUrl").value.trim(),

          behance: document.getElementById("behanceUrl").value.trim(),

          dribbble: document.getElementById("dribbbleUrl").value.trim(),

          other: document.getElementById("otherSocialUrl").value.trim()

      };

      hiddenInput.value = JSON.stringify(socialProfiles);

      closeModal();

  });

}

function getFormData(form) {

  const formData = new FormData(form);

  const data = {};

  formData.forEach((value, key) => {

      // Convert hidden JSON string into object
      // expected by backend

      if (key === "socialProfiles") {

          if (value.toString().trim() !== "") {

              try {

                  data.socialProfiles = JSON.parse(value.toString());

              }
              catch {

                  data.socialProfiles = {};

              }

          }

          return;
      }

      data[key] = value;

  });

  return data;
}

// showDateModal();


// checkInputDisability();
// handleCountryChange();
// handleStateChange();

document.addEventListener("DOMContentLoaded", () => {

  showDateModal();
  checkInputDisability();
  handleCountryChange();
  handleStateChange();
  handleRoleSelection();
  handleSocialMediaModal();
  validateDateOfBirth()

});

// Role selection logic for GitHub and portfolio inputs
// This code dynamically adjusts the required fields based on the selected role
  // const roleSelect = document.getElementById("role-select");
  // const githubInput = document.getElementById("github");
  // const portfolioInput = document.getElementById("portfolio");
  // const githubRequiredText = document.getElementById("github-required");

  // const engineerKeywords = [
  //   "developer",
  //   "engineer",
  //   "coder",
  //   "annotation",
  // ];

  // const designerKeywords = [
  //   "designer",
  //   "ux",
  //   "ui",
  //   "visual",
  // ];

  // roleSelect.addEventListener("change", function () {
  //   const selected = this.value.toLowerCase();

  //   const isEngineer = engineerKeywords.some((k) => selected.includes(k));
  //   const isDesigner = designerKeywords.some((k) => selected.includes(k));

  //   if (isEngineer) {
  //     githubInput.setAttribute("required", "required");
  //     githubRequiredText.textContent = "*";
  //     portfolioInput.setAttribute("required", "required");
  //   } else if (isDesigner) {
  //     githubInput.removeAttribute("required");
  //     githubRequiredText.textContent = "";
  //     portfolioInput.setAttribute("required", "required");
  //   } else {
  //     githubInput.removeAttribute("required");
  //     githubRequiredText.textContent = "";
  //     portfolioInput.removeAttribute("required");
  //   }
  // });

