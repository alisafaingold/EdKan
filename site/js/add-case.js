//Add selector the lawyers
function getAttorney() {
    let dropdown = document.getElementById("lawyers")
    var url = ip + '/getLawyers';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;
            for (let i = 0; i < data["lawyers"].length; i++) {
                option = document.createElement('option');
                option.value = data["lawyers"][i].lawyerID;
                localStorage.setItem(option.value, data.lawyers[0]._id.$oid);
                option.text = data["lawyers"][i]["firstname"].toUpperCase() + " " + data["lawyers"][i]["lastname"].toUpperCase();
                dropdown.add(option);
            }
        }
    }
    request.send();
}


//Save and go to Add Witnesses
function saveAndNext() {
    let form = document.getElementsByTagName('form')[0];
    if (form.checkValidity() === true) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                if (input.name === 'lawyers') {
                    let l = [];
                    let item = localStorage.getItem(input.value);
                    l[0]=item;
                    data[input.name] = l;
                }
                else {
                    data[input.name] = input.value;
                }

            }
        }

        data["openingUserID"] = "1";
        caseID = document.getElementById("caseID").value;
        serviceSave(data);
    } else {
        form.classList.add('was-validated');
    }

};

function goToWitnessesUrl(paramName, paramValue) {
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/add-witnesses.html', url);
    newUrl.searchParams.append(paramName, paramValue);
    window.location.href = newUrl.href;
}

//Save case
function saveCase() {
    let form = document.getElementsByTagName('form')[0];
    if (form.checkValidity() === true) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name){
                if (input.name === 'lawyers') {
                    let l = [];
                    let item = localStorage.getItem(input.value);
                    l[0]=item;
                    data[input.name] = l;
                }
                else {
                    data[input.name] = input.value;
                }
            }
        }
        data["openingUserID"] = "1";
        serviceSave(data);
    } else {
        form.classList.add('was-validated');
    }
}

//Ask from the service to save the data
function serviceSave(data) {
    let localUrl = ip + '/saveCase';
    request.open('POST', localUrl, true);
    request.onreadystatechange = function () {
        // If the request completed, close the extension popup
        if (request.readyState == 4) {
            if (request.status == 200) {
                localStorage.setItem(caseID, request.responseText);
                var url = new URL(window.location.href);
                const newUrl = new URL('../../pages/cases/add-witnesses.html', url);
                newUrl.searchParams.append('caseID', caseID);
                window.location.href = newUrl.href;
            }
        }
    }
    request.send(JSON.stringify(data));

}

//Init
let ip = 'Http://192.168.1.8:8000';
const request = new XMLHttpRequest();
let caseID;
getAttorney();

