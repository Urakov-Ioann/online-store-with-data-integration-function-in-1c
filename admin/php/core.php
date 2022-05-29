<?php
if(isset($_POST['action'])){
    $action = $_POST['action'];
}
if(!isset($action) || $action == "savEmailData")
{
    $action = 'rinit';
}
if(isset($_POST['modelId'])){
    $modelId = $_POST['modelId'];
}
if(isset($_POST['PartId'])){
    $PartId = $_POST['PartId'];
}
if(isset($_POST['VIN'])){
    $VIN = $_POST['VIN'];
}

require_once 'function.php';
switch ($action) {
    case 'init':
        init();
        break;
    case 'rinit':
        break;
    case 'initmodels':
        initmodels();
        break;
    case 'selectOneGoods':
        selectOneGoods();
        break;
    case 'selectModels':
        selectModels();
        break;
    case 'updateGoods':
        updateGoods();
        break;
    case 'updateModels':
        updateModels();
        break;
    case 'newGoods':
        newGoods();
        break;
    case 'newModels':
        newModels();
        break;
    case 'newPartModel':
        newPartModel();
        break;
    case 'saveEmailData':
        saveEmailData();
        break;
    case 'deleteGoods':
        deleteGoods();
        break;
    case 'deleteModels':
        deleteModels();
        break;
    case 'deletePartModel':
        deletePartModel();
        break;
    case 'loadGoods':
        loadGoods();
        break;
    case 'loadModelGoods':
        loadModelGoods($modelId);
        break;
    case 'loadModels':
        loadModels();
        break;
    case 'loadGoodModels':
        loadGoodModels($PartId);
        break;
    case 'loadVINGoods':
        loadVINGoods($VIN);
        break;
    default : 
    echo 2;
}
?>