<?php
    require_once 'admin/php/Connect.php';
    $conn = connect();
    $type = $_GET['type'];
    $mode = $_GET['mode'];

    session_start();
    if(($type == 'sale') && ($mode == 'checkauth'))
    {
        print "success\n";
        print session_name()."\n";
        print session_id();
    }

    if(($type == 'sale') && ($mode == 'init'))
    {
        print "zip=no\n";
        print "file_limit=2000000";
    }
    if(($type == 'sale') && ($mode == 'query'))
    {
        $sql = "SELECT MAX(id) AS id FROM customs";
        $result = mysqli_query($conn, $sql);

        $CustomID  = 0;

        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $CustomID = $row["id"];
            }
        } else {
            echo "0";
        }


        
        $sql = "SELECT customers.ID, customers.CustomerName, customers.CustomerNumber, customers.CustomerEmail FROM customers JOIN customproduct ON customers.ID = customproduct.IDCustomer WHERE customproduct.IDCustom = " .$CustomID;
        $customer = [];
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $customer = $row;
            }
        } else {
            echo "0";
        }

        $sql = "SELECT autoparts.ID, autoparts.Name, autoparts.Cost, autoparts.SKU, autoparts.Manufacturer, autoparts.Description, autoparts.Image, autoparts.Category, customproduct.Price AS Price, customproduct.Quantity AS Quantity FROM autoparts JOIN customproduct ON autoparts.ID = customproduct.IDAutopart WHERE customproduct.IDCustom = " .$CustomID;
        $autoparts = [];
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $autoparts[] = $row;
            }
        } else {
            echo "0";
        }

        $sql = "SELECT * FROM customs WHERE ID = " .$CustomID;
        $custom = [];
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $custom = $row;
            }
        } else {
            echo "0";
        }
        mysqli_close($conn);

        $Sum = 0;
        for($i = 0; $i < count($autoparts); $i++)
        {
            $Sum += $autoparts[$i]['Price'] * $autoparts[$i]['Quantity'];
        }
        echo 
            "<КоммерческаяИнформация ВерсияСхемы=\"2.03\" ДатаФормирования=\"".date("Y-m-d")."\">
            <Документ>
                <Ид>".$custom['ID']."
                <Номер>".$custom['ID']."
                <Дата>".date("Y-m-d", strtotime($custom["Date"]))."
                <ХозОперация>Заказ товара
                <Роль>Продавец
                <Валюта>руб
                <Курс>1
                <Сумма>".$Sum."
                <Контрагенты>
                    <Контрагент>
                        <Ид>".$customer['ID']."
                        <Наименование>".$customer['CustomerName']."
                        <Роль>Покупатель
                        <ПолноеНаименование>".$customer['CustomerName']."
                        <Имя_заказчика>".$customer['CustomerName']."
                        <Телефон_заказчика>".$customer['CustomerNumber']."
                        <Емейл_заказчика>".$customer['CustomerEmail']."
                <Время>".date("H:i:s", strtotime($custom["Date"]))."
                <Товары>";
                for($i = 0; $i < count($autoparts); $i++)
                {
                    echo "
                    <Товар>
                        <Ид>".$autoparts[$i]['ID']."
                        <Наименование>".$autoparts[$i]['Name']."
                        <БазоваяЕдиница Код=\"796\" НаименованиеПолное=\"Штука\" МеждународноеСокращение=\"PCE\">шт
                        <ЦенаЗаЕдиницу>".$autoparts[$i]['Price']."
                        <Количество>".$autoparts[$i]['Quantity']."
                        <Сумма>".$autoparts[$i]['Price'] * $autoparts[$i]['Quantity']."
                        <Артикул>".$autoparts[$i]['SKU']."
                        <Производитель>".$autoparts[$i]['Manufacturer']."
                        <Описание>".$autoparts[$i]['Description']."
                        <Категория>".$autoparts[$i]['Category']."
                    ";
                }
    }
?>