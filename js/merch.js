async function fetchPrintfulProducts() {
    const response = await fetch('https://api.printful.com/', {
        headers: {
            'Authorization': 'zRK22VCAhBiWanqQzO5uVspwnigqlaxbFUgdGViTRCHtrJsJPYfKk5lDQIx7YHcU'
        }
    });
    const data = await response.json();
    displayProducts(data.result);
}

function displayProducts(products) {
    const merchStore = document.getElementById('merch-store');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.thumbnail_url}" alt="${product.name}">
            <p>Price: $${product.price}</p>
        `;
        merchStore.appendChild(productElement);
    });
}

fetchPrintfulProducts(); 