/* Implementacion en el Index */
fetch("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD")
  .then((response) => {
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue exitosa");
    }
    return response.json();
  })
  .then((data) => {
    cryptoData = data.Data;
    mostrarCriptomonedasi();
  })
  .catch((error) => {
    console.error("Hubo un problema con la solicitud:", error);
  });

/* Mostrar solo 4 Criptos */
function mostrarCriptomonedasi() {
  const cryptoContaineri = document.getElementById("cryptoContaineri");
  cryptoContaineri.innerHTML = "";

  cryptoData.slice(0, 4).forEach((coin) => {
    const card = document.createElement("div");
    card.className = "col-md-6 mb-3 h-100";
    card.innerHTML = `
      <div class="card h-100 bg-oscuro p-3 text-light">
        <a href="./criptomonedas.html#criptos" class="text-decoration-none text-light">
          <div class="card-body h-100 w-100">
            <img src="./assets/img/c-5.png" class="card-img mb-2 w-25" alt="icon" />
            <h5 class="card-title">${coin.CoinInfo.FullName} (${coin.CoinInfo.Name})</h5>
            <p class="card-text h-100">Precio: ${coin.RAW.USD.PRICE}</p>
            <p class="card-text h-100">Capitalización de mercado: ${coin.RAW.USD.MKTCAP}</p>
          </div>
        </a>
      </div>
    `;
    cryptoContaineri.appendChild(card);
  });
}

/* Compartir pagina------------- */

// Función para compartir contenido
document.addEventListener('DOMContentLoaded', function() {
  const shareButton = document.getElementById('shareButton');
  const siteName = 'CriptoNews'; // Nombre ficticio del sitio

  shareButton.addEventListener('click', async () => {
      if (navigator.share) {
          try {
              await navigator.share({
                  title: 'Título del Contenido',
                  text: `Publicitando este sitio de criptomonedas: ${siteName}. Este es el contenido que queremos compartir.`,
                  url: window.location.href
              });
              console.log('Contenido compartido con éxito');
          } catch (error) {
              console.error('Error al compartir:', error);
          }
      } else {
          alert('La API de Web Share no es compatible con este navegador');
      }
  });
});
