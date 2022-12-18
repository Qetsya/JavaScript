const helpBtn = document.querySelector(".help-btn");
const submitBtn = document.querySelector(".submit-btn");
const exitBtn = document.querySelector(".exit-btn");

const form = document.querySelector(".form-container");

const showFirstName = document.querySelector(".show-first-name");
const showLastName = document.querySelector(".show-last-name");
const showEmail = document.querySelector(".show-email");
const showComplaint = document.querySelector(".show-complaint");

const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const email = document.querySelector("#email");
const complaint = document.querySelector("#complaint");

const formError = document.querySelector(".form-error-msg");

const container = document.querySelector(".container");

helpBtn.addEventListener("click", openForm);
submitBtn.addEventListener("click", submitForm);
exitBtn.addEventListener("click", closeForm);

function openForm() {
    console.log("openForm");
    form.style.display = "block";
}

function closeForm() {
    console.log("closeForm");
    form.style.display = "none";
}

function areInputsValid() {
    if (
        !firstNameInput.value ||
        !lastNameInput.value ||
        isEmailValid() ||
        !complaint.value
    ) {
        return false;
    }
    cleanupErrors();
    return true;
}

function isEmailValid() {
    return !email.value || email.validity.typeMismatch;
}

function time() {
    const now = new Date().toLocaleDateString();
    return now;
}

function submitForm(event) {
    event.preventDefault();

    if (areInputsValid()) {
        registerComplaint();
        cleanupInput();
        closeForm();
    } else {
        displayError();
    }
}

function displayError() {
    formError.style.display = "block";
    if (!firstNameInput.value) {
        styleError(firstNameInput);
    }
    if (!lastNameInput.value) {
        styleError(lastNameInput);
    }
    if (isEmailValid()) {
        styleError(email);
    }
    if (!complaint.value) {
        styleError(complaint);
    }
}

function styleError(input) {
    input.style.border = "1px solid red";
}

function cleanupErrors() {
    formError.style.display = "none";
    firstNameInput.style.borderColor = "initial";
    lastNameInput.style.borderColor = "initial";
    email.style.borderColor = "initial";
    complaint.style.borderColor = "initial";
}

function cleanupInput() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    email.value = "";
    complaint.value = "";
}

function createUser(title, id, value) {
    const newDiv = document.createElement("div");
    const newParagraph = document.createElement("p");
    const newValue = document.createElement("span");

    container.append(newDiv);
    newDiv.id = id;

    newDiv.append(newParagraph);

    newParagraph.textContent = title;

    newParagraph.append(newValue);

    newValue.textContent = value;

    return newDiv;
}

function registerComplaint() {
    container.append(
        createUser("First Name: ", "info-container", firstNameInput.value)
    );
    container.append(
        createUser("Last Name: ", "info-container", lastNameInput.value)
    );
    container.append(createUser("Email: ", "info-container", email.value));
    container.append(
        createUser("Complaint: ", "info-container", complaint.value)
    );
    container.append(createUser("Date: ", "date-container", time()));
}
