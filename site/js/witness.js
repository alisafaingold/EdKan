$(document).ready(
    function ($) {
        let r = window.location.href.split("?")[0];
        // r+="/getWitnessDetails?witnessesID=" + witnessesID;
        // createRequest(r);
        $('.js-edit, .js-save').on('click', function () {
            var target = $(event.target)
            var $form = $(this).closest('form');
            $form.toggleClass('is-readonly is-editing');
            var isReadonly = $form.hasClass('is-readonly');
            $form.find('input,textarea,select').prop('disabled', isReadonly);
            if (target.is('.js-save')) {
                saveThis($form);
            }
        });
    }(jQuery)
);


window.onload = function () {
    createRequest();
}


function createRequest() {
    let urlToAsk = ip + '/getWitnessDetails?witnessID=' + _id;
    request.open('GET', urlToAsk, true);
    request.onload = function () {
        if (request.status === 200 && request.responseText !== "updated") {
            const data = JSON.parse(request.responseText);
            let name = data.firstname + " " + data.lastname;
            let Phone = data.phone;
            let Address = data.address;
            let email = data.mail;
            let language = data.language;
            let notes = data.notes;
            let id = data.witnessID;

            wDetails.fullName = name;
            wDetails.id = id;
            wDetails.tel = Phone;

            document.getElementById("wName").value = name;
            document.getElementById("wTel").value = Phone;
            document.getElementById("wAddress").value = Address;
            document.getElementById("wLang").value = language;
            document.getElementById("wID").value = id;
            if (notes) {
                document.getElementById("wNotes").value = notes;
            }
            if (email) {
                document.getElementById("wEmail").value = email;
                wDetails.email = email;

            }
            document.getElementById("title").innerText = name;

            let hearing = data.hearings;
            let div = document.getElementById("addHearingHere");

            /// ========= Hearings ====================
            for (let i = 0; i < hearing.length; i++) {
                let button = document.createElement("button");
                button.className = "btn btn-inverse-warning btn-lg btn-block";
                button.innerHTML = hearing[i].subject;
                localStorage.setItem(button.innerHTML, hearing[i]._id.$oid);
                button.id = hearing[i]._id.$oid;
                button.setAttribute("onClick", "goToHearingUrl(" + "this" + ")");
                div.appendChild(button);

            }

            let dropDownCases = document.getElementById("caseID");
            let dropDownHearings = document.getElementById("hearingID");

            let casesAndHearings = data.casesAndHearings;
            for (let i = 0; i < casesAndHearings.length; i++) {
                //add to case dropdown
                let caseNumber = casesAndHearings[i].caseNumber;
                let option = document.createElement('option');
                option.value = casesAndHearings[i].caseID;
                option.text = caseNumber;
                dropDownCases.add(option);

                //add to hearing dropdown
                let optgroup = document.createElement('optgroup');
                optgroup.label = caseNumber;
                optgroup.id = "a" + casesAndHearings[i].caseID;
                optgroup.style.display = "";
                let hearings = casesAndHearings[i].hearings;
                for (let j = 0; j < hearings.length; j++) {
                    let subject = hearings[j].subject;
                    let option1 = document.createElement('option');
                    option1.value = hearings[j]._id.$oid;
                    option1.text = subject;
                    optgroup.appendChild(option1);
                }
                dropDownHearings.add(optgroup);
            }

            // Communication
            let table = document.getElementById("communicationTable");
            let communication1 = data.communication;

            for (let i = 0; i < communication1.length; i++) {
                let tr = document.createElement("tr");
                let element = communication1[i];
                let message = "";
                let type = element.type;
                let title1;
                if(element.title){
                    title1= element.title;
                }
                else{
                    title1 = "הודעה בטקסט חופשי"
                }
                if (type === 'hearingReply' || type === 'meetingReply') {
                    message = communication[type] + replay[title1];
                } else {
                    message = communication[type] + title1;
                }
                let date = element.date;
                let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                d.setUTCSeconds(date);
                let s = d.toLocaleString('heb-IL', {timeZone: 'UTC'});
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                td1.appendChild(document.createTextNode(s));
                td2.appendChild(document.createTextNode(message));
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            }
        }
    }
    request.send();
}


function saveThis(form) {
    let formElement = form[0];
    let values = {};
    for (i = 0; i < formElement.elements.length; i++) {
        let input = formElement.elements[i];
        if (input.id) {
            if (input.name === "name") {
                let res = input.value.split(" ");
                values["firstname"] = res[0];
                values["lastname"] = res[1];

            } else {
                values[input.name] = input.value;
            }
        }
    }
    let curURl = ip + "/updateWitnesses?witnessID=" + _id;
    request.open('POST', curURl, true);
    let tosend = JSON.stringify(values);
    request.onreadystatechange = function () {
        // If the request completed, close the extension popup
        if (request.status == 200) {
            if (request.responseText === "updated") {
                let x = 1;

            }
        }
    };

    request.send(tosend);
}


