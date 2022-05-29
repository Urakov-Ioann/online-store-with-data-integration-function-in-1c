cart = {};

function loadParts(VIN){
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        viewMiniCart();
        }
    $.post(
        "../admin/php/core.php",
        {
            "action" : "loadVINGoods"
            ,"VIN" : VIN
        }, 
        function (data) {
            console.log(data);
            var goods = JSON.parse(data);
            var out = '';
            console.log(goods);
            for (var key in goods) {
                out +='<div class="cart">';
                out +=`<p class="name">${goods[key].Name}</p>`;
                out +=`<a href = "http://localhost/InternetShop(Ivan)/php/product.php?id=${key}"><img class="image-product" src="../images/products\\${goods[key].Image}" alt=""></a>`
                out +=`<div class="cost">${goods[key].Cost}</div>`;
                out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
                out +='</div>';
            }
            $('.main-model').html(out);
            $('.add-to-cart').on('click', addToCart);
            $('.image-product').on('click', goToProduct);
        }
    );
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