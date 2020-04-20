window.onload = function() {
    let data = localStorage.getItem('hearing');

    let hearingDetails = document.getElementById("hearingDetails");
    let zero = document.createTextNode("דיון בנושא: "+data.subject);
    let first = document.createTextNode(" יתקיים בתאריך ה-"+data.hearingDate);
    let second = document.createTextNode(" בשעה "+data.hearingHour);
    let third = document.createTextNode(' בבית המשפט ה'+data.courtID);
    let fourth = document.createTextNode(' באולם '+data.hallID+".");
    let five = document.createTextNode('העדים אשר מזומנים לדיון זה יקבלו הודעת אימייל וסמס ובו פרטי המידע של הזימון.');


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






}

//Init
    let ip = 'Http://192.168.1.6:8000';
    const request = new XMLHttpRequest();
    let curUrl = new URL(window.location.href);
    let caseID = curUrl.searchParams.get("caseID");
    let _id= localStorage.getItem(caseID);