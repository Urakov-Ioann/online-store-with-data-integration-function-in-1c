var cart = {};

let loader = document.getElementById('loading');
function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.post(
            "admin/php/core.php",
            {
                "action" : "loadGoods"
            },
            function (data) {
                var goods = JSON.parse(data);
                var out = '';
                for (var id in cart) {
                    out += `<button data-id="${id}" class="del-goods">x</button>`;
                    out += `<img src="images/products\\${goods[id].Image}">`;
                    out += ` ${goods[id].Name  }`;
                    out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                    out += ` ${cart[id]}  `;
                    out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
                    out += cart[id]*goods[id].Cost;
                    out += '<br>';
                }
                $('.main-cart').html(out);
                $('.del-goods').on('click', delGoods);
                $('.plus-goods').on('click', plusGoods);
                $('.minus-goods').on('click', minusGoods);
            }
        );
    }
}

function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function newCustomer(crname, crnumber, cremail){
    $.post(
        "../admin/php/core.php",
        {
            "action": "newCustomer",
            "crname" : crname,
            "crnumber" : crnumber,
            "cremail" : cremail
        },
        function(data){
            if (data==1) {
                
            }
            else {
                console.log(data);
            }
        }
    );
      
}

function newCustom(){
    $.post(
        "../admin/php/core.php",
        {
            "action": "newCustom",
            "crname" : crname,
            "crnumber" : crnumber,
            "cremail" : cremail
        },
        function(data){
            if (data==1) {
                
            }
            else {
                console.log(data);
            }
        }
    );
}

function newCustomProduct(){
    $.post(
        "../admin/php/core.php",
        {
            "action": "newCustomProduct",
            "crname" : crname,
            "crnumber" : crnumber,
            "cremail" : cremail
        },
        function(data){
            if (data==1) {
                
            }
            else {
                console.log(data);
            }
        }
    );
}

function saveEmailData(ename, email, ephone){
    $.post(
        "admin/php/core.php",
        {
            "action": "saveEmailData",
            "ename" : ename,
            "email" : email,
            "ephone" : ephone,
            "cart" : cart
        },
        function(data){
            if (data==1) {
                alert('Информация добавлена');
            }
            else {
                alert('Повторите заказ');
            }
        }
    );
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            loader.style.display = 'flex';
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data==1) {
                        saveEmailData(ename, email, ephone);
                        alert('Заказ отправлен');
                        localStorage.removeItem('cart');
                    }
                    else {
                        alert('Повторите заказ');
                    }
                    loader.style.display = 'none';
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }
}


$(document).ready(function () {
   loadCart();
   $('.send-email').on('click', sendEmail);
});