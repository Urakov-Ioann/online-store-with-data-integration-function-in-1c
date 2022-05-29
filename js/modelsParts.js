
function showModel() {
    $.post(
        "admin/php/core.php",
        {
            "action" : "loadModels"
        },  function (data) {
        var models = JSON.parse(data);
        console.log(models);
        var out = '';
        for (var id in models) {
            out +='<div class="models">';
            out += `<h1 class="model">${models[id].Name  }</h1>`;
            out += `<img data-id="${id}" src="images/models\\${models[id].Image}">`;
            out += `<button class="go-to-parts" onclick="document.location='http://localhost/InternetShop(Ivan)/php/forModels.php?modelId=${id}'">Перейти</button>`;
            out +='</div>';
        }
        $('.main-model').html(out);
    });
}

$(document).ready(function(){
    showModel();
})