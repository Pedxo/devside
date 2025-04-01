class fetchData {
  countries: { value: string; label: string }[] = [];
  states: { value: string; label: string }[] = [];
  cities: { value: string; label: string }[] = [];
  isLoading: boolean = false;

  //Handle country fetching

  async getCountries(): Promise<void> {
    try {
      this.isLoading = true;
      const response = await axios.get(`${CONFIG.COUNTRY_BASE_URL}/capital`);
      const data = response.data.data;

      this.countries = data.map((el: { name: string }) => ({
        value: el.name,
        label: el.name,
      }));
      this.isLoading = false;
      this.renderCountries();
    } catch (err) {
      this.isLoading = false;
      console.log(err);
    }
  }

  //render countries to the dom

  renderCountries() {
    const selected = document.getElementById("country-select")!;
    if (!selected) return;
    if (this.isLoading) {
      selected.classList.add("disabled");
      const option = document.createElement("option");
      option.label = "Loading countries...";
      selected.appendChild(option);
    } else {
      this.countries.forEach((country: { value: string; label: string }) => {
        const option = document.createElement("option");
        option.value = country.value;
        option.textContent = country.label;
        selected?.appendChild(option);
      });
    }
    checkInputDisability();
    this.isLoading = false;
  }

  async getStates(country: { country: string }): Promise<void> {
    try {
      this.isLoading = true;
      const response = await axios.post(
        `${CONFIG.COUNTRY_BASE_URL}/states`,
        country
      );
      const data = response?.data.data.states;
      this.states = data.map((el: { name: string }) => ({
        value: el.name,
        label: el.name,
      }));
      this.isLoading = false;
      this.renderStates();
    } catch (err) {
      this.isLoading = false;
      console.log(err);
    }
  }

  renderStates() {
    const selected = document.getElementById("state-select")!;
    if (!selected) return;
    selected.innerHTML = "";
    if (this.isLoading) {
      selected.classList.add("disabled");
      const option = document.createElement("option");
      option.label = "Loading states...";
      selected.appendChild(option);
    } else {
      this.states.forEach((state: { value: string; label: string }) => {
        const option = document.createElement("option");
        option.value = state.value;
        option.textContent = state.label;
        selected?.appendChild(option);
      });
      // this.getCities({
      //   country: Country,
      //   state: this.states[0].value.split(" ")[0],
      // });
    }
    checkInputDisability();
  }

  async getCities(data: { state: string; country: string }): Promise<void> {
    console.log(data);
    try {
      this.isLoading = true;
      const response = await axios.post(
        `${CONFIG.COUNTRY_BASE_URL}/state/cities`,
        data
      );
      const fetched = response?.data.data;
      console.log({ fetched, data: response.data });
      this.cities = fetched.map((el: string) => ({
        value: el,
        label: el,
      }));
      this.isLoading = false;
      this.renderCities();
    } catch (err) {
      this.isLoading = false;
      console.log(err);
    }
  }

  renderCities() {
    const selected = document.getElementById("city-select")!;
    if (!selected) return;
    selected.innerHTML = "";
    if (this.isLoading) {
      selected.classList.add("disabled");
      const option = document.createElement("option");
      option.label = "Loading states...";
      selected.appendChild(option);
    } else {
      this.cities.forEach((state: { value: string; label: string }) => {
        const option = document.createElement("option");
        option.value = state.value;
        option.textContent = state.label;
        selected?.appendChild(option);
      });
    }
    checkInputDisability();
  }
}

interface Window {
  handleFetching: fetchData;
}

window.handleFetching = new fetchData();
window.handleFetching.getCountries();
