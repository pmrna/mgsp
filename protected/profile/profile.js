const userName = document.querySelector(".profile-info__name");
const userAddress = document.querySelector(".profile-info__addr");
const userCountry = document.querySelector(".profile-info__country");

async function getUserInfo() {
  const url = "/api/profile";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    console.log(response);

    const data = await response.json();
    userName.textContent = `${data.first_name} ${data.last_name}`;
    userAddress.textContent = `${data.address}, ${data.city}, ${data.region}`;
    userCountry.textContent = data.country;
  } catch (error) {
    console.error("Failed to get user information:", error);
  }
}

getUserInfo();
