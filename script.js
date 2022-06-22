const createProductImageElement = (imageSource) => { // Gera a imagem do produto
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
// usar pro loading ?
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
  // button.addEventListener('click', () => { itemGenerator(sku); });

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText; // recupera o inner Text do produto na loja a partir do sku

const cartItemClickListener = (event) => { // CORRIGIR Remove os itens da lista no carrinho de compras
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => { // gera os itens dentro do carrinho
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// ---------------------- Meu Código ----------------------

// Insere a mensagem de carregamento ao iniciar a página

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
};

// Adicionador de itens ao carrinho
const shopItemClickListener = async (event) => {
  if (event.target.className === 'item__add') {
    const productId = getSkuFromProductItem(event.target.parentElement);
    // console.log(productId);
    return itemGenerator(productId);
  }
};

// Limpa o carrinho de compra
const cartCleanerClickListener = (event) => {
  const cartItemList = document.getElementsByClassName('cart__items')[0];
  if (event.target.className === 'empty-cart') {
    // console.log('fui clicado');
    cartItemList.innerText = '';
  }
};

// inicia o código da página
// const start = () => {
//   productGenerator();
//   document.addEventListener('click', cartItemClickListener);
//   document.addEventListener('click', shopItemClickListener);
// };

window.onload = () => { 
  productGenerator();
  // document.addEventListener('click', cartItemClickListener);
  document.addEventListener('click', shopItemClickListener);
  document.addEventListener('click', cartCleanerClickListener);
};

// Lógica e Organização
// 0 - fetchProducts e fetchItems funcionam - OK
// 1 - Criar função que recupera os produtos da API e cria um display pra elas. (productGenerator) - OK?
// 2 - Criar função que recupere os dados do produto ao clicar(evtListener) em Adicionar ao carrinho, e crie uma copia dentro da sessão Cart.
// 3 - adiciona eventLisners para os botões dos itens no shopping(shopItemClickListener)
// 4 - 
// cartItemClickListener usa getSkuFromProductItem no item clicado, o dado recuperado é usado por fetchItem para pegar os dados do produto na API e adicionar ele ao carrinho

// Referencias: https://www.w3schools.com/jsref/met_element_remove.asp
