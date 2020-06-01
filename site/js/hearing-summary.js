window.onload = function () {
    let data = JSON.parse(localStorage.getItem('hearing'));

    let hearingDetails = document.getElementById("hearingDetails");
    let zero = document.createTextNode("דיון בנושא: " + data.subject);
    let first = document.createTextNode(" יתקיים בתאריך ה-" + data.hearingDate);
    let second = document.createTextNode(" בשעה " + data.hearingHour);
    let third = document.createTextNode(' ב' + data.courtID);
    let fourth = document.createTextNode(' באולם ' + data.hallID + ".");
    let five = document.createTextNode('העדים אשר מזומנים לדיון זה יקבלו הודעת אימייל וסמס ובו פרטי המידע של הזימון.');
    hearingName=data.subject;
    let br = document.createElement('br');
    hearingDetails.appendChild(zero);
    hearingDetails.appendChild(first);
    hearingDetails.appendChild(second);
    hearingDetails.appendChild(third);
    hearingDetails.appendChild(fourth);
    hearingDetails.appendChild(br);
    hearingDetails.appendChild(br.cloneNode(true));
    hearingDetails.appendChild(five);

    let elementById = document.getElementById("witnessesHere");
    let names = JSON.parse(localStorage.getItem("names"));
    // let ids = localStorage.getItem("ids");
    // let names = localStorage.getItem("names");

    // Array.prototype.forEach(names,function(name){console.log(name)});
    for (let i = 0; i < names.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(names[i]));
        elementById.appendChild(li);
    }


}

function saveAndNext() {
    let contactNumber = document.getElementById("numberToContact").value;
    let contactName = document.getElementById("nameToContact").value;
    let urlToAsk = ip + '/saveHearingWitnesses?hearingID=' + _id;
    let data = {};
    data["witnesses"] = JSON.parse(localStorage.getItem("ids"));
    data["contactNumber"] = contactName;
    data["contactName"] = contactNumber;
    request.open('POST', urlToAsk, true);
    request.send(JSON.stringify(data));
    let goTo = curUrl.searchParams.get("h");
    var url = new URL(window.location.href);
    let newUrl;
    if(goTo==='t'){
        newUrl = new URL('../../pages/hearing/hearing.html', url);
        newUrl.searchParams.append("caseID", curCaseId);
        newUrl.searchParams.append("hearingName",hearingName);
    }
    else{
        newUrl = new URL('../../pages/cases/case.html', url);
        newUrl.searchParams.append("caseID", curCaseId);
    }
    window.location.href = newUrl.href;

}

//Init
let ip = 'http://192.168.1.4:8000';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let curCaseId = curUrl.searchParams.get("caseID");
let _id = localStorage.getItem("hearingID");
let hearingName;