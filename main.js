const currentBudgetEl = document.querySelector("#current-budget");
const addExpenseEl = document.querySelector("#add-expense");
const expenseContainer = document.querySelector(".add-expense-container");
const budgetContainer = document.querySelector(".current-budget-container");
const mainSelect = document.querySelector("#main-select");
const budgetInput = document.querySelector("#current-budget-input");
const submitBudgetBtn = document.querySelector("#submit-budget-btn");
const budgetForm = document.querySelector(".current-budget-form");

console.log(currentBudgetEl, addExpenseEl, expenseContainer, budgetContainer);
mainSelect.addEventListener("change", function () {
    if (addExpenseEl) {
        expenseContainer.style.display = "flex";
        budgetContainer.style.display = "none";
    }
});

function isBudgetValid() {
    if (!budgetInput.value) {
        budgetInput.style.border = "1px solid red";
        console.log("hi");
        return false;

    }
}

submitBudgetBtn.addEventListener("click", showBudgetValue);

function showBudgetValue() {
    isBudgetValid();
    const budgetValue = budgetInput.value;

    const text = document.createTextNode("Current balance after expenses:" + budgetValue);
    budgetForm.append(text);
    text.remove;
}
