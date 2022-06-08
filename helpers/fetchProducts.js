const fetchProducts = async (computador) => {
  const QUERY = 'computador';
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    return new Error('You must provide an url');
  }
  // products.forEach((product) => {
  //   const productCard = createProductItemElement(product);
  //   productsSelection.appendChild(productCard);
};
fetchProducts()

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
