const keyInput = document.querySelector("#new-key");
const selectKeys = document.querySelector("#existing-key");
const keyValue = document.querySelector("#value");
const updateBtn = document.querySelector("#update-object-btn");
const displayer = document.querySelector("#object-displayer");

updateBtn.addEventListener("click", update);

const newKey = {};

function createObject() {
    const key = keyInput.value;
    const newKeyValue = keyValue.value;
    newKey[key] = newKeyValue;
    return newKey;
}

function createDisplayer() {
    displayer.value = JSON.stringify(newKey);
};


function update() {
    if (selectKeys.value) {
        newKey[selectKeys.value] = keyValue.value;
    } else {
        createObject();
        createOption();
    }
    createDisplayer();
}

function createOption() {
    const option = document.createElement("option");
    option.textContent = keyInput.value;
    option.value = keyValue.value;
    selectKeys.append(option);
    selectKeys.disabled = false;
}