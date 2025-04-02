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

function showDateModal() {
  const date = document.querySelector("#dob") as HTMLInputElement;
  date.addEventListener("click", (e) => {
    (e.target as HTMLInputElement).showPicker();
  });
}

function handleFormSubmit() {
  const form = document.getElementById("developer-form") as HTMLFormElement
  
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault()
  })
}

showDateModal();

checkInputDisability();
handleCountryChange();
handleStateChange();
