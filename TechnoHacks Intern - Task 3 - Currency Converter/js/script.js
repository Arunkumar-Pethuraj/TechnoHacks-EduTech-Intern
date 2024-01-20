const dropList = document.querySelectorAll("form select"),
  from = document.querySelector(".from select"),
  to = document.querySelector(".to select"),
  btn = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "INR"
        ? "selected"
        : "";

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = from.value;
  from.value = to.value;
  to.value = tempCode;
  loadFlag(from);
  loadFlag(to);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";

  let url = `https://v6.exchangerate-api.com/v6/447dd5b005e7214f3c2a7a33/latest/${from.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[to.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${from.value} = ${totalExRate} ${to.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
