loadCases();
// makeCorsRequest();


// var obj = JSON.parse('[{"case":"5134432","age":30,"city":"New York"},{"case":"3543265","age":30,"city":"New York"},{"case":"43543534","age":30,"city":"New York"},{"case":"324324","age":30,"city":"New York"},{"case":"3543265","age":30,"city":"New York"},{"case":"43543534","age":30,"city":"New York"},{"case":"324324","age":30,"city":"New York"},{"case":"3543265","age":30,"city":"New York"},{"case":"43543534","age":30,"city":"New York"},{"case":"324324","age":30,"city":"New York"}]');

// for (let i = 0; i < obj.length; i++) {
//     var button = document.createElement("button");
//     button.className = "btn btn-outline-primary btn-fw";
//     button.innerHTML = "תיק מס' " + obj[i].case ;
//     button.id = obj[i].case;
//     button.setAttribute( "onClick", "login("+"this"+")");
//     element.appendChild(button);
// }

// var query = window.location.search.substring(1);
// var qs = parse_query_string(query);
// console.log(qs.lawyerID+"");

function loadCases() {
    var element = document.getElementById("insertButtons");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://dummy.restapiexample.com/api/v1/employees', true);


    request.onload = function() {
        element.innerHTML = "";
        var data = JSON.parse(this.response);
        for (let i = 0; i < data.data.length; i++) {
            var button = document.createElement("button");
            button.className = "btn btn-outline-primary btn-fw";
            button.innerHTML = "תיק מס' " + data.data[i].employee_salary ;
            button.id = data.data[i].employee_salary;
            button.setAttribute( "onClick", "login("+"this"+")");
            element.appendChild(button);
        }
    }

// Send request
    request.send();
}


function login(element) {
    alert(element.id);
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
}

function saveCase() {
    // var desc = getInputValue("IDCase");
    // var caseID = getInputValue();

    //post to the API should save the new case
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

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open("GET", "http://192.168.1.109:8500");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "02009d27-0f6b-4384-b4fb-9576ee203100");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text;
}

// Make the actual CORS request.
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://192.168.1.109:8500';

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.response;
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}

function getInputValue(elementID){
    // Selecting the input element and get its value
    var inputVal = document.getElementById(elementID).value;

    // Displaying the value
    alert(inputVal);
}