async function fetchPrintfulProducts() {
    try {
        const response = await fetch('https://api.printful.com/store/products', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer zRK22VCAhBiWanqQzO5uVspwnigqlaxbFUgdGViTRCHtrJsJPYfKk5lDQIx7YHcU',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.result) {
            displayProducts(data.result);
        } else {
            console.error('No products found in response:', data);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        const merchStore = document.getElementById('merch-store');
        merchStore.innerHTML = '<p>Unable to load products at this time. Please try again later.</p>';
    }
}

function displayProducts(products) {
    const merchStore = document.getElementById('merch-store');
    merchStore.innerHTML = ''; // Clear existing content

    if (!products.length) {
        merchStore.innerHTML = '<p>No products available at this time.</p>';
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        
        // Get the first variant's price if available
        const price = product.sync_variants?.[0]?.retail_price || 'Price not available';
        
        productElement.innerHTML = `
            <h2>${product.name || 'Untitled Product'}</h2>
            <img src="${product.thumbnail_url || 'placeholder.jpg'}" alt="${product.name || 'Product Image'}">
            <p>Price: ${price}</p>
            <button onclick="window.open('${product.external_url || '#'}', '_blank')">Buy Now</button>
        `;
        merchStore.appendChild(productElement);
    });
}

// Wait for DOM to be fully loaded before fetching products
document.addEventListener('DOMContentLoaded', fetchPrintfulProducts); 