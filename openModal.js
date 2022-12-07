// const generateColorBtn = document.querySelector(".generate-btn");
// const colorValueElement = document.querySelector("#color-value");
// const colorContainer = document.querySelector(".color-container");

// generateColorBtn.addEventListener("click", generateRandomColor);
// window.addEventListener("load", generateRandomColor);

// function generateRandomColor () {
//     const randomRGB = `rgb(${getRandomRGBNumber()}, ${getRandomRGBNumber()}, ${getRandomRGBNumber()})`;
//     colorContainer.style.backgroundColor = randomRGB;
//     colorValueElement.textContent = randomRGB;
// }

// function getRandomRGBNumber () {
//     return Math.floor(Math.random() * 256);
// }

const modalButton = document.querySelector("#modal-btn");
const modalElemenet = document.querySelector(".modal");
const modalExitButton = document.querySelector(".modal-exit-btn");
const modalAcceptButton = document.querySelector(".modal-accept-btn");

console.log(`${modalButton},${modalElemenet}, ${modalExitButton}, ${modalAcceptButton}`);

modalButton.addEventListener("click", openModal);
modalExitButton.addEventListener("click", closeModal);
modalAcceptButton.addEventListener("click", closeModal);
modalElemenet.addEventListener("click", closeOnOverlayClick);

function openModal() {
    modalElemenet.style.display = "block";
}

function closeModal() {
    modalElemenet.style.display = "none";
}

function closeOnOverlayClick(event) {
    if (event.target === modalElemenet) {
        closeModal()
    }
}