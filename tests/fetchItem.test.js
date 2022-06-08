require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('se se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  test('se, com ao chamar fetchItems com argumento MLB1615760527, fetch foi chamada', async () => {
    await fetchItems('MLB1615760527') // 1- chame a função, para o fetch poder capturar o que foi chamado.
    expect(fetch).toHaveBeenCalled(); // tem que verificar se o fetch foi chamado, não a função em si.
  });
  test('se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const expected = 'https://api.mercadolibre.com/items/MLB1615760527' // define o endpoint - requerimento não precisa ser assincrono
    await fetchItem('MLB1615760527') // chama a função pro fetch poder pegar
    expect(fetch).toHaveBeenCalledWith(expected); // verificar o argumento com que a função foi chamada
  });
  test('se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', () => {
    await fetchItem('MLB1615760527') // chama a função pro fetch poder pegar
    expect(fetch).toStrictlyEqual(item); // verificar o retorno de fetch é exatamente igual 'item'
  });
  test('se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', (done) => {
    const expectedError = new Error("You must provide an url"); // define o erro
    fetchItem(); // chama a função para o fetch poder pegar
    function callback(err, result){
      try {
        expect(err).toEqual(expectedError); // verifica se o erro foi igual ao esperado.
        done();
      } catch (error) {
        done(error);
      }
    }
  });
});
