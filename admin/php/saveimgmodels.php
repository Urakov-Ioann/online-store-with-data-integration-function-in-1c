<?php
	if(!empty($_FILES['image']['tmp_name'])){
		echo $_FILES['image']['tmp_name'];
		$filePath = __DIR__ . "\..\..\images\models\\" . $_FILES['image']['name'];
		copy($_FILES['image']['tmp_name'], $filePath);
	}
?>