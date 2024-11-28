const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price";
const cryptos = ["ripple", "velo", "hund"];
const currency = "eur";

let countdownValue = 10;

async function fetchCryptoPrices() {
    try {
        console.log("Fetching crypto prices...");
        const params = new URLSearchParams({
            ids: cryptos.join(","),
            vs_currencies: currency,
        });

        const response = await fetch(`${apiUrl}?${params}`);
        const data = await response.json();

        document.querySelector("#XRP .price").textContent = `${data.ripple.eur} €`;
        document.querySelector("#VELO .price").textContent = `${data.velo.eur} €`;
        document.querySelector("#HUND .price").textContent = `${data.hund?.eur || "Non disponible"} €`;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
}

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");

    if (countdownValue <= 0) {
        countdownValue = 10;
        fetchCryptoPrices();
    }

    countdownElement.textContent = countdownValue;
    countdownValue--;
}

fetchCryptoPrices(); // Appel initial
setInterval(updateCountdown, 1000); // Décompte toutes les secondes
