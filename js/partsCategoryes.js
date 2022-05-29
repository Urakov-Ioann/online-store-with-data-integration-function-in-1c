
function showParts() {
    $.getJSON('parts.json', function (data) {
        var parts = data;
        var out = '';
        for (var id in parts) {
            console.log(parts[id].category);
            out +='<div class="parts">';
            out += `<h1 class="part">${parts[id].part  }</h1>`;
            out += `<img data-id="${id}" src="images/parts\\${parts[id].img}">`;
            out += `<button class="go-to-parts" onclick="document.location='http://localhost/InternetShop(Ivan)/php/forCategoryes.php?category=${parts[id].category}'">Перейти</button>`;
            out +='</div>';
        }
        $('.main-part').html(out);
    });
}

$(document).ready(function(){
    showParts();
})