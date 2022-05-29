<?php

require_once 'Connect.php';

function init(){
    $conn = connect();
    $sql = "SELECT * FROM autoparts";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function initmodels(){
    $conn = connect();
    $sql = "SELECT * FROM models";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function rinit(){
    $conn = connect();
    $sql = "SELECT * FROM autoparts";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        return json_encode($out);
    } else {
        return "0";
    }
    mysqli_close($conn);
}

function selectOneGoods(){
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM autoparts WHERE ID = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectModels(){
    $conn = connect();
    $id = $_POST['mid'];
    $sql = "SELECT * FROM models WHERE ID = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updateGoods(){
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $sku = $_POST['gsku'];
    $manufacturer = $_POST['gmanufacturer'];
    $category = $_POST['gcategory'];
    $descr = $_POST['gdescr'];
    $img = '';
    if(isset($_POST['gimg'])){
        $img = $_POST['gimg'];
    }

    $sql = "UPDATE autoparts SET Name = '$name', Cost = '$cost', SKU = '$sku', Manufacturer = '$manufacturer', Description = '$descr', ".(isset($_POST['gimg']) ? " Image = '$img' ," : "")." Category = '$category' WHERE id = '$id'";

    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function updateModels(){
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['mname'];
    $VIN = $_POST['mvin'];
    $img = '';
    if(isset($_POST['mimg'])){
        $img = $_POST['mimg'];
    }

    $sql = "UPDATE models SET Name = '$name' ".(isset($_POST['mimg']) ? ", Image = '$img' " : "").", VIN = '$VIN' WHERE id = '$id'";

    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function newGoods(){
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $sku = $_POST['gsku'];
    $manufacturer = $_POST['gmanufacturer'];
    $category = $_POST['gcategory'];
    $descr = $_POST['gdescr'];
    $img = '';
    if(isset($_POST['gimg'])){
        $img = $_POST['gimg'];
    }

    $sql = "INSERT INTO autoparts (Name, Cost, SKU, Manufacturer, Description, Image, Category) VALUES ('$name', '$cost', '$sku', '$manufacturer', '$descr', '$img', '$category')";

    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function newModels(){
    $conn = connect();
    $id = $_POST['id'];
    $name = $_POST['mname'];
    $VIN = $_POST['mvin'];
    $img = '';
    if(isset($_POST['mimg'])){
        $img = $_POST['mimg'];
    }

    $sql = "INSERT INTO models (Name, Image, VIN) VALUES ('$name', '$img', '$VIN')";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function newPartModel(){
    $conn = connect();
    $mid = $_POST['mid'];
    $pid = $_POST['pid'];

    $sql = "INSERT INTO partmodel (PartID, ModelId) VALUES ('$pid', '$mid')";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function saveEmailData(){
    $conn = connect();
    $ename = $_POST['ename'];
    $ephone = $_POST['ephone'];
    $email = $_POST['email'];
 
    $crid = "SELECT ID FROM customers WHERE CustomerName = '$ename' AND CustomerNumber = '$ephone' AND CustomerEmail = '$email'";
    $result = $conn->query($crid);
    if ($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $crid = $row['ID'];
    }
    else{
        $crsql = "INSERT INTO customers (CustomerName, CustomerNumber, CustomerEmail) VALUES ('$ename', '$ephone', '$email')";
        $result = $conn->query($crsql);
        $crid = $conn->insert_id;
    }

    $csql = "INSERT INTO customs (IDCustomer, Date) VALUES ('$crid', NOW())";
    $result = $conn->query($csql);
    $cid = $conn->insert_id;
    $json = json_decode(rinit(), true);
    $cart = $_POST['cart'];
    
    foreach ($cart as $id=>$count) {
        $pid = $json[$id]['ID'];
        $price = $json[$id]['Cost'];
        $quantity = $count;
        $cpsql = "INSERT INTO customproduct (IDCustom, IDCustomer, IDAutopart, Price, Quantity) VALUES ('$cid', '$crid', '$pid', '$price', '$quantity')";
        if (mysqli_query($conn, $cpsql)){
            echo "1";
        } else {
            echo "Error: " . $cpsql . "<br>" . mysqli_error($conn);
        }
    }

    mysqli_close($conn);
}

function newCustomer(){
    $conn = connect();
    $name = $_POST['crname'];
    $number = $_POST['crnumber'];
    $email = $_POST['cremail'];

    $sql = "INSERT INTO customers (CustomerName, CustomerNumber, CustomerEmail) VALUES ('$name', '$number', '$email')";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function newCustom(){
    $conn = connect();
    $crid = $_POST['crid'];

    $sql = "INSERT INTO customs (IDCustomer, Date) VALUES ('$crid', 'NOW()')";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function newCustomProduct(){
    $conn = connect();
    $cid = $_POST['cid'];
    $crid = $_POST['crid'];
    $pid = $_POST['pid'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];

    $sql = "INSERT INTO customproduct (IDCustom, IDCustomer, IDAutopart, Price, Quantity) VALUES ('$cid', '$crid', '$pid', '$price', '$quantity')";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function deleteGoods(){
    $conn = connect();
    $id = $_POST['id'];
    
    $sql = "DELETE FROM autoparts WHERE id = $id";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function deleteModels(){
    $conn = connect();
    $id = $_POST['id'];
    
    $sql = "DELETE FROM models WHERE id = $id";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function deletePartModel(){
    $conn = connect();
    $mid = $_POST['mid'];
    $pid = $_POST['pid'];
    
    $sql = "DELETE FROM partmodel WHERE PartID = $pid AND ModelId = $mid";
    if (mysqli_query($conn, $sql)){
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}

function loadGoods(){
    $conn = connect();
    $sql = "SELECT * FROM autoparts";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function loadModelGoods($modelId){
    $conn = connect();
    $sql = "SELECT * FROM autoparts JOIN partmodel ON autoparts.ID = partmodel.PartID WHERE partmodel.ModelId = ".$modelId;
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function loadGoodModels($PartId){
    $conn = connect();
    $sql = "SELECT * FROM models JOIN partmodel ON models.ID = partmodel.ModelId WHERE partmodel.PartId = ".$PartId;
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function loadModels(){
    $conn = connect();
    $sql = "SELECT * FROM models";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function loadVINGoods($VIN){
    $conn = connect();
    $sql = "SELECT autoparts.ID, autoparts.Name, autoparts.Cost, autoparts.SKU, autoparts.Manufacturer, autoparts.Description, autoparts.Image, autoparts.Category FROM autoparts LEFT JOIN partmodel ON autoparts.ID = partmodel.PartID JOIN models ON models.ID = partmodel.ModelId WHERE models.VIN = '".$VIN."'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["ID"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}