async function fetchPrintfulProducts() {
    try {
        console.log('Fetching products...'); // Debug log
        const response = await fetch('https://api.printful.com/store/products', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer Tw8zYt5zspLYc22WifHhqtOV3FuznsIF4QcjvgFC',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log('Response status:', response.status); // Debug log
        const data = await response.json();
        console.log('Response data:', data); // Debug log

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (data.result) {
            displayProducts(data.result);
        } else {
            console.error('No products found in response:', data);
            const merchStore = document.getElementById('merch-store');
            merchStore.innerHTML = `<p class="no-products-text">No products available at this time.</p>`;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        const merchStore = document.getElementById('merch-store');
        merchStore.innerHTML = `<p class="error-text">Unable to load products at this time. Please try again later.</p>`;
    }
}

function displayProducts(products) {
    const merchStore = document.getElementById('merch-store');
    merchStore.innerHTML = ''; // Clear existing content

    if (!products.length) {
        merchStore.innerHTML = `<p class="no-products-text">No products available at this time.</p>`;
        return;
    }

    const productElements = products.map((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        
        // Get the first variant's price if available
        const price = product.sync_variants?.[0]?.retail_price || 'Price not available';
        
        const template = document.createElement('template');
        template.innerHTML = `
            <h2>${product.name || 'Untitled Product'}</h2>
            <img src="${product.thumbnail_url || 'placeholder.jpg'}" alt="${product.name || 'Product Image'}">
            <p>Price: ${price}</p>
            <button class="buy-button" data-url="${product.external_url || '#'}" data-product-index="${index}">Buy Now</button>
        `;
        
        productElement.appendChild(template.content);
        return productElement;
    });

    productElements.forEach(element => merchStore.appendChild(element));

    // Add event listeners to all buy buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
}

// Wait for DOM to be fully loaded before fetching products
document.addEventListener('DOMContentLoaded', fetchPrintfulProducts); 