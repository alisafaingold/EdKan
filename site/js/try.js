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



async function loadCases() {
    var url = 'Http://192.168.1.107:8000/getCaseDetails?caseID=2020';
    var request = new XMLHttpRequest()
    var element = document.getElementById("insertButtons");


    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
            element.innerHTML+=data.buffers[0];

        }

// Send request
    request.send();
};



loadCases();