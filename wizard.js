/*
Create a wizard for user to register:
    1. Wizard should be be in four steps:
        a. step 1 three fields:
            i. first name (required)
            ii. last name (required)
            iii. email (required)
        b. step 2 three fields:
            i. primary address (required)
            ii. secondary address (optional)
            iii. shirt size (required)
        c. step 3 two fields:
            i. password (required)
            ii. repeat password (required)
        d. step 4 should display final object
    2. User can click on 'Continue' button to move forward in steps
        a. User should not be able to move to the next step if his current step has validation errors
    3. If user is not in step 1 then 'Back' button should be displayed to move backwards in steps
    4. Validation should be inplemented for each step:
        a. for required fields, their border should be changed to red if validation doesn't pass
        b. step 3 should also check if passwords match, if they don't then additionally display error message above 'Passwords should match!'
        c. email validation should also check if email is of valid format
    5. Errors should be cleared on step changed

Final object example(step value depends on if you count from 0 or 1, so its final value should be either 3 or 4):
*/

const nameForm = document.querySelector(".name-form");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");

const addressForm = document.querySelector(".adress-form");
const primaryAdressInput = document.querySelector("#primary-adress");
const secondaryAdressInput = document.querySelector("#secondary-adress");
const shirtSizeInput = document.querySelector("#shirt-size");

const passwordForm = document.querySelector(".password-form");
const passwordError = document.querySelector(".password-error");
const passwordInput = document.querySelector("#password");
const repPasswordInput = document.querySelector("#rep-password");

const objectContainer = document.querySelector(".object-container");
const objectDisplayer = document.querySelector("#show-object");

const backBtn = document.querySelector("#back-btn");
const continueBtn = document.querySelector("#continue-btn");

const hidden = "invisible";

continueBtn.addEventListener("click", proceed);
backBtn.addEventListener("click", goBack);

const user = {};

function proceed() {
    let selectedForm = getSelectedForm();
    console.log(selectedForm.className)

    switch (selectedForm) {
        case nameForm:
            if (areNameInputsValid()) {
                saveNameInputs();
                switchForm();
            } else {
                nameInputError();
            }
            break;
        case addressForm:
            if (areAdressInputsValid()) {
                saveAdressInputs();
                switchForm();
            } else {
                adressInputError();
            }
            break;
        case passwordForm:
            if (isPasswordValid()) {
                savePasswordInput();
                switchForm();
                showObject();
            } else {
                passwordInputError();
            }
            break;
    }
}

function nameInputError() {
    if (!firstNameInput.value) {
        applyErrorToField(firstNameInput);
    } else {
        clearErrorFromField(firstNameInput);
    }

    if (!lastNameInput.value) {
        applyErrorToField(lastNameInput);
    } else {
        clearErrorFromField(lastNameInput);
    }

    if (isEmailInvalid()) {
        applyErrorToField(emailInput);
    } else {
        clearErrorFromField(emailInput);
    }
}

function adressInputError() {
    if (!primaryAdressInput.value) {
        applyErrorToField(primaryAdressInput);
    } else {
        clearErrorFromField(primaryAdressInput);
    }

    if (!shirtSizeInput.value) {
        applyErrorToField(shirtSizeInput);
    } else {
        clearErrorFromField(shirtSizeInput);
    }
}

function passwordInputError() {
    passwordError.textContent = "Passwords must match!";
    if (!passwordInput.value || !repPasswordInput.value ||
        passwordInput.value !== repPasswordInput.value) {
        applyErrorToField(passwordInput);
        applyErrorToField(repPasswordInput);
    } else {
        clearErrorFromField(passwordInput);
        clearErrorFromField(repPasswordInput);
    }
}

//#region validators

function isEmailInvalid() {
    return !emailInput.value || emailInput.validity.typeMismatch;
}

function areNameInputsValid() {
    if (!firstNameInput.value ||
        !lastNameInput.value ||
        isEmailInvalid()) {
        return false;
    } else {
        clearNameErrors();
        return true;
    }
}

function areAdressInputsValid() {
    if (!primaryAdressInput.value ||
        !shirtSizeInput.value) {
        return false;
    } else {
        clearAdressErrors();
        return true;
    }
}

function isPasswordValid() {
    if (!passwordInput.value || !repPasswordInput.value) {
        return false;
    } else if (passwordInput.value !== repPasswordInput.value) {
        return false;
    } else {
        clearPasswordError();
        return true;
    }
}
//#endregion

function saveNameInputs() {
    user.step = 0;
    user.user = {};

    user.user.first_name = firstNameInput.value;
    user.user.last_name = lastNameInput.value;
    user.user.email = emailInput.value;

    console.log(JSON.stringify(user));
    return user;
}

function saveAdressInputs() {
    user.step += 1;
    user.user.primary_adress = primaryAdressInput.value;
    user.user.shirt_size = shirtSizeInput.value;

    if (secondaryAdressInput.value) {
        user.user.secondaryAdress = secondaryAdressInput.value;
    }

    console.log(JSON.stringify(user));
    return user;
}

function savePasswordInput() {
    user.step += 1;
    user.user.password = passwordInput.value;
    console.log(JSON.stringify(user));
    return user;
}

function applyErrorToField(field) {
    field.style.border = "1px solid red";
}

function clearErrorFromField(field) {
    field.style.border = "1px solid gray";
}

function clearNameErrors() {
    clearErrorFromField(firstNameInput);
    clearErrorFromField(lastNameInput);
    clearErrorFromField(emailInput);
}

function clearAdressErrors() {
    clearErrorFromField(primaryAdressInput);
    clearErrorFromField(shirtSizeInput);
}

function clearPasswordError() {
    passwordError.textContent = "";
    clearErrorFromField(passwordInput);
    clearErrorFromField(repPasswordInput);
}

function getSelectedForm() {
    let selectedForm;
    if (!nameForm.classList.contains(hidden)) {
        selectedForm = nameForm;
    } else if (!addressForm.classList.contains(hidden)) {
        selectedForm = addressForm;
    } else if (!passwordForm.classList.contains(hidden)) {
        selectedForm = passwordForm;
    } else {
        console.error("No form is visible");
    }
    return selectedForm;
}

function switchForm() {
    backBtn.classList.remove(hidden);
    if (!nameForm.classList.contains(hidden)) {
        changeClassName(nameForm, addressForm);
    } else if (!addressForm.classList.contains(hidden)) {
        changeClassName(addressForm, passwordForm);
    } else if (!passwordForm.classList.contains(hidden)) {
        changeClassName(passwordForm, objectContainer);
        continueBtn.className = hidden;
    } else {
        console.error("No form is visible");
    }
}

function goBack() {
    if (!addressForm.classList.contains(hidden)) {
        backBtn.classList.add(hidden);
        changeClassName(addressForm, nameForm);
    } else if (!passwordForm.classList.contains(hidden)) {
        changeClassName(passwordForm, addressForm);
    } else if (!objectContainer.classList.contains(hidden)) {
        changeClassName(objectContainer, passwordForm);
        continueBtn.classList.remove(hidden);
    } else {
        console.error("No form is visible");
    }
}

function changeClassName(firstForm, secondForm) {
    firstForm.classList.toggle("invisible");
    secondForm.classList.toggle("invisible");
}

function showObject() {
    user.step = 3;
    objectDisplayer.value = JSON.stringify(user);
}
