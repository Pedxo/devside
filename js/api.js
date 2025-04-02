"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class fetchData {
    constructor() {
        this.countries = [];
        this.states = [];
        this.cities = [];
        this.isLoading = false;
    }
    //Handle country fetching
    getCountries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isLoading = true;
                const response = yield axios.get(`${CONFIG.COUNTRY_BASE_URL}/capital`);
                const data = response.data.data;
                this.countries = data.map((el) => ({
                    value: el.name,
                    label: el.name,
                }));
                this.isLoading = false;
                this.renderCountries();
            }
            catch (err) {
                this.isLoading = false;
                console.log(err);
            }
        });
    }
    //render countries to the dom
    renderCountries() {
        const selected = document.getElementById("country-select");
        if (!selected)
            return;
        if (this.isLoading) {
            selected.classList.add("disabled");
            const option = document.createElement("option");
            option.label = "Loading countries...";
            selected.appendChild(option);
        }
        else {
            this.countries.forEach((country) => {
                const option = document.createElement("option");
                option.value = country.value;
                option.textContent = country.label;
                selected === null || selected === void 0 ? void 0 : selected.appendChild(option);
            });
        }
        checkInputDisability();
        this.isLoading = false;
    }
    getStates(country) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isLoading = true;
                const response = yield axios.post(`${CONFIG.COUNTRY_BASE_URL}/states`, country);
                const data = response === null || response === void 0 ? void 0 : response.data.data.states;
                this.states = data.map((el) => ({
                    value: el.name,
                    label: el.name,
                }));
                this.isLoading = false;
                this.renderStates();
            }
            catch (err) {
                this.isLoading = false;
                console.log(err);
            }
        });
    }
    renderStates() {
        const selected = document.getElementById("state-select");
        if (!selected)
            return;
        selected.innerHTML = "";
        if (this.isLoading) {
            selected.classList.add("disabled");
            const option = document.createElement("option");
            option.label = "Loading states...";
            selected.appendChild(option);
        }
        else {
            this.states.forEach((state) => {
                const option = document.createElement("option");
                option.value = state.value;
                option.textContent = state.label;
                selected === null || selected === void 0 ? void 0 : selected.appendChild(option);
            });
            // this.getCities({
            //   country: Country,
            //   state: this.states[0].value.split(" ")[0],
            // });
        }
        checkInputDisability();
    }
    getCities(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            try {
                this.isLoading = true;
                const response = yield axios.post(`${CONFIG.COUNTRY_BASE_URL}/state/cities`, data);
                const fetched = response === null || response === void 0 ? void 0 : response.data.data;
                console.log({ fetched, data: response.data });
                this.cities = fetched.map((el) => ({
                    value: el,
                    label: el,
                }));
                this.isLoading = false;
                this.renderCities();
            }
            catch (err) {
                this.isLoading = false;
                console.log(err);
            }
        });
    }
    renderCities() {
        const selected = document.getElementById("city-select");
        if (!selected)
            return;
        selected.innerHTML = "";
        if (this.isLoading) {
            selected.classList.add("disabled");
            const option = document.createElement("option");
            option.label = "Loading states...";
            selected.appendChild(option);
        }
        else {
            this.cities.forEach((state) => {
                const option = document.createElement("option");
                option.value = state.value;
                option.textContent = state.label;
                selected === null || selected === void 0 ? void 0 : selected.appendChild(option);
            });
        }
        checkInputDisability();
    }
}
window.handleFetching = new fetchData();
window.handleFetching.getCountries();
