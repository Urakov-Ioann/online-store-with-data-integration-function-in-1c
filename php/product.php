<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header></header>
<main>
    <a style="position: absolute; right: 220px; color: green;" href="http://localhost/InternetShop(Ivan)/cart.html"><img style="width: 24px;" src="../images/cart.png"></a><a style="display: inline-block; position: absolute; right: 80px; color: green;">Товаров в корзине:</a><a class="cart-count" style="display: inline-block; position: absolute; right: 60px; color: red;"></a>
    <div class="main-product"></div>
</main>
<footer></footer>
<script src="../js/jquery-3.2.1.min.js"></script>
<script src="../js/product.js"></script>
<script>
    $(document).ready(function(){
    loadProduct(<?php echo $_GET['id'];?>)
})
</script>
</body>
</html>