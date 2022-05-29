<?php
    $image = $_POST['gimage'];
    $filePath = __DIR__ . "\..\..\images\products\\" . $image;
    unlink($filePath);
?>