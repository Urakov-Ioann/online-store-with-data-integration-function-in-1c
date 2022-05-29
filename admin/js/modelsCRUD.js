function initmodels() {
    $.post(
        "php/core.php",
        {
            "action" : "initmodels"
        },
        showModels
    );
}

function initparts() {
    $.post(
        "php/core.php",
        {
            "action" : "init"
        },
        showParts
    );
}

function showModels(data) {
    data = JSON.parse(data);
    console.log(data);
    var out='<select>';
    out +='<option data-id="0">Новая модель</option>';
    for (var ID in data) {
        out +=`<option data-id="${ID}">${data[ID].Name}</option>`;
    }
    out +='</select>';
    $('.models-out').html(out);
    $('.models-out select').on('change', selectModels); //вешаем событие на select
}

function showParts(data) {
    data = JSON.parse(data);
    console.log(data);
    var out='<select>';
    out +='<option d-id="0">Выберите деталь по артикулу</option>';
    for (var ID in data) {
        out +=`<option d-id="${ID}">${data[ID].SKU}</option>`;
    }
    out +='</select>';
    $('.part-out').html(out);
    $('.part-out select').on('change', selectParts); 
}

function selectModels() {
    var id = $('.models-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "php/core.php",
        {
            "action": "selectModels",
            "mid": id
        },
        function (data) {
            data = JSON.parse(data);
            $('#mname').val(data.Name);
            $('#mvin').val(data.VIN);
            formPreview.innerHTML = `<img src = "../images/models/${data.Image}" alt = "Фото">`;
            $('#mid').val(data.ID);
            imgName = data.Image;
        }
    );
}

function selectParts() {
    var id = $('.part-out select option:selected').attr('d-id');
    console.log(id);
    $.post(
        "php/core.php",
        {
            "action": "selectOneGoods",
            "gid": id
        },
        function (data) {
            data = JSON.parse(data);
            $('#pid').val(data.ID);
            fPreview.innerHTML = `<img src = "../images/products/${data.Image}" alt = "Фото">`;
        }
    );
}

function saveModelsToDb() {
    var id = $('#mid').val();
    if (id != "") {
        $.post(
            "php/core.php",
            {
                "action": "updateModels",
                "id": id,
                "mname": $('#mname').val(),
                "mvin": $('#mvin').val(),
                "mimg": imgName
            },
            function (data) {
                if (data == 1) {
                    alert('Изменения внесены');
                    formSend();
                    initmodels();
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
                "action": "newModels",
                "id": 0,
                "mname": $('#mname').val(),
                "mvin": $('#mvin').val(),
                "mimg": imgName
            },
            function (data) {
                if (data == 1) {
                    alert('Данные добавлены');
                    formSend();
                    initmodels();
                }
                else {
                    console.log(data);
                }
            }
        );
    }
}

function savePartForModel() {
    var mid = $('#mid').val();
    var pid = $('#pid').val();
    if ((mid != "") || (pid != "")) {
        $.post(
            "php/core.php",
            {
                "action": "newPartModel",
                "mid": mid,
                "pid": pid
            },
            function (data) {
                if (data == 1) {
                    alert('Данные добавлены');
                    initparts();
                }
                else {
                    console.log(data);
                }
            }
        );
    }
    else{
        alert('Выберите модель и деталь для удаления');
    }
}

function deletemodelsFromDb() {
    var id = $('#mid').val();
    if (id != "") {
        $.post(
            "php/core.php",
            {
                "action": "deleteModels",
                "id": id
            },
            function (data) {
                if (data == 1) {
                    alert('Товар удалён');
                    deleteModelsImg();
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

function deletepartForModel() {
    var mid = $('#mid').val();
    var pid = $('#pid').val();
    if ((mid != "") || (pid != "")) {
        $.post(
            "php/core.php",
            {
                "action": "deletePartModel",
                "mid": mid,
                "pid": pid
            },
            function (data) {
                if (data == 1) {
                    alert('Товар больше не подходит для данной модели');
                }
                else {
                    console.log(data);
                }
            }
        );
    }
    else{
        alert('Выберите модель и деталь для удаления');
    }
}

var imgName;

async function formSend(){
    console.log(formImage.files);
    let formData = new FormData();
    formData.append('image', formImage.files[0]);
    await fetch('php/saveimgmodels.php', {
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

async function deleteModelsImg(){
    $.post(
        "php/deleteimgmodels.php",
        {
            "mimage" : imgName
        },
        initmodels
    );
}

$(document).ready(function () {
    initmodels();
    initparts();
    $('.add-model-to-db').on('click', saveModelsToDb);
    $('.delete-model-from-db').on('click', deletemodelsFromDb);
    $('.add-part-for-model').on('click', savePartForModel);
    $('.delete-part-for-model').on('click', deletepartForModel);
});