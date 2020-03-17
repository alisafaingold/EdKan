var element = document.getElementById("insertButtons");

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://dummy.restapiexample.com/api/v1/employees', true)


request.onload = function() {
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
console.log(qs.lawyerID+"");


function login(element) {
    alert(element.id);
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


