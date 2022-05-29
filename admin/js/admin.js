function init() {
    $.post(
        "php/core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data) {
    data = JSON.parse(data);
    console.log(data);
    var out='<select>';
    out +='<option data-id="0">Новый товар</option>';
    for (var ID in data) {
        out +=`<option data-id="${ID}">${data[ID].Name}</option>`;
    }
    out +='</select>';
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}

function selectGoods() {
    var id = $('.goods-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "php/core.php",
        {
            "action": "selectOneGoods",
            "gid": id
        },
        function (data) {
            data = JSON.parse(data);
            $('#gname').val(data.Name);
            $('#gcost').val(data.Cost);
            $('#gsku').val(data.SKU);
            $('#gmanufacturer').val(data.Manufacturer);
            $('#gcategory').val(data.Category);
            $('#gdescr').val(data.Description);
            formPreview.innerHTML = `<img src = "../images/products/${data.Image}" alt = "Фото">`;
            $('#gid').val(data.ID);
            imgName = data.Image;
        }
    );
}

function saveToDb() {
    var id = $('#gid').val();
    if (id != "") {
        $.post(
            "php/core.php",
            {
                "action": "updateGoods",
                "id": id,
                "gname": $('#gname').val(),
                "gcost": $('#gcost').val(),
                "gsku": $('#gsku').val(),
                "gmanufacturer": $('#gmanufacturer').val(),
                "gcategory": $('#gcategory').val(),
                "gdescr": $('#gdescr').val(),
                "gimg": imgName
            },
            function (data) {
                if (data == 1) {
                    alert('Изменения внесены');
                    formSend();
                    init();
                }
                else {
                    console.log(data);
                }
            }
        );
    }
    else {
        $.post(
            "php/core.php",
            {
                "action": "newGoods",
                "id": 0,
                "gname": $('#gname').val(),
                "gcost": $('#gcost').val(),
                "gsku": $('#gsku').val(),
                "gmanufacturer": $('#gmanufacturer').val(),
                "gcategory": $('#gcategory').val(),
                "gdescr": $('#gdescr').val(),
                "gimg": imgName
            },
            function (data) {
                if (data == 1) {
                    alert('Данные добавлены');
                    formSend();
                    init();
                }
                else {
                    console.log(data);
                }
            }
        );
    }
}

function deletegoodsFromDb() {
    var id = $('#gid').val();
    if (id != "") {
        $.post(
            "php/core.php",
            {
                "action": "deleteGoods",
                "id": id
            },
            function (data) {
                if (data == 1) {
                    alert('Товар удалён');
                    deleteGoodsImg();
                }
                else {
                    console.log(data);
                }
            }
        );
    }
    else{
        alert('Выберите модель для удаления');
    }
}

var imgName;

async function formSend(){
    console.log(formImage.files);
    let formData = new FormData();
    formData.append('image', formImage.files[0]);
    await fetch('php/saveimg.php', {
        method: 'POST',
        body: formData
    });
}

const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');
formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
    console.log(formImage.files[0].name);
    imgName = formImage.files[0].name;
});

function uploadFile(file) {
    if (!['image/jpg', 'image/png'].includes(file.type)) {
        alert('Разрешены только изображения.');
        formImage.value = '';
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл должен быть менее 2 Мб.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        formPreview.innerHTML = `<img src = "${e.target.result}" alt = "Фото">`;
    };
    reader.onerror = function (e) {
        alert('Ошибка');
    };
    reader.readAsDataURL(file);
}

async function deleteGoodsImg(){
    $.post(
        "php/deleteimg.php",
        {
            "gimage" : imgName
        },
        init
    );
}

$('#integration').click(function(){
    document.location=`http://localhost/InternetShop(Ivan)/1c_exchange.php?type=sale&mode=query`;
});

$(document).ready(function () {
    init();
    $('.add-to-db').on('click', saveToDb);
    $('.delete-to-db').on('click', deletegoodsFromDb);
});