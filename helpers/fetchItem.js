const fetchItem = async (item) => {
  const URL = `https://api.mercadolibre.com/${item}`;
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    return new Error('You must provide an url');
  }
};
fetchItem();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
