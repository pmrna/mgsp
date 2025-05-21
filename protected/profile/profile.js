const userName = document.querySelector(".profile-info__name");
const userAddress = document.querySelector(".profile-info__addr");
const userCountry = document.querySelector(".profile-info__country");
const firstNameInput = document.querySelector(
  ".profile-settings__input--fname"
);
const lastNameInput = document.querySelector(".profile-settings__input--lname");
const emailInput = document.querySelector(".profile-settings__input--email");
const countryInput = document.querySelector(
  ".profile-settings__input--country"
);
const regionInput = document.querySelector(".profile-settings__input--region");
const cityInput = document.querySelector(".profile-settings__input--city");
const zipInput = document.querySelector(".profile-settings__input--zip");
const addressInput = document.querySelector(".profile-settings__input--addr");

async function getUserInfo() {
  const url = "/api/profile";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to get user information:", error);
  }
}

async function displayUserInfo() {
  const { first_name, last_name, email, country, region, city, zip, address } =
    await getUserInfo();

  userName.textContent = `${first_name} ${last_name}`;
  userAddress.textContent = `${address}, ${city}, ${region}`;
  userCountry.textContent = country;

  firstNameInput.value = first_name;
  lastNameInput.value = last_name;
  emailInput.value = email;
  countryInput.value = country;
  regionInput.value = region;
  cityInput.value = city;
  zipInput.value = zip;
  addressInput.value = address;
}

displayUserInfo();

// make user info display in form input values
