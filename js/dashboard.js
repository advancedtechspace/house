const url = new URL(window.location.href);
const visitor = !!url.searchParams.get("v");

// document.querySelector(".ammount span").innerHTML = formatCurrency(10) + " MZN";

if (visitor) {
  document.querySelector(".ammount").style.display = "none";
}

const query = {
  renda: true,
  local: "",
  preco: 20000000,
  quartos: 5,
};

getHouses();

// if (localStorage.getItem("user") === null && !visitor) {
//   window.location.href = "/login.html";
// }

document.querySelector(".logo h2").innerHTML = title;

// document.getElementById("btn-logout").addEventListener("click", () => {
//   localStorage.removeItem("user");
//   window.location.href = "/login.html";
// });

async function getHouses() {
  let hs = new String();
  console.log(query.local, query.quartos);
  let hss = houses.filter(
    (h) =>
      (query.local === String(h.local) || !query.local) &&
      parseInt(h.quartos) <= parseInt(query.quartos) &&
      h.renda === query.renda &&
      h.preco <= query.preco
  );

  for (let i = 0; i < hss.length; i++) {
    const h = hss[i];
    hs += `<div class="house">
    <div class="house-h"><h4>${formatCurrency(h.preco)} MZN</h4><p>${
      h.renda ? "Renda" : "Venda"
    }</p></div>
    <div class="house-m"><div class='house-m-wrap'><button onClick=showDetails(${
      h.id
    }) class='btn-contact'>
        Ver contacto</button></div></div>
    <div class="house-f">
      <h4>Residência tipo ${h.quartos}
      </h4>
      <div>
        <span>Andar ${h.andar}</span> 🟣
        <span>${distritos.find(({ id }) => id == h.local).label}</span>
      </div>
    </div>
  </div>`;
  }

  document.querySelector(".houses").innerHTML = hs;
}

let lcs = new String('<option value="">--Seleccionar distrito--</option>');

for (let i = 0; i < distritos.length; i++) {
  const l = distritos[i];
  lcs += `<option value="${l.id}">${l.label}</option>`;
}

document.querySelector("#select-local").innerHTML = lcs;

async function showDetails(_id) {
  if (visitor) {
    alert("Faça login para ver detalhes.");
    return;
  }

  removeValor();
  const user = houses.find(({ id }) => id == _id);
  alert("CONTACTO: (+258) " + user.user_tel);
}

// Query
document.getElementById("select-local").addEventListener("change", (e) => {
  query.local = e.target.value;
  getHouses();
});

document.getElementById("quartos").addEventListener("change", (e) => {
  query.quartos = e.target.value;
  getHouses();
});

document.getElementById("preco").addEventListener("change", (e) => {
  query.preco = parseInt(e.target.value);
  getHouses();
});

document.querySelectorAll(".radio-renda-venda").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    console.log(e.target.value);
    query.renda = !query.renda;
    getHouses();
  });
});

async function filtrar() {
  for (const e in query) {
    if (!query[e]) {
      delete query[e];
    }
  }

  getHouses();
}

async function removeValor() {}
