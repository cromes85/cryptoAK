const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price";
const cryptos = ["ripple", "velo", "hund"];
const currency = "eur";

let countdownValue = 10;

async function scrapeCryptoPrice(url, coinId, elementId) {
  try {
    // Récupération de la page HTML de la crypto
    const response = await fetch(url);
    const htmlText = await response.text();
    
    // Création d'un objet DOM à partir du texte HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    // Sélection du prix avec le bon sélecteur CSS
    const priceElement = doc.querySelector('.coin-price');
    if (priceElement) {
      const price = priceElement.textContent.trim(); // On enlève les espaces inutiles
      document.getElementById(elementId).textContent = `${coinId.toUpperCase()} : ${price}`;
    } else {
      document.getElementById(elementId).textContent = `${coinId.toUpperCase()} : Prix introuvable`;
    }
  } catch (error) {
    console.error('Erreur lors du scraping', error);
    document.getElementById(elementId).textContent = `${coinId.toUpperCase()} : Erreur de chargement`;
  }
}

// Fonction pour mettre à jour toutes les cryptos
function updatePrices() {
  scrapeCryptoPrice('https://coincodex.com/crypto/ripple/', 'ripple', 'ripple');
  scrapeCryptoPrice('https://coincodex.com/crypto/velo/', 'velo', 'velo');
  scrapeCryptoPrice('https://coincodex.com/crypto/hund/', 'hund', 'hund');
}

// Rafraîchissement toutes les 10 secondes
setInterval(updatePrices, 10000);
updatePrices(); // Initialiser la première récupération

