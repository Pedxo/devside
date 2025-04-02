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
    console.log(selected);
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
function handleFormSubmit() {
    const form = document.getElementById("developer-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}
showDateModal();
checkInputDisability();
handleCountryChange();
handleStateChange();