// ===================== Connect with whiteness =====================
function changeForm(value) {
    let div = document.getElementById("refreshTemplate");
    if (value === 'freeText') {
        div.style.display = "none";
        title = "הודעה בטקסט חופשי - ";
        document.getElementById("message").value = "";
    } else {
        div.style.display = "";
        title = "זימון לרענון לפני מתן עדות - ";
        buildMessage();
    }

}

function sendMessage() {
    let formElement = document.getElementById("sendMessageForm");
    var data = {};
    for (i = 0; i < formElement.elements.length; i++) {
        let input = formElement.elements[i];
        if (input.value !== "" && input.id) {
            if (input.type === "checkbox") {
                data[input.id] = input.value;
            } else {
                data[input.id] = input.value;
            }
        }
    }
    data['subject'] = title + wDetails.fullName;

    let curURl = ip + "/saveWitnessEvent?witnessID=" + _id;
    request.open('POST', curURl, true);
    request.onreadystatechange = function () {
        // If the request completed, close the extension popup
        if (request.status == 200) {

        }
    }
    request.send(JSON.stringify(data));
    closeModal();
    location.reload();
}

function closeModal() {
    $("#sendMessageForm")[0].reset();
    $("#connectModal").removeClass("in");
    $(".modal-backdrop").remove();
    $("#connectModal").hide();
}


//Build Message
function buildMessage() {
    s1 = 'שלום ' + wDetails.fullName + '. ';
    s2 = 'לפני הדיון "';
    s3 = '", בתיק מספר ';
    s4 = ', אבקש ממך להגיע ל-';
    s5 = ' ב-';
    s6 = ' ,';
    s7 = ' לצורך רענון העדות שלך. ניתן ליצור קשר במספר: ';
    s8 = ' . בברכה, ';


    let hearingID = document.getElementById("hearingID");
    let caseID = document.getElementById("caseID");

    i2 = hearingID.options[hearingID.selectedIndex].text;
    i3 = caseID.options[caseID.selectedIndex].text;
    i4 = document.getElementById("eventPlace").value;
    i5 = document.getElementById("eventDate").value;
    i6 = document.getElementById("eventHour").value;
    i7 = document.getElementById("phone").value;
    i8 = "אליסה פיינולד";
    wMessage.append(s1);
    wMessage.append(s2);
    wMessage.append(i2);
    wMessage.append(s3);
    wMessage.append(i3);
    wMessage.append(s4);
    wMessage.append(i4);
    wMessage.append(s5);
    wMessage.append(i5);
    wMessage.append(s6);
    wMessage.append(i6);
    wMessage.append(s7);
    wMessage.append(i7);
    wMessage.append(s8);
    wMessage.append(i8);
    document.getElementById("message").value = wMessage.toString();
    wMessage.clear();
}

//String Builder
function StringBuilder(value) {
    this.strings = new Array();
    this.append(value);
}

StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

StringBuilder.prototype.clear = function () {
    this.strings.length = 0;
}

StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}


function goToHearingUrl(button) {
    let url = new URL(window.location.href);
    const newUrl = new URL('../../pages/hearing/hearing.html', url);
    newUrl.searchParams.append("caseID", caseID);
    newUrl.searchParams.append("hearingName", button.innerHTML);
    window.location.href = newUrl.href;
};

let ip = 'Http://192.168.1.8:8000';
let curUrl = new URL(window.location.href);
let witnessID = curUrl.searchParams.get("witnessID");
let _id = localStorage.getItem(witnessID);
let wDetails = {fullName: "", tel: "", email: "", id: ""};
let s1, s2, s3, s4, s5, s6, s7, s8;
let i1, i2, i3, i4, i5, i6, i7, i8;
let wMessage = new StringBuilder();
let title = "";
let communication = {
    hearingInvitation: "נשלח זימון לדיון בתיק: ",
    hearingReply: "התקבלה תגובה לזימון: ",
    meetingInvitation: "נשלח זימון לפגישת רענון בנושא ",
    meetingReply: "התקבלה תגובה לפגישת רענון: ",
    messageSent: "נשלחה הודעה לעד "
}
let replay = {approved: "אישר הגעה", declined: "לא אישר הגעה"};

const request = new XMLHttpRequest();
