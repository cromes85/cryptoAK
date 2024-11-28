const apiUrl = "https://api.coingecko.com/api/v3/simple/price";
const cryptos = ["ripple", "velo", "hund"];
const currency = "eur";

async function fetchCryptoPrices() {
    try {
        // Construire l'URL avec les paramètres nécessaires
        const params = new URLSearchParams({
            ids: cryptos.join(","),
            vs_currencies: currency,
        });

        const response = await fetch(`${apiUrl}?${params}`);
        const data = await response.json();

        // Mettre à jour chaque crypto sur la page
        document.querySelector("#XRP .price").textContent = `${data.ripple.eur} €`;
        document.querySelector("#VELO .price").textContent = `${data.velo.eur} €`;
        document.querySelector("#HUND .price").textContent = `${data.hund?.eur || "Non disponible"} €`;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
}

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 10000);
