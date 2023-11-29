let currentPage = 1;

function fetchProducts(page) {
  fetch(`/api/products?limit=10&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      const products = data.payload;
      const productContainer = document.querySelector('.product-list');
      productContainer.innerHTML = '';

      products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.classList.add('mb-4');
        productElement.setAttribute('style', 'width: 18rem;');

        productElement.innerHTML = `
        <div class="card mx-2">
          <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <h4 class="card-subtitle mb-2 text-muted">${product.category}</h4>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Price: ${product.price}</p>
          </div>
        </div>
          `;
        productContainer.appendChild(productElement);
      });

      const paginationButtons = document.querySelector('.pagination');
      paginationButtons.innerHTML = '';

      if (data.hasPrevPage) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('btn');
        prevButton.classList.add('btn-primary');
        prevButton.classList.add('m-1');

        prevButton.addEventListener('click', () =>
          fetchProducts(data.prevPage)
        );
        paginationButtons.appendChild(prevButton);
      }

      if (data.hasNextPage) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('btn');
        nextButton.classList.add('btn-primary');
        nextButton.classList.add('m-1');
        nextButton.addEventListener('click', () =>
          fetchProducts(data.nextPage)
        );
        paginationButtons.appendChild(nextButton);
      }
    })
    .catch((error) => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  fetchProducts(currentPage);
});
