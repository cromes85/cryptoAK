const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price";
const cryptos = ["ripple", "velo", "hund"];
const currency = "eur";

let countdownValue = 10;

async function fetchCryptoPrice() {
    try {
        const response = await fetch('https://coincodex.com/crypto/ripple/', {mode: 'no-cors'});
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const price = doc.querySelector('.price span').textContent;
        document.getElementById('ripple').textContent = `XRP : ${price}`;
    } catch (error) {
        console.error('Erreur lors du scraping', error);
        document.getElementById('ripple').textContent = 'XRP : Erreur de chargement';
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

setInterval(fetchCryptoPrice, 10000);
fetchCryptoPrice();
