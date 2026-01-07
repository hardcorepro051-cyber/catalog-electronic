// Configurare JSONBin
const API_KEY = "$2a$10$mFTtDEEPk8YlQsmC0tye7.E26/TYy.s0tMjMagSYIawROttbAJtEC";
const BIN_ID = "695ea117ae596e708fcbd4c8";

// Obține lista elevilor
async function getElevi() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });
  const data = await res.json();
  return data.record || [];
}

// Salvează elevii în JSONBin
async function saveElevi(elevi) {
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(elevi)
  });
}

// Afișează elevii pe pagină
async function afiseazaElevi() {
  const lista = document.getElementById("listaElevi");
  lista.innerHTML = "";

  let elevi = await getElevi();

  elevi.forEach((elev, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${elev}
      <button onclick="stergeElev(${index})">Șterge</button>
    `;
    lista.appendChild(li);
  });
}

// Adaugă un elev nou
async function adaugaElev() {
  let nume = document.getElementById("numeElev").value.trim();
  if (!nume) return alert("Introdu un nume!");

  let elevi = await getElevi();
  elevi.push(nume);

  await saveElevi(elevi);
  document.getElementById("numeElev").value = "";
  afiseazaElevi();
}

// Șterge un elev după index
async function stergeElev(i) {
  let elevi = await getElevi();
  elevi.splice(i, 1);
  await saveElevi(elevi);
  afiseazaElevi();
}

// Încarcă lista la pornire
afiseazaElevi();
