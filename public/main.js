const profile = document.querySelector(".header__nav-profile");
const carousel = document.querySelector(".carousel");
const prevItem = document.querySelector(".info__nav-prev");
const nextItem = document.querySelector(".info__nav-next");
const perfumeName = document.querySelector(".info__perfume");
const perfumeDesc = document.querySelector(".info__desc");
const url = "/api/perfumes";
let currentPerfume = 1;

async function getPerfumeData(id) {
  try {
    const response = await fetch(`${url}/${id}`);

    if (!response.ok) {
      throw new Error(`${response.status} - Failed to get perfume data`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayPerfumeData(id) {
  const { name, description, image, gallery } = await getPerfumeData(id);

  perfumeName.textContent = name;
  const paragraphs = description.split(/\n\s+/);
  perfumeDesc.innerHTML = paragraphs
    .map((p) => `<p>${p.trim()}</p><br/>`)
    .join("");
  carousel.innerHTML = `<img class="carousel__slide" src="${image}"/>`;

  if (gallery.length > 0) {
    gallery.map((image) => {
      const img = document.createElement("img");
      img.setAttribute("class", "carousel__slide");
      img.setAttribute("src", image);
      carousel.appendChild(img);
    });
  }
}

displayPerfumeData(currentPerfume);
updateButtonState();

function updateButtonState() {
  currentPerfume === 1
    ? prevItem.setAttribute("disabled", true)
    : prevItem.removeAttribute("disabled");

  currentPerfume === 7
    ? nextItem.setAttribute("disabled", true)
    : nextItem.removeAttribute("disabled");
}

prevItem.addEventListener("click", () => {
  if (currentPerfume != 1) {
    currentPerfume--;
    displayPerfumeData(currentPerfume);
  }

  updateButtonState();
});

nextItem.addEventListener("click", () => {
  if (currentPerfume != 7) {
    currentPerfume++;
    displayPerfumeData(currentPerfume);
  }

  updateButtonState();
});

// TODO: paths per perfume (pages), add to cart.
