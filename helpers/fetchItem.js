const fetchItem = async (item) => {
  const URL = `https://api.mercadolibre.com/${item}`;
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
