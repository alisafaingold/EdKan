loadCases();


// var obj = JSON.parse('[{"case":"5134432","age":30,"city":"New York"},{"case":"3543265","age":30,"city":"New York"},{"case":"43543534","age":30,"city":"New York"},{"case":"324324","age":30,"city":"New York"},{"case":"3543265","age":30,"city":"New York"},{"case":"43543534","age":30,"city":"New York"},{"case":"324324","age":30,"city":"New York"},{"case":"3543265","age":30,"city":"New York"},{"case":"43543534","age":30,"city":"New York"},{"case":"324324","age":30,"city":"New York"}]');

// for (let i = 0; i < obj.length; i++) {
//     var button = document.createElement("button");
//     button.className = "btn btn-outline-primary btn-fw";
//     button.innerHTML = "תיק מס' " + obj[i].case ;
//     button.id = obj[i].case;
//     button.setAttribute( "onClick", "login("+"this"+")");
//     element.appendChild(button);
// }

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
console.log(qs.lawyerID + "");

async function loadCases() {
    var url = 'http://dummy.restapiexample.com/api/v1/employees';
    var request = new XMLHttpRequest()
    var element = document.getElementById("insertButtons");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
// Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true);
    request.onload = function () {
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
                button.className = "btn  btn-fw btn-lg";
                if(data.data[i].employee_salary>200000){
                    button.classList.add("btn-inverse-success");
                }
                else{
                    button.classList.add("btn-inverse-primary");
                }
                button.innerHTML ="שם " + data.data[i].employee_salary + "</br>" +"מספר זהות "+ data.data[i].employee_salary ;
                button.id = data[i];
                button.setAttribute("onClick", "showModal(" + "this" + ")");
                div.appendChild(button);
                bigDiv.appendChild(div);
                i++
            }
            element.appendChild(bigDiv);
            i--;
        }
    }

// Send request
    request.send();
}


function showModal(element) {
    let model = document.getElementById("modal");
    document.getElementById("wName").value=element.id;
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
    request.onload = function() {
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
    loadCases();

    var y = document.getElementById("addButton2");
    y.style.display = "block";

    var x = document.getElementById("addWitnessForm");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
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


