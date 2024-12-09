document.getElementById("refresh-button").addEventListener("click", function() {
    getCryptoData();
  });
  
  function getCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
    });
  
    fetch(`${url}?${params}`)
      .then(response => response.json())
      .then(data => {
        updateCryptoTable(data);
        updateMarketStats(data); // Mengupdate Market Cap, Volume, dan BTC Dominance
      })
      .catch(error => {
        console.error('There was an error fetching market data:', error);
      });
  }
  
  // Fungsi untuk memperbarui tabel cryptocurrency
  function updateCryptoTable(data) {
    const cryptoTable = document.getElementById("crypto-table");
    cryptoTable.innerHTML = ''; // Menghapus data lama sebelum menambahkan yang baru
  
    data.forEach((crypto, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${crypto.image}" alt="${crypto.name}" width="24" height="24" /> ${crypto.name} (${crypto.symbol.toUpperCase()})</td>
        <td>$${crypto.current_price.toLocaleString()}</td>
        <td style="color: ${crypto.price_change_percentage_24h < 0 ? 'red' : 'green'};">
          ${crypto.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>$${crypto.market_cap.toLocaleString()}</td>
      `;
      cryptoTable.appendChild(row);
    });
  }
  
  // Fungsi untuk memperbarui market cap, volume, dan btc dominance
  function updateMarketStats(data) {
    let totalMarketCap = 0;
    let totalVolume = 0;
    let btcDominance = 0;
  
    data.forEach(crypto => {
      totalMarketCap += crypto.market_cap;
      totalVolume += crypto.total_volume;
    });
  
    // Menghitung BTC Dominance berdasarkan market cap Bitcoin
    const btcData = data.find(crypto => crypto.symbol === 'btc');
    if (btcData) {
      btcDominance = (btcData.market_cap / totalMarketCap) * 100;
    }
  
    // Memperbarui nilai Market Cap, Volume, dan BTC Dominance
    document.getElementById("market-cap").textContent = `$${totalMarketCap.toLocaleString()}`;
    document.getElementById("volume-24h").textContent = `$${totalVolume.toLocaleString()}`;
    document.getElementById("btc-dominance").textContent = `${btcDominance.toFixed(2)}%`;
  }
  
  // Memanggil fungsi untuk mengambil data saat pertama kali halaman dimuat
  getCryptoData();
  