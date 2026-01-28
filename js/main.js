// Input elements
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll(".user-select");
const customInput = document.getElementById("custom");

// Output elements
const tipAmountOutput = document.getElementById("output-tip");
const totalOutput = document.getElementById("output-total");

// Reset button
const resetBtn = document.getElementById("reset");

let billValue = 0;
let peopleValue = 0;
let btnTipPercent = 0;
let customTipPercent = 0;

billInput.addEventListener("input", (e) => {
  if (billInput.value.length > 6) {
    billInput.value = billInput.value.slice(0, 6);
  }
  billValue = parseFloat(billInput.value) || 0;

  if (billValue <= 0 && billInput.value !== "") {
    billInput.parentElement.classList.add("error");
  } else {
    billInput.parentElement.classList.remove("error");
  }

  calculate();
});

peopleInput.addEventListener("input", (e) => {
  if (peopleInput.value.length > 6) {
    peopleInput.value = peopleInput.value.slice(0, 6);
  }

  peopleValue = parseFloat(peopleInput.value) || 0;

  if (peopleValue <= 0 && peopleInput.value !== "") {
    peopleInput.parentElement.classList.add("error");
  } else {
    peopleInput.parentElement.classList.remove("error");
  }

  calculate();
});

// Tip select buttons
tipButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    btnTipPercent = parseFloat(button.value);
    customTipPercent = 0;
    customInput.value = "";
    calculate();
  });
});

// Custom tip input
customInput.addEventListener("input", (e) => {
  if (customInput.value !== "") {
    tipButtons.forEach((button) => {
      button.checked = false;
    });
    btnTipPercent = 0;
    if (parseFloat(customInput.value) > 100) {
      customInput.value = 100;
    }
  }

  customTipPercent = parseFloat(customInput.value) || 0;
  calculate();
});

customInput.addEventListener("focus", (e) => {
  tipButtons.forEach((button) => {
    button.checked = false;
  });
  btnTipPercent = 0;
});

function calculate() {
  let finalTip = 0;
  if (customTipPercent > 0) {
    finalTip = customTipPercent;
  } else {
    finalTip = btnTipPercent;
  }

  if (peopleValue >= 1) {
    const totalTip = billValue * (finalTip / 100);
    const tipPerPerson = totalTip / peopleValue;
    const totalPerPerson = billValue / peopleValue + tipPerPerson;

    tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
  }
}

// Rest button
resetBtn.addEventListener("click", (e) => {
  billValue = 0;
  peopleValue = 0;
  btnTipPercent = 0;
  customTipPercent = 0;

  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";

  tipAmountOutput.textContent = "$0.00";
  totalOutput.textContent = "$0.00";

  billInput.parentElement.classList.remove("error");
  peopleInput.parentElement.classList.remove("error");

  tipButtons.forEach((button) => {
    button.checked = false;
  });
});
