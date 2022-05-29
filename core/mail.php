<?php
$action = 'rinit';
require_once '../admin/php/core.php';
$json = json_decode(rinit(), true);

$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .='<p>Телефон: '.$_POST['ephone'].'</p>';
$message .='<p>Почта: '.$_POST['email'].'</p>';
$message .='<p>Клиент: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id=>$count) {
    $message .='Название: '.$json[$id]['Name'].' --- ';
    $message .='Артикул: '.$json[$id]['SKU'].' --- ';
    $message .='Количество: '.$count.' --- ';
    $message .='Стоимость: '.$count*$json[$id]['Cost'];
    $message .='<br>';
    $sum = $sum +$count*$json[$id]['Cost'];
}
$message .='Всего: '.$sum;

$to = 'dmitrylannmart@gmail.com';
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Заказ в магазине', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;}

