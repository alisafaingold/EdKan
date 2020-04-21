async function loadWitnesses() {
    var element = document.getElementById("insertButtons");
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            element.innerHTML = "";
            let data = JSON.parse(this.response);
            let witnesses = data.witnesses;
            for (let i = 0; i < witnesses.length; i++) {
                let bigDiv = document.createElement("div");
                bigDiv.className = "row mt-4";
                bigDiv.id = "row" + i;
                //Todo add check id he already connect or not
                for (let j = 0; j < 6 && i < witnesses.length; j++) {
                    let div = document.createElement("div");
                    div.className = "col-md-2";
                    let button = document.createElement("button");
                    button.className = "btn btn-outline-danger btn-lg";
                    button.innerHTML = witnesses[i].firstname + " " + witnesses[i].lastname;
                    button.id = witnesses[i].witnessID;
                    //TODO CHECK if police or noraml
                    localStorage.setItem(button.id, witnesses[i]._id)
                    button.setAttribute("onClick", "goToWitnessUrl(" + "this" + ")");
                    div.appendChild(button);
                    i++;
                    bigDiv.appendChild(div);
                }
                element.appendChild(bigDiv);
                i--;
            }
        }

    }
    request.send();
}



function showModal(element) {
    let model = document.getElementById("modal");
    document.getElementById("wName").value = element.id;
    $("#modal").modal();


}

function showForm() {
    var x = document.getElementById("addWitnessForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var y = document.getElementById("addButton2");
    y.style.display = "none";
    let dropdown = document.getElementById("attorneySelctor")

    var url = 'http://dummy.restapiexample.com/api/v1/employees';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;
            for (let i = 0; i < data.data.length; i++) {
                option = document.createElement('option');
                option.text = data.data[i].employee_name;
                dropdown.add(option);
            }
        } else {
            console.log("??????????")
        }
    }
    request.send();
}

function saveWitness() {
    //post to the API should save the new case
    loadWitnesses();

    var y = document.getElementById("addButton2");
    y.style.display = "block";

    var x = document.getElementById("addWitnessForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


//Init
let ip = 'Http://192.168.1.6:8000';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let caseID = curUrl.searchParams.get("caseID");
let _id = localStorage.getItem(caseID);


loadWitnesses();
var query = window.location.search.substring(1);
var qs = parse_query_string(query);
console.log(qs.lawyerID + "");

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
