const fetchProducts = async (computador) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  try {
    const productsData = await fetch(endpoint);
    return productsData.json();
  } catch (error) {
    return new Error('You must provide an url');
  }
  // products.forEach((product) => {
  //   const productCard = createProductItemElement(product);
  //   productsSelection.appendChild(productCard);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
