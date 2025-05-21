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

const updateForm = document.querySelector(".profile-settings__form");
const url = "/api/profile";

async function getUserInfo() {
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

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(updateForm);
  const data = Object.fromEntries(formData.entries());

  if (!data.password) {
    delete data.password;
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    alert("Profile updated");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
});

/*

TODO: disable update button when there is no change of value in input, 
TODO: logging out 

*/
