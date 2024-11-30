const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const MAX_COMPARISONS = 5;
let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

// Fetch data from API
async function fetchCryptos() {
    try {
        const response = await fetch(`${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=10`);
        const data = await response.json();
        renderCryptoList(data);
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
    }
}

// Render cryptocurrency list
function renderCryptoList(data) {
    const tableBody = document.getElementById("crypto-table-body");
    tableBody.innerHTML = "";

    data.forEach((crypto) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${crypto.name}</td>
            <td>${crypto.symbol.toUpperCase()}</td>
            <td>$${crypto.current_price.toLocaleString()}</td>
            <td>${crypto.price_change_percentage_24h.toFixed(2)}%</td>
            <td>$${crypto.market_cap.toLocaleString()}</td>
            <td><button onclick="addToComparison('${crypto.id}')">Add</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Add cryptocurrency to comparison
function addToComparison(cryptoId) {
    if (selectedCryptos.length >= MAX_COMPARISONS) {
        alert("You can only compare up to 5 cryptocurrencies.");
        return;
    }

    fetch(`${API_URL}?vs_currency=usd&ids=${cryptoId}`)
        .then((response) => response.json())
        .then((data) => {
            selectedCryptos.push(data[0]);
            localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
            renderComparisonTable();
        })
        .catch((error) => console.error("Error adding to comparison:", error));
}

// Render comparison table
function renderComparisonTable() {
    const tableBody = document.getElementById("comparison-table-body");
    tableBody.innerHTML = "";

    selectedCryptos.forEach((crypto, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${crypto.name}</td>
            <td>${crypto.symbol.toUpperCase()}</td>
            <td>$${crypto.current_price.toLocaleString()}</td>
            <td>${crypto.price_change_percentage_24h.toFixed(2)}%</td>
            <td>$${crypto.market_cap.toLocaleString()}</td>
            <td><button onclick="removeFromComparison(${index})">Remove</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Remove cryptocurrency from comparison
function removeFromComparison(index) {
    selectedCryptos.splice(index, 1);
    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
    renderComparisonTable();
}

// Initialize application
function init() {
    fetchCryptos();
    renderComparisonTable();
    setInterval(fetchCryptos, 60000); // Update data every minute
}

document.addEventListener("DOMContentLoaded", init);
