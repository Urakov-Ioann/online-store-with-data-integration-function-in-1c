var cart = {};

function init() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        viewMiniCart();
        }
    $.post(
        "admin/php/core.php",
        {
            "action" : "loadGoods"
        }, 
        goodsOut
    );
}

function goodsOut(data) {
    var pdata = JSON.parse(data);
    console.log(pdata);
    var out='';
    for (var key in pdata) {
        out +='<div class="cart">';
        out +=`<p class="name">${pdata[key].Name}</p>`;
        out +=`<a href = "http://localhost/InternetShop(Ivan)/php/product.php?id=${key}"><img class="image-product" src="images/products/${pdata[key].Image}" alt=""></a>`;
        out +=`<div class="cost">${pdata[key].Cost} р.</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    var id = $(this).attr('data-id');
    if (cart[id]==undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    console.log(cart);
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

$('#find-by-vin').click(function(){
    var vin = document.getElementById('vin').value;
    var modelVin = vin[5];
    document.location=`http://localhost/InternetShop(Ivan)/php/forVIN.php?VIN=${modelVin}`;
});

$(document).ready(function () {
    init();
});
