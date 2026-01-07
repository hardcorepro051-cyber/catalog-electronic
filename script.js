// Lista locală de elevi
let elevi = [];

// Funcția apelată când se apasă butonul "Adaugă Elev"
function adaugaElev() {
  const numeInput = document.getElementById("numeElev");
  const nume = numeInput.value.trim();

  if (nume === "") {
    alert("Te rog introdu un nume de elev!");
    return;
  }

  // Adaugă în listă
  elevi.push(nume);

  // Curăță input-ul
  numeInput.value = "";

  // Actualizează afișarea
  afiseazaElevi();
}

// Afișează lista de elevi în <ul>
function afiseazaElevi() {
  const lista = document.getElementById("listaElevi");

  // Curăță lista
  lista.innerHTML = "";

  // Adaugă fiecare elev
  elevi.forEach((nume, index) => {
    const li = document.createElement("li");
    li.textContent = nume;

    // Buton ștergere
    const btnSterge = document.createElement("button");
    btnSterge.textContent = "Șterge";
    btnSterge.style.marginLeft = "10px";

    btnSterge.onclick = () => {
      stergeElev(index);
    };

    li.appendChild(btnSterge);
    lista.appendChild(li);
  });
}

// Șterge elev după index
function stergeElev(i) {
  elevi.splice(i, 1);
  afiseazaElevi();
}
