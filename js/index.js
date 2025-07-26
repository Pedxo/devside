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
function showDateModal() {
    const date = document.querySelector("#dob");
    date.addEventListener("click", (e) => {
        e.target.showPicker();
    });
}

//  Role selection logic for GitHub and portfolio inputs
// This code dynamically adjusts the required fields based on the selected role
  const roleSelect = document.getElementById("role-select");
  const githubInput = document.getElementById("github");
  const portfolioInput = document.getElementById("portfolio");
  const githubRequiredText = document.getElementById("github-required");

  const engineerKeywords = [
    "developer",
    "engineer",
    "coder",
    "annotation",
  ];

  const designerKeywords = [
    "designer",
    "ux",
    "ui",
    "visual",
  ];

  roleSelect.addEventListener("change", function () {
    const selected = this.value.toLowerCase();

    const isEngineer = engineerKeywords.some((k) => selected.includes(k));
    const isDesigner = designerKeywords.some((k) => selected.includes(k));

    if (isEngineer) {
      githubInput.setAttribute("required", "required");
      githubRequiredText.textContent = "*";
      portfolioInput.setAttribute("required", "required");
    } else if (isDesigner) {
      githubInput.removeAttribute("required");
      githubRequiredText.textContent = "";
      portfolioInput.setAttribute("required", "required");
    } else {
      githubInput.removeAttribute("required");
      githubRequiredText.textContent = "";
      portfolioInput.removeAttribute("required");
    }
  });



function handleFormSubmit() {
  const form = document.getElementById("developer-form");
  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("click", (e) => {
    e.preventDefault();
        console.log("Form submitted");

    const requiredFields = getRequiredFields(form);
    const isValid = validateFields(requiredFields);

    if (isValid) {
      const data = getFormData(form);
      console.log("Submitted Form Data:", data);
    //   form.submit(); or axios.post(...)
    } else {
      console.warn("Form validation failed.");
    }
   
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

  fields.forEach(({ input, errorEl, name }) => {
    if (!input || !errorEl) return;
   
    const value = input.value.trim();
    errorEl.textContent = ""; // Reset error
    input.classList.remove("error"); // Reset input error class

     const flagWrapper = input.closest(".selected-option")?.querySelector("div");
    if (!value) {
      errorEl.textContent = "This field is required.";
      input.classList.add("error");
       if (name === "whatsapp") flagWrapper?.classList.add("error-border");
      allValid = false;
    } else if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        errorEl.textContent = "Please enter a valid email address.";
        input.classList.add("error");
        allValid = false;
    } else if (input.type === "url" && !/^https?:\/\/.+\..+/.test(value)) {
        errorEl.textContent = "Please enter a valid URL.";
        input.classList.add("error");
        allValid = false;
    } else if (input.type === "tel" && !/^\+[\d()]{7,20}$/.test(value)) {
        errorEl.textContent = "Please enter a valid phone number.";
        input.classList.add("error");
        allValid = false;
    } else if (name === "accountNumber" && !/^\d{10}$/.test(value)) {
        errorEl.textContent = "Account number must be exactly 10 digits.";
        input.classList.add("error");
      allValid = false;
    }
    else {
      // Clear WhatsApp flag border if valid
      if (name === "whatsapp") flagWrapper?.classList.remove("error-border");
    }
  });

  return allValid;
}

function getFormData(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}





document.addEventListener("DOMContentLoaded", () => {
  showDateModal();
  checkInputDisability();
  handleCountryChange();
  handleStateChange();
  handleFormSubmit();
});


