const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// ---------------------- Meu Código ----------------------

// Gerador de Produtos: Através de um laço usa createProductItemElement para gerar os produtos a partir do retorno de fetchProducts
const productGenerator = async () => {
  const productContainer = document.getElementsByClassName('items')[0];// recupera a sessão items dentro de Containers, onde vão os produtos.
  const data = await fetchProducts('computador');// constante com os dados de computadores da API
  data.results.forEach((element) => { // loop que passa por todos elementos de data
    const { title, id, thumbnail } = element;// cria constantes para os elementos usados dentro de data
    productContainer.appendChild(createProductItemElement({ 
      sku: id, 
      name: title, 
      image: thumbnail,
    }));// usa createProducts para adicionar produtos em Itens dentro do HTML
  });
};

// Gerador de itens do carrinho: Basicamente o productGenerator modificado p/ usar
const itemGenerator = async (element) => {
  const cartItems = document.getElementsByClassName('cart__items')[0];
  const data = await fetchItem(element); // constante com dados retornados de fetch items
  const { id, title, price } = data;// desestrutura os elementos 
  cartItems.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
};

window.onload = () => { 
  productGenerator();
};

// Lógica e Organização
// 0 - fetchProducts e fetchItems funcionam - OK
// 1 - Criar função que recupera os produtos da API e cria um display pra elas. (productGenerator) - OK?
// 2 - Criar função que recupere os dados do produto ao clicar(evtListener) em Adicionar ao carrinho, e crie uma copia dentro da sessão Cart.
// 3 - Lorem Ipsum

// cartItemClickListener usa getSkuFromProductItem no item clicado, o dado recuperado é usado por fetchItem para pegar os dados do produto na API e adicionar ele ao carrinho
