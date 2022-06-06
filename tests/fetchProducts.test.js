require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  test('se, com o argumento computador e teste se fetch foi chamada', async () => {
    expect(typeof fetchProducts('computador')).toHaveBeenCalled(); // não funcionou 
  });
  test('se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect(typeof fetchProducts('computador')).toHaveBeenCalled();
  });
  test('se, o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(typeof fetchProducts('computador')).toHaveBeenCalled();
  });
  test('se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    expect(typeof fetchProducts('computador')).toHaveBeenCalled();
  });
});
