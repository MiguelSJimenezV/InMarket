
/* Implemetacion de Api -------------------------------------------- */

/* Cotizacion de Criptos */
const form = document.querySelector("#form-search");
const moneda = document.querySelector("#moneda");
const criptomoneda = document.querySelector("#criptomonedas");
const formContainer = document.querySelector(".form-side");
const containerAnswer = document.querySelector(".container-answer");

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptos();

  form.addEventListener("submit", submitForm);
  moneda.addEventListener("change", getValue);
  criptomoneda.addEventListener("change", getValue);
});

function submitForm(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;
  if (moneda === "" || criptomoneda === "") {
    showError("Seleccione ambas monedas...");
    return;
  }
  consultarAPI(moneda, criptomoneda);
  //console.log(moneda);
  //console.log(criptomoneda);
}

function consultarAPI(moneda, criptomoneda) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  fetch(url)
    .then((resultado) => resultado.json())
    .then((resultadoJson) => {
      mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
      //console.log(resultadoJson.DISPLAY[criptomoneda][moneda]);
    })
    .catch((error) => console.log(error));
}

function mostrarCotizacion(data) {
  clearHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = data;
  const answer = document.createElement("div");
  answer.classList.add("display-info");
  answer.innerHTML = `
        <p class="main-price">Precio: <span>${PRICE}</span></p>
        <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
        <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
        <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
        <p>Última Actualización: <span>${LASTUPDATE}</span></p>
    `;
  containerAnswer.appendChild(answer);
}

function showError(mensage) {
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = mensage;
  formContainer.appendChild(error);
  setTimeout(() => error.remove(), 3000);
}

function getValue(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function consultarCriptos() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((respuestaJson) => {
      selectCriptos(respuestaJson.Data);
      //console.log(respuestaJson.Data);
    })
    .catch((error) => console.log(error));
}

function selectCriptos(criptos) {
  criptos.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    criptomoneda.appendChild(option);
  });
}

function clearHTML() {
  containerAnswer.innerHTML = "";
}

/* Implementacion de Todas Las criptos */

let cryptoData = [];
let ordenActual = "predeterminado";

fetch("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD")
  .then((response) => {
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue exitosa");
    }
    return response.json();
  })
  .then((data) => {
    cryptoData = data.Data;
    mostrarCriptomonedas();
  })
  .catch((error) => {
    console.error("Hubo un problema con la solicitud:", error);
  });


/* Mostrar Todas las Criptos */
function mostrarCriptomonedas() {
  const cryptoContainer = document.getElementById("cryptoContainer");
  cryptoContainer.innerHTML = "";

  cryptoData.forEach((coin) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
        <div class="card h-100 bg-oscuro p-3 text-light">
          <div class="card-body">
            <img src="./assets/img/c-5.png" class="card-img mb-5 w-25" alt="icon" />
            <h5 class="card-title">${coin.CoinInfo.FullName} (${coin.CoinInfo.Name})</h5>
            <p class="card-text">Precio: ${coin.RAW.USD.PRICE}</p>
            <p class="card-text">Capitalización de mercado: ${coin.RAW.USD.MKTCAP}</p>
            <p class="card-text">Volumen (24h): ${coin.RAW.USD.VOLUME24HOUR}</p>
          </div>
        </div>
      `;
    cryptoContainer.appendChild(card);
  });
}

/* Funcion para ordenar por Mayor Valor y Nombre */
function ordenar(tipo) {
    if (tipo === "valor") {
      if (ordenActual === "valor") {
        cryptoData.reverse();
      } else {
        cryptoData.sort((a, b) => b.RAW.USD.PRICE - a.RAW.USD.PRICE);
        ordenActual = "valor";
      }
    } else if (tipo === "nombre") {
      if (ordenActual === "nombre") {
        cryptoData.reverse();
      } else {
        cryptoData.sort((a, b) =>
          a.CoinInfo.FullName.localeCompare(b.CoinInfo.FullName)
        );
        ordenActual = "nombre";
      }
    }
  
    mostrarCriptomonedas();
  }
  
  
