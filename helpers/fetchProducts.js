const fetchProducts = async (query) => {
  // const QUERY = 'computador';
  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    return Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
