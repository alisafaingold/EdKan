// import {Packer, Paragraph} from "docx";
window.onload = function () {
    sessionStorage.clear()
    addDetails();
}

function addDetails() {
    if(caseID !== "[object HTMLSelectElement]")
        document.getElementById("title").innerText="תיק מספר "+caseID +" > "+hearingName ;
    else{
        document.getElementById("title").innerText=hearingName ;

    }

    let url = ip+'/getHearingDetailsPage?hearingID=' + _id;

    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            //======== Hearing Details =================
            let hearing = data.hearing;
            let hearingName =hearing.subject;
            let date = hearing.hearingDate.$numberLong;
            let courtID= hearing.courtID;
            let court = coutrs[courtID-1];
            let hall = hearing.hallID;
            let hour =hearing.hearingHour;
            let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setMilliseconds(date);
            let s = d.toLocaleString('heb-IL', { timeZone: 'UTC' });
            s=s.slice(0,8);
            // let caseDetails1 = data.
            let first = document.createTextNode("שם הדיון: "+hearingName);
            let second = document.createTextNode("תאריך: "+s);
            let br = document.createElement('br');
            let hearing1 = document.getElementById("hearingDetails1");
            hearing1.appendChild(first);
            hearing1.appendChild(br);
            hearing1.appendChild(second);

            let first1 = document.createTextNode('מיקום: '+court+", אולם: "+hall);

            let second2  = document.createTextNode("שעה: "+hour);

            let hearing2 = document.getElementById("hearingDetails2");
            hearing2.appendChild(first1);
            hearing2.appendChild(br.cloneNode(true));
            hearing2.appendChild(second2);

            //set all to local storage for adding more witensess
            var dataForAddingMore ={};
            dataForAddingMore["subject"]= hearingName;
            dataForAddingMore["hearingDate"]=s;
            dataForAddingMore["hearingHour"] = hour;
            dataForAddingMore["courtID"]=court;
            dataForAddingMore["hallID"]= hall;
            localStorage.setItem('hearing',  JSON.stringify(dataForAddingMore));

            //=========== Witnesses =================


            let cardW = document.getElementById("collapse1");
            cardW.innerHTML="";
            let witnesses = data.witnesses;
            for (let i = 0; i < witnesses.length; i++) {
                let bigDiv = document.createElement("div");
                bigDiv.className="row mt-4";
                bigDiv.id="row"+i;
                for(let j=0; j<6 && i<witnesses.length; j++){
                    let status = witnesses[i].status;
                    let div = document.createElement("div");

                    div.className="col-md-2";
                    let button = document.createElement("button");
                    if(status==='sent'){
                        button.className = "btn btn-outline-info btn-lg";
                    } else if(status==='approved'){
                        button.className = "btn btn-outline-success btn-lg";

                    } else if(status==='declined')
                    {
                        button.className = "btn btn-outline-danger btn-lg";
                    } else if(status==='none'){
                        button.className = "btn btn-outline-secondary btn-lg";

                    }
                    button.innerHTML = witnesses[i].firstname+" "+witnesses[i].lastname;
                    button.id =witnesses[i].witnessID;
                    localStorage.setItem(button.id,witnesses[i]._id.$oid);
                    sessionStorage.setItem(button.id,witnesses[i]._id.$oid);
                    button.setAttribute("onClick", "goToWitnessUrl(" + "this" + ")");
                    div.appendChild(button);
                    i++;
                    bigDiv.appendChild(div);
                }
                cardW.appendChild(bigDiv);
                i--;
            }

        }

    }
    request.send();
}

// ============== Update / Delete  ==============
function updateHearing() {
    let form = document.getElementsByTagName('form')[0];
    if (form.checkValidity() === true) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                    data[input.name] = input.value;
                }
            }

        data["caseID"] = localStorage.getItem(caseID);
        data["hearingID"] = _id;
        saveToService(data);
        closeModal();
        location.reload();

    } else {
        form.classList.add('was-validated');
    }

}

function deleteHearing(){
    closeModal();
    let localUrl =ip+'/cancelHearing?hearingID=' + _id;
    request.open('POST', localUrl, true);
    request.onreadystatechange = function () {
        // If the request completed, close the extension popup
        if (request.status == 200) {
            let url = new URL(window.location.href);
            const newUrl = new URL('../../pages/cases/case.html', url);
            newUrl.searchParams.append("caseID", caseID);
            window.location.href = newUrl.href;
        }
    }
    request.send();
};

//  ============== Modal ==============

function closeModal(id) {
    if(id==='1'){
        $("#editModal").removeClass("in");
        $(".modal-backdrop").remove();
        $("#editModal").hide();
    }
    else if(id==='2'){
        $("#deleteModal").removeClass("in");
        $(".modal-backdrop").remove();
        $("#deleteModal").hide();
    }

}

//  ============== Save and Go

function saveToService(data) {
    let localUrl =ip+'/updateHearing?hearingID=' + _id;

    request.open('POST', localUrl, true);
    request.send(JSON.stringify(data));
};

function goToWitnessUrl(button){
    let url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/witness.html', url);
    newUrl.searchParams.append("witnessID", button.id);
    window.location.href = newUrl.href;
};

function goToWitnessesToHearingUrl(){
    localStorage.setItem("hearingID",_id);
    let url = new URL(window.location.href);
    const newUrl = new URL('../../pages/hearing/witnesess-to-hearing.html', url);
    newUrl.searchParams.append("caseID", caseID);
    newUrl.searchParams.append("h", "t");
    window.location.href = newUrl.href;

}

//Init
let ip = 'http://icc.ise.bgu.ac.il/njsw07/ProjectPrepreation';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let caseID = curUrl.searchParams.get("caseID");
let hearingName = curUrl.searchParams.get("hearingName");
let _id= localStorage.getItem(hearingName);
let coutrs=["בית המשפט המחוזי, באר שבע","בית משפט השלום, באר שבע","בית הדין האזורי לעבודה, באר שבע","בתי המשפט לעניינים מקומיים, באר שבע","בית המשפט לנוער, מחוז דרום, באר שבע"];

