const budgetSelect = document.querySelector("#budget-select");

const budgetContainer = document.querySelector(".current-budget-container");
const budgetForm = document.querySelector(".current-budget-form");//? ar reikia
const budgetInput = document.querySelector("#current-budget-input");
const submitBudgetBtn = document.querySelector("#submit-budget-btn");

const budgetFormResult = document.querySelector("#budget-form-result");
const budgetResult = document.querySelector("#balance");

const expenseContainer = document.querySelector(".add-expense-container");
const dateInput = document.querySelector("#expense-date");
const amountInput = document.querySelector("#expense-amount");
const expenseType = document.querySelector("#expense-type");
const expenseNote = document.querySelector("#expense-note");
const saveExpenseBtn = document.querySelector("#save-expense-btn");

const rightContainer = document.querySelector(".right-container");

budgetSelect.addEventListener("change", (event) => onBudgetTypeSelect(event));
submitBudgetBtn.addEventListener("click", showBudgetValue);
saveExpenseBtn.addEventListener("click", saveExpense);

let balance = 0;
const minPositiveBalance = 0;

function onBudgetTypeSelect(event) {
    var selectedValue = event.target.value;

    if (selectedValue === "add-expense") {
        expenseContainer.style.display = "flex";
        budgetContainer.style.display = "none";
    } else if (selectedValue === "current-budget") {
        budgetInput.value = "";
        expenseContainer.style.display = "none";
        budgetContainer.style.display = "flex";

        updateBalance();
    }
}

function showBudgetValue() {
    if (isBudgetValid()) {
        balance += Number(budgetInput.value);
    }

    updateBalance();
}

function updateBalance() {
    budgetResult.textContent = balance;
    budgetFormResult.style.display = "inline";

    if (!isBalancePositive()) {
        budgetResult.style.color = "red";
    } else {
        budgetResult.style.color = "black";
    }
}

//#region validators

function isBudgetValid() {
    if (!budgetInput.value) {
        budgetInput.style.border = "1px solid red";
        return false;
    } else {
        return true;
    }
}

function isBalancePositive() {
    return balance >= minPositiveBalance;
}

function areInputsValid() {
    if (!dateInput.value || !amountInput.value || amountInput.value < 0) {
        displayError();
        return false;
    } else {
        return true;
    }
}

//#endregion

function displayError() {
    if (!dateInput.value) {
        dateInput.style.border = "1px solid red";
    } else {
        dateInput.style.border = "1px solid grey";
    }

    if (!amountInput.value || amountInput.value < 0) {
        amountInput.style.border = "1px solid red";
    } else {
        amountInput.style.border = "1px solid grey";
    }
}

function saveExpense() {
    if (areInputsValid()) {
        createDataElements();
        processExpense();
        clearExpenseInputs();
    }
}

function createDataElements() {
    const dateText = document.createElement("span");
    const amountText = document.createElement("span");
    const typeText = document.createElement("span");
    const noteText = document.createElement("span");
    const infoContainer = document.createElement("div");

    infoContainer.id = "info-container";

    dateText.textContent = "Date: " + dateInput.value;
    amountText.textContent = "Spent Amount: " + amountInput.value;
    typeText.textContent = "Expense Type: " + expenseType.value;
    noteText.textContent = "Notes: " + expenseNote.value;

    rightContainer.append(infoContainer);
    infoContainer.append(dateText, amountText, typeText, noteText);

    return infoContainer;
}

function processExpense() {
    balance -= Number(amountInput.value);
}

function clearExpenseInputs() {
    dateInput.value = "";
    amountInput.value = "";
    expenseType.value = "groceries";
    expenseNote.value = "";
}

