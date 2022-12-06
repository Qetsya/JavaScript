const generateColorBtn = document.querySelector(".generate-btn");
const colorValueElement = document.querySelector("#color-value");
const colorContainer = document.querySelector(".color-container");

generateColorBtn.addEventListener("click", generateRandomColor);
window.addEventListener("load", generateRandomColor);

function generateRandomColor () {
    const randomRGB = `rgb(${getRandomRGBNumber()}, ${getRandomRGBNumber()}, ${getRandomRGBNumber()})`;
    colorContainer.style.backgroundColor = randomRGB;
    colorValueElement.textContent = randomRGB;
}

function getRandomRGBNumber () {
    return Math.floor(Math.random() * 256);
}