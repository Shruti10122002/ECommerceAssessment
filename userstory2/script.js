document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('productList');
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const catFilter = document.getElementById('categoryFilter');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  let products = [];

  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Internet issue');
    products = await res.json();

    // Fill categories
    const cats = [...new Set(products.map(p => p.category))];
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      catFilter.appendChild(opt);
    });

    render();
    loading.style.display = 'none';
  } catch (err) {
    error.textContent = 'Failed to load products. Check internet.';
    error.classList.remove('d-none');
    loading.style.display = 'none';
  }

  function render() {
    const cat = catFilter.value;
    const max = +priceRange.value;

    const filtered = products.filter(p => 
      (!cat || p.category === cat) && p.price <= max
    );

    list.innerHTML = filtered.map(p => `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.title.substring(0, 30)}...</h5>
            <p class="card-text">${p.category}</p>
            <p class="card-text fw-bold mt-auto">$${p.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    `).join('');

    if (filtered.length === 0) {
      list.innerHTML = '<div class="col-12 text-center text-muted">No products found.</div>';
    }
  }

  catFilter.onchange = render;
  priceRange.oninput = () => {
    priceValue.textContent = priceRange.value;
    render();
  };
});