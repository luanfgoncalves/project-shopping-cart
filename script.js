const createProductImageElement = (imageSource) => { // Gera a imagem do produto
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => { // Gera um objeto contendo nome da classe e inner text a partir dos dados da API
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => { // Cria a sessão dos produtos a partir da createCustomElement
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText; // recupera o inner Text do produto na loja a partir do sku

const createCartItemElement = ({ sku, name, salePrice }) => { // gera os itens dentro do carrinho
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener); não é mais necessario, nunca foi na real, só passou batido por 78346783 commits

  return li;
};

// ---------------------- Meu Código ----------------------

// Salva itens no local storage
const localStorageSaver = () => {
  const cartItemList = document.getElementsByClassName('cart__items')[0];
  saveCartItems(cartItemList.innerHTML);
};

// Gerador de Produtos: Através de um laço usa createProductItemElement para gerar os produtos a partir do retorno de fetchProducts
const productGenerator = async () => {
  const productContainer = document.getElementsByClassName('items')[0];// recupera a sessão items dentro de Containers, onde vão os produtos.
  productContainer.appendChild(createCustomElement('div', 'loading', 'carregando...')); // tem que ficar antes do fetch
  const data = await fetchProducts('computador');// constante com os dados de computadores da API
  document.getElementsByClassName('loading')[0].remove(); // remove o elemento com a classe loading
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
  cartItems.appendChild(createCartItemElement({ 
    sku: id,
    name: title,
    salePrice: price,
  }));
  localStorageSaver(); // ??? LEMBRAR aeeeeeee poha, funcionou !!!
};

// Adicionador de itens ao carrinho
const shopItemClickListener = async (event) => {
  if (event.target.className === 'item__add') {
    const productId = getSkuFromProductItem(event.target.parentElement);
    event.target.remove();
    return itemGenerator(productId);
  }
  localStorageSaver(); // tem que estar aqui para fazer a adição de multiplos itens
};

const cartItemClickListener = (event) => { // Remove os itens da lista no carrinho de compras - Função da trybe, retirei do lugar
  if (event.target.className === 'cart__item') {
    event.target.remove(); // remove os itens do carrinho
    localStorageSaver(); // salva os itens da lista quando um for removido
  }
};

// regenerador de botões
const buttonRegenerator = () => {
  const displayItems = document.querySelectorAll('.item');
  displayItems.forEach((element) => {
    if (element.childElementCount < 4) {
      element.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
    }
  });
};

// Limpa o carrinho de compra
const cartCleanerClickListener = async (event) => {
  const cartItemList = document.getElementsByClassName('cart__items')[0];
  if (event.target.className === 'empty-cart') {
    localStorage.clear(); // limpa o localstorage
    cartItemList.innerText = '';
    buttonRegenerator();
  }
};

// recupera itens do local storage
const localStorageGetter = () => {
  const cartItemList = document.querySelector('.cart__items');
  if (getSavedCartItems() !== null) {
    cartItemList.innerHTML = getSavedCartItems();
 }
};

// Calculadora de preços
// const priceManager = () => {
//   let cartItemsCost = 0; // valor inicial de custo dos produtos no carrinho
//   const cartItemList = document.getElementsByClassName('cart__items')[0];
//   cartItemList.forEach((element) => {
//     cartItemsCost
//   });
// };

// Gera eventListeners para as funções dependentes de cliques
const eventListenerGenerator = () => {
  document.addEventListener('click', cartItemClickListener);
  document.addEventListener('click', shopItemClickListener);
  document.addEventListener('click', cartCleanerClickListener);
};

// inicia o código da página
const start = async () => {
  await productGenerator();
  await localStorageGetter();
  eventListenerGenerator();
};

window.onload = () => { 
  start();
};

// Referencias: 
// https://www.w3schools.com/jsref/met_element_remove.asp
// https://reactgo.com/check-local-storage-key-exists-js/
// https://www.w3schools.com/jsref/prop_element_childelementcount.asp
