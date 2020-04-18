
$(document).ready(
    function ($) {
        let r = window.location.href.split("?")[0];
        // r+="/getWitnessDetails?witnessesID=" + witnessesID;
        // createRequest(r);
        $('.js-edit, .js-save').on('click', function () {
            var target = $(event.target)
            var $form = $(this).closest('form');
            $form.toggleClass('is-readonly is-editing');
            var isReadonly = $form.hasClass('is-readonly');
            $form.find('input,textarea,select').prop('disabled', isReadonly);
            if (target.is('.js-save')) {
                saveThis($form);

            }
        });
    }(jQuery)
);

function createRequest(r) {
    request.open('GET', r, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let name = data["witness"].firstname+" "+data["witness"].lastname;
            let Phone = data["witness"].Phone;
            let Adress = data["witness"].Adress;
            let email = data["witness"].email;
            let language = data["witness"].language;
            let notes = data["witness"].notes;
            let id = data["witness"].witnessID;

            document.getElementById("wName").value=name;
            document.getElementById("wTel").value=Phone;
            document.getElementById("wAddress").value=Adress;
            document.getElementById("wEmail").value=email;
            document.getElementById("wLang").optio=language;
            document.getElementById("wID").value=id;
            document.getElementById("wID").value=notes;

            document.getElementById("title").innerText=name;


        }
    }

}


function saveThis(form) {
    let formElement = form[0];
    let values = {};
    for (i = 0; i < formElement.elements.length; i++) {
        let input = formElement.elements[i];
        if (input.id) {
            j[values.id] = input.value;
        }
    }
    let curURl = window.location.href.split("?")[0];
    curURl +="/updateWitnesses?witnessesID=" + witnessesID;
    request.open('POST', curURl, true);
    request.send(JSON.stringify(data));
}


let url = 'Http://192.168.1.107:8000';
let witnessesID = url.searchParams.get("witnessesID");
const request = new XMLHttpRequest();