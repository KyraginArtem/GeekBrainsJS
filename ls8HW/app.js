'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

// Мой код
//Создаем класс продукт
class Product {
    constructor(id, nameProd, featureText, price, imageUrl) {
        this.id = id;
        this.nameProd = nameProd;
        this.featureText = featureText;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    get getProduct() {
        let arr = [this.nameProd, this.price];
        return  arr;
    }

    //метод для отрисовки блока с продуктом
    getProductMarkup() {
        return `
            <div class="featuredItem">
                <div class="featuredImgWrap">
                    <img src="${this.imageUrl}" alt="">
                    <div class="featuredImgDark" data-set="${this.id}">
                        <button>
                            <img src="images/cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div class="featuredData">
                    <div class="featuredName">
                        ${this.nameProd}
                 </div>
                    <div class="featuredText">
                        ${this.featureText}
                 </div>
                    <div class="featuredPrice">
                        $${this.price}
                    </div>
                </div>
            </div>
         `;
    }
}

//Продукт добавляемый в карзину
class ProductInCart {
    constructor(nameProd, price, quantityGoods) {
        this.nameProd = nameProd;
        this.price = price;
        this.quantityGoods = quantityGoods;
    }

    getProductInCart() {
        return `
            <tr class="addProduct">
                <td>${this.nameProd}</td>
                <td>${this.quantityGoods}</td>
                <td>$${this.price}</td>
                <td>$${this.quantityGoods * this.price}</td>
            </tr>
        `
    }
}
  
//Описание продуктов
let prodDescript = "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi."

//массив с обьектами продуктов.
const products = 
    [
      new Product(0, "Prod1", prodDescript, 52, "images/featured/1.jpg"),
      new Product(1, "Prod2", prodDescript, 46, "images/featured/2.jpg"),
      new Product(2, "Prod3", prodDescript, 13, "images/featured/3.jpg"),
      new Product(3, "Prod4", prodDescript, 192, "images/featured/4.jpg"),
      new Product(4, "Prod5", prodDescript, 60, "images/featured/5.jpg"),
      new Product(5, "Prod6", prodDescript, 15, "images/featured/6.jpg"),
];

//заполняем сайт продуктами
const featuredItemsEl = document.querySelector('.featuredItems');
featuredItemsEl.innerHTML = products.map(product =>
     product.getProductMarkup()).join('');

//Находим поле карзины
const addProdButtonsEl = document.querySelectorAll('.featuredImgDark');
const goodsCountEl = document.querySelector('.cartIconWrap span');
const cartPopupTotalEl = document.querySelector('.cartPopupTotal');
//карзина
let arrCart = []; 

//событие добавление продукта в корзину
//контейнер для добавления эл.
const containerPopupCartEl = document.querySelector('.containerPopup');
addProdButtonsEl.forEach(el => {
    el.addEventListener('click', function() {
        //получаем название выбранного товара
        //ВОПРОС: тут как нибудь можно было по другому поймать на какой обьект ткнули?
        const elemArr = products[el.dataset.set].getProduct;
        //обработчик элем. добавляемых в корзину
        cartHandler(elemArr);

        //заполняем корзину продуктами
        containerPopupCartEl.innerHTML = arrCart.map(productInCart => 
        productInCart.getProductInCart()).join('');

        //Получаем значение итоговой суммы
        getTotalSumm(arrCart);
    });
});

//Вызов корзины
const cartIconWrapEl = document.querySelector('.cartIconWrap');
const cartPopupEl = document.querySelector('.cartPopup');

cartIconWrapEl.addEventListener('click', elem => {
   cartPopupEl.classList.toggle('hidden');
});

function getTotalSumm(arrCart) {
    let total = 0;
        arrCart.forEach(elem => {
            total += elem.price * elem.quantityGoods;
        });
    cartPopupTotalEl.innerHTML = 'Товаров в корзине на сумму: $' + total;
}

//Функция обработки карзины, добавляет или увеличивает 
function cartHandler(elemArr) {
    //Прибавляем значеине к индикатору корзины
    goodsCountEl.textContent = +goodsCountEl.textContent + 1;

    //если карзина не пустая
    if(arrCart.length !== 0) { 
        for(let i = 0; i < arrCart.length; i++) {
            //если в карзине уже есть выбраный товар
            if(arrCart[i].nameProd === elemArr[0]){
                arrCart[i].quantityGoods++;
                break;
            //если карзина не пустая но выбранного товара нет
            } else if(i === arrCart.length-1) {
                arrCart.push(new ProductInCart(elemArr[0], elemArr[1], 1));
                break;
            }
        }
    } else {
        //если карзина пустая
        arrCart.push(new ProductInCart(elemArr[0], elemArr[1], 1));
    }
 }

 

