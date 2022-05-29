cart = {};

function loadProduct(id){
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        viewMiniCart();
        }
    showProduct(id);
}

var models = '';

async function showProduct(id){
    await loadGoodModels(id); 
    $.post(
        "../admin/php/core.php",
        {
            "action" : "loadGoods"
        }
        , function (data) {
            var goods = JSON.parse(data);
            var out = '';
            out +='<div class="product">';
            out += `<h3 class="name">Название: ${goods[id].Name}</h3>`;
            out += `<p>Цена: ${goods[id].Cost}</p>`;
            out += `<p>Артикул: ${goods[id].SKU}</p>`;
            out += `<p>Производитель: ${goods[id].Manufacturer}</p>`;
            out += `<p>Категория: ${goods[id].Category}</p>`;
            out += `<p>Описание: ${goods[id].Description}</p>`;
            out += `<p>Подходит для моделей: ${models}</p>`;
            out += `<img src="../images/products\\${goods[id].Image}">`;
            out += '<br>';
            out +=`<button class="add-to-cart" data-id="${id}">Купить</button>`;
            out +='</div>';
            $('.main-product').html(out);
            $('.add-to-cart').on('click', addToCart);
            $('.image-product').on('click', goToProduct);
    });
}

function goToProduct(){
    var id = $(this).attr('data-id');
    product[id] = 1;
    localStorage.setItem('product', JSON.stringify(product));
}

function addToCart() {
    var id = $(this).attr('data-id');
     console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    viewMiniCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function viewMiniCart() {
    var sum = 0;
    for (var key in cart) {
        sum += cart[key];
    }
    $('.cart-count').html(sum);
}

async function loadGoodModels(PartId){
    await $.post(
        "../admin/php/core.php",
        {
            "action" : "loadGoodModels"
            ,"PartId" : PartId
        },
        function(data){
            var goods = JSON.parse(data);
            for(var key in goods){
                models += goods[key].Name + ', ';
            }
            models = models.substring(0, models.length - 2);
            models = models + '.';
        }
    )
}