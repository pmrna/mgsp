const profile = document.querySelector(".header__nav-profile");
const carousel = document.querySelector(".carousel");
const prevNav = document.querySelector(".info__nav-prev");
const nextNav = document.querySelector(".info__nav-next");

let isLoggedIn = false;

profile.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isLoggedIn) {
    window.location.href = "./page/auth/login/index.html";
  } else {
    window.location.href = "./page/profile/index.html";
  }
});

// client request -> server response -> <-fail/success-> DB
