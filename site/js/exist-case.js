//On load -> show cases, create method to move to the case
async function loadCases() {
    localStorage.setItem('lawyerID', '5e9ef8df1c9d44000066a164');
    let url = ip + '/getLawyerCase?lawyerID=' + localStorage.getItem('lawyerID');
    let request = new XMLHttpRequest();
    let element = document.getElementById("insertButtons");
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            element.innerHTML = "";
            var d = JSON.parse(this.response);
            let data = d["cases"];
            for (let i = 0; i < data.length; i++) {
                let bigDiv = document.createElement("div");
                bigDiv.className = "row mt-4";
                bigDiv.id = "row" + i;
                for (let j = 0; j < 6 && i < data.length; j++) {
                    var div = document.createElement("div");
                    div.className = "col-md-2";
                    var button = document.createElement("button");
                    button.className = "btn btn-outline-primary btn-lg";
                    button.innerHTML = "תיק מס' " + data[i].caseID;
                    button.id = data[i].caseID;
                    localStorage.setItem(data[i].caseID,data[i]._id.$oid);
                    button.setAttribute("onClick", "goToCaseUrl(" + "this" + ")");
                    div.appendChild(button);
                    bigDiv.appendChild(div);
                    i++
                }
                element.appendChild(bigDiv);
                i--;
            }
        }
    }
    request.send();
}

function goToCaseUrl(element) {
    let id = element.id;
    let _id = localStorage.getItem(id);
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/case.html', url);
    newUrl.searchParams.append('caseID', id);
    window.location.href = newUrl.href;
}


//+ button functionality
function showForm() {
    var x = document.getElementById("addCaseForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var y = document.getElementById("addButton2");
    y.style.display = "none";
    let dropdown = document.getElementById("lawyers")

    var url = ip + '/getLawyers';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            let dropdown = document.getElementById("attorneySelector")
            let data = JSON.parse(request.responseText);
            for (let i = 0; i < data["lawyers"].length; i++) {
                let option = document.createElement('option');
                option.value = data["lawyers"][i].lawyerID;
                option.text = data["lawyers"][i]["firstname"].toUpperCase() + " " + data["lawyers"][i]["lastname"].toUpperCase();
                dropdown.add(option);
            }
        }
    }
    request.send();
}


//Save case
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
        serviceSave(data);
    } else {
        form.classList.add('was-validated');
    }

    loadCases();

    var y = document.getElementById("addButton2");
    y.style.display = "block";

    var x = document.getElementById("addCaseForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


//Save and go Add Witnesses
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

        serviceSave(data);

        let caseID = document.getElementById("caseID").value;
        goToWitnessesUrl('caseID', caseID);

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


//Ask from the service to save the data
function serviceSave(data) {
    let localUrl = ip + '/saveCase';
    let caseID = document.getElementById("caseID").value;
    request.open('POST', localUrl, true);
    request.onreadystatechange = function () {
        // If the request completed, close the extension popup
        if (request.readyState == 4) {
            if (request.status == 200) {
                localStorage.setItem(caseID, request.responseText);
            }
        }
    }
    request.send(JSON.stringify(data));
}

function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}


// Init
let ip = 'http://192.168.1.4:8000';

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
console.log(qs.lawyerID + "");

loadCases();
