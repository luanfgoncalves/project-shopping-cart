require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  test('se, com o argumento computador e teste se fetch foi chamada', async () => {
    await fetchProducts('computador') // 1- chame a função, para o fetch poder capturar o que foi chamado.
    expect(fetch).toHaveBeenCalled(); // tem que verificar se o fetch foi chamado, não a função em si.
  });

  test('se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const expected = 'https://api.mercadolibre.com/sites/MLB/search?q=computador' // define o endpoint - requerimento não precisa ser assincrono
    await fetchProducts('computador'); // chama a função pro fetch poder pegar
    expect(fetch).toHaveBeenCalledWith(expected); // verificar o argumento com que a função foi chamada
  });

  test('se, o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const test = await fetchProducts('computador');
    //await fetchProducts('computador'); // chama a função pro fetch poder pegar
    expect(test).toEqual(computadorSearch); // verificar o retorno de fetch é exatamente igual 'computadorSearch'
  });

  test('se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const callForcedError = await fetchProducts(); 
    const expectedError = new Error("You must provide an url"); // define o erro
    expect(callForcedError).toEqual(expectedError);
  });
});
