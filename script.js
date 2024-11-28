async function scrapeCryptoPrice(url, coinId, elementId) {
  try {
    // Faire la requête avec 'no-cors' (sans possibilité de lire la réponse)
    const response = await fetch(url, { mode: 'no-cors' });
    
    // Tentative pour récupérer du texte de la page (réponse opaque)
    const htmlText = await response.text();
    
    // Création d'un parser HTML pour analyser la page
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    // Sélectionner l'élément contenant le prix (adapté selon la structure de CoinCodex)
    const priceElement = doc.querySelector('.coin-price');
    if (priceElement) {
      const price = priceElement.textContent.trim();
      document.getElementById(elementId).textContent = `${coinId.toUpperCase()} : ${price}`;
    } else {
      document.getElementById(elementId).textContent = `${coinId.toUpperCase()} : Prix introuvable`;
    }
  } catch (error) {
    console.error('Erreur lors du scraping', error);
    document.getElementById(elementId).textContent = `${coinId.toUpperCase()} : Erreur de chargement`;
  }
}

function updatePrices() {
  console.log('Fetching crypto prices...');
  scrapeCryptoPrice('https://coincodex.com/crypto/ripple/', 'XRP', 'priceXRP');
  scrapeCryptoPrice('https://coincodex.com/crypto/velo/', 'VELO', 'priceVelo');
  scrapeCryptoPrice('https://coincodex.com/crypto/hund/', 'HUND', 'priceHund');
}

// Met à jour toutes les 30 secondes
setInterval(updatePrices, 30000);
