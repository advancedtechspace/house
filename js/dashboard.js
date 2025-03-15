const url = new URL(window.location.href);
const visitor = !!url.searchParams.get("v");

document.querySelector(".ammount span").innerHTML = formatCurrency(10) + " MZN";

if (visitor) {
  document.querySelector(".ammount").style.display = "none";
}

const query = {
  renda: true,
  local: "",
  preco: 150000,
  quartos: 2,
};

getHouses();

if (localStorage.getItem("user") === null && !visitor) {
  window.location.href = "/login.html";
}

document.querySelector(".logo h2").innerHTML = title;

document.getElementById("btn-logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

async function getHouses() {
  let hs = new String();
  console.log(query.local, houses);
  let hss = houses.filter(
    (h) => query.local === String(h.local) || !query.local
  );
  console.log(hss);

  for (let i = 0; i < hss.length; i++) {
    const h = hss[i];
    hs += `<div class="house">
    <div class="house-h"><h4>${formatCurrency(h.preco)} MZN</h4><p>${
      h.renda ? "Renda" : "Venda"
    }</p></div>
    <div class="house-m"><div class='house-m-wrap'><button onClick=showDetails(${
      h.id
    }) class='btn-contact'>
        Ver detalhes</button></div></div>
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
  const user = houses.find(({id}) => id == _id )
  alert(user.user_tel)
}

document.getElementById("select-local").addEventListener("change", (e) => {
  query.local = e.target.value;
  getHouses();
});

async function filtrar() {
  for (const e in query) {
    if (!query[e]) {
      delete query[e];
    }
  }

  getHouses();
}

async function removeValor() {
  
}