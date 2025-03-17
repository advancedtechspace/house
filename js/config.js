const local_api = "http://127.0.0.1:8000";
const remote_api = "https://api.advancedtechspace.com";

const api_url = window.location.protocol !== "https:" ? remote_api : local_api;

const title = "HOUSE";

document.querySelector("title").innerHTML = title;

function formatCurrency(val) {
  const formatterCurrency = new Intl.NumberFormat("pt-MZ", {
    style: "decimal",
    currency: "MZN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatterCurrency.format(val);
}
