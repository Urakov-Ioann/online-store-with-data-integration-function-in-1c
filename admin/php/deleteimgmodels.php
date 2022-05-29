<?php
    $image = $_POST['mimage'];
    $filePath = __DIR__ . "\..\..\images\models\\" . $image;
    unlink($filePath);
?>