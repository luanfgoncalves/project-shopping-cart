require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('se se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  test('se, com o argumento MLB1615760527 e teste se fetch foi chamada', async () => {
    await fetchItems('MLB1615760527') // 1- chame a função, para o fetch poder capturar o que foi chamado.
    expect(fetch).toHaveBeenCalled(); // tem que verificar se o fetch foi chamado, não a função em si.
  });
  fail('Teste vazio');
});
