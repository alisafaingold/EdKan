loadCases();

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
console.log(qs.lawyerID + "");

async function loadCases() {
    // var url = 'Http://192.168.1.107:8000/getLawyerCase?lawyerID=1234';
    // var request = new XMLHttpRequest();
    var element = document.getElementById("insertButtons");
    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    // };
// Open a new connection, using the GET request on the URL endpoint
    var url = 'http://dummy.restapiexample.com/api/v1/employees';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    //data=[11,2021,333]
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            element.innerHTML = "";
            var data = JSON.parse(this.response);
            for (let i = 0; i < data.data.length; i++) {
                // for (let i = 0; i < data.length; i++) {
                let bigDiv = document.createElement("div");
                bigDiv.className = "row mt-4";
                bigDiv.id = "row" + i;
                for (let j = 0; j < 6 && i < data.data.length; j++) {
                    var div = document.createElement("div");
                    div.className = "col-md-2";
                    var button = document.createElement("button");
                    button.className = "btn btn-outline-primary btn-lg";
                    button.innerHTML = "תיק מס' " + i;
                    button.id = data[i];
                    button.setAttribute("onClick", "moveToCase(" + "this" + ")");
                    div.appendChild(button);
                    bigDiv.appendChild(div);
                    i++
                }
                element.appendChild(bigDiv);
                i--;
            }
        }
    }
// Send request
    request.send();
}


function moveToCase(element) {
    setGetParameter('caseID', element.id);
}


function setGetParameter(paramName, paramValue) {
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/case.html', url);
    newUrl.searchParams.append(paramName, paramValue);
    window.location.href = newUrl.href;
}


function showForm() {
    var x = document.getElementById("addCaseForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var y = document.getElementById("addButton2");
    y.style.display = "none";
    let dropdown = document.getElementById("attorneySelctor")

    var url = 'Http://192.168.1.107:8000/getLawyers';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;

            for (let i = 0; i < data["lawyers"].length; i++) {
                option = document.createElement('option');
                option.text = data["lawyers"][i]["firstname"].toUpperCase() + " " + data["lawyers"][i]["lastname"].toUpperCase();
                dropdown.add(option);
            }
        } else {
            console.log("??????????")
        }
    }
    request.send();
}

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

function save(data) {
    let localUrl = url + '/saveCase';
    request.open('POST', localUrl, true);
    request.send(JSON.stringify(data));
}

function saveAndNext() {
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
        let caseID = document.getElementById("caseID").value;
        setGetParameter('caseID', caseID);
    } else {
        form.classList.add('was-validated');
    }

};

function setGetParameter(paramName, paramValue) {
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/add-witnesses.html', url);
    newUrl.searchParams.append(paramName, paramValue);
    window.location.href = newUrl.href;
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


