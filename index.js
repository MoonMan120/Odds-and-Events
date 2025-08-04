const $app = document.querySelector("#app");
const $div = document.createElement("div");

const bank = [];
const odds = [];
const evens = [];

// add a number to bank
function addNum(number) {
  bank.push(number);
  render();
}

// sorting odd/even
function sortOandE() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

// sort one
function sortOne() {
  sort();
  render();
}

// sort all
function sortAll() {
  while (bank.length) {
    sort();
  }
  render();
}

// form for adding to the bank
function placeInBank() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label> Add a Number 
    <input name="number type="number">
    </label>
    <button type="submit" data-action="add">Add number</button>
  <button type="submit" data-action="sortOne">Sort 1</button>
  <button type="submit" data-action="add">Sort All</button>
  `;
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const action = e.submitter.dataset.action;
    if (action === `add`) {
      const data = new FormData($form);
      const number = data.get("number");

      addNum(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });
  return $form;
}
// Odds

function bankNumbers(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
}
// Bank
function theBank(label, numbers) {
  const $bank = document.createElement(`section`);
  $bank.classList.add(`bank`);
  $bank.innerHTML = `
<h2>${label}</h2>
<output></output>
`;

  const $numbers = numbers.map(bankNumbers);
  $bank.querySelector(`output`).replaceChildren($numbers);

  return $bank;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <placeInBank></placeInBank>
    <theBank id-"bank"></theBank>
    <theBank id="odds"></theBank>
    <theBank id="evens"></theBank>
  `;
  $app.querySelector("placeInBank").replaceWith(placeInBank());
  $app.querySelector("theBank#bank").replaceWith(theBank("Bank", bank));
  $app.querySelector("theBank#odds").replaceWith(theBank("Odds", odds));
  $app.querySelector("theBank#evens").replaceWith(theBank("Evens", evens));
}
render();
