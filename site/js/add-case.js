function getAttorney() {
    let dropdown = document.getElementById("attorneySelector")
    var url = 'Http://192.168.1.107:8000/getLawyers';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;
            for (let i = 0; i < data["lawyers"].length; i++) {
                option = document.createElement('option');
                option.name=data["lawyers"][i]["lawyerID"]
                option.text = data["lawyers"][i]["firstname"].toUpperCase()+" "+data["lawyers"][i]["lastname"].toUpperCase();
                dropdown.add(option);
            }
        } else {
            console.log("??????????")
        }
    }
    request.send();
}

function save(data) {
    let localUrl =url+'/saveCase';
    request.open('POST',localUrl,true);
    request.send(JSON.stringify(data));
}

function saveAndNext() {
    let form  = document.getElementsByTagName('form')[0];
    if(form.checkValidity()===true){
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                data[input.name] = input.value;
            }
        }
        data["openingUserID"]="1";
        save(data);
        let caseID= document.getElementById("caseID").value;
        setGetParameter('caseID',caseID);
    }
    else{
        form.classList.add('was-validated');
    }

};

function saveCase() {
    let form = document.getElementsByTagName('form')[0];
    if (form.checkValidity() === true) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                data[input.name] = input.value;
            }
        }
        data["openingUserID"] = "1";
        save(data);
    } else {
        form.classList.add('was-validated');
    }
}



function setGetParameter(paramName, paramValue){
var url = new URL(window.location.href);
const newUrl = new URL('../../pages/cases/add-witnesses.html', url);
newUrl.searchParams.append(paramName, paramValue);
window.location.href = newUrl.href;
}


let url = 'Http://192.168.1.107:8000';
const request = new XMLHttpRequest();
getAttorney();

