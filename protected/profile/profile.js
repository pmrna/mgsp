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
const submitButton = document.querySelector(".profile-settings__button");

let initialFormData = {};

submitButton.setAttribute("disabled", true);

const logoutButton = document.querySelector(".profile-info__button");

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
initialFormData = Object.fromEntries(new FormData(updateForm).entries());

async function clearSession() {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }

    alert("Successfully logged out");
    window.location.replace("/index.html");
  } catch (error) {
    alert("Error logging out user");
    console.error(error);
  }
}

logoutButton.addEventListener("click", clearSession);

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!initialFormData.password) {
    delete initialFormData.password;
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    alert("Profile updated");
  } catch (error) {
    console.error("Error updating profile:", error);
  }
});

updateForm.addEventListener("input", (event) => {
  event.preventDefault();

  const currentFormData = Object.fromEntries(new FormData(updateForm));

  const check = Object.keys(initialFormData).some(
    (key) => initialFormData[key] !== currentFormData[key]
  );

  if (check) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", true);
  }
});

/*

TODO: better error handling (404s, etc.)

*/
