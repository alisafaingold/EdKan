//On load -> show witnesses, create method to move to the witness
async function loadWitnesses() {
    localStorage.setItem('lawyerID', '1234');
    let url =ip+'/getCaseDetails?caseID='+_id;
    let element = document.getElementById("currentWitnesses");
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
                bigDiv.className="row mt-4";
                bigDiv.id="row"+i;
                //Todo add check id he already connect or not
                for(let j=0; j<6 && i<witnesses.length; j++){
                    let div = document.createElement("div");
                    div.className="col-md-2";
                    let button = document.createElement("button");
                    button.className = "btn btn-outline-danger btn-lg";
                    button.innerHTML = witnesses[i].firstname+" "+witnesses[i].lastname;
                    button.id =witnesses[i].witnessID;
                    //TODO CHECK if police or noraml
                    localStorage.setItem(button.id,witnesses[i]._id)
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

function goToWitnessUrl(button){
    let url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/witness.html', url);
    _id= localStorage.getItem(button.id)
    newUrl.searchParams.append("witnessID", button.id);
    window.location.href = newUrl.href;
};


//Form Functionality
function createNewRow() {
    var oldDiv = document.getElementById('fromRow1');
    var newDiv = oldDiv.cloneNode(true);
    newDiv.id = newDiv.id.substring(0, newDiv.id.length - 1) + numID;
    newDiv.style.display = "none";
    for (i = 0; i < newDiv.childNodes.length; i++) {
        if (i == 1) {
            newDiv.childNodes[i].childNodes[1].id = numID;
            newDiv.childNodes[i].id = 'div' + numID;
        }
        if (newDiv.childNodes[i].id != null) {
            newDiv.childNodes[i].id = newDiv.childNodes[i].id.substring(0, newDiv.childNodes[i].id.length - 1) + numID;
            newDiv.childNodes[i].value="";
        }
    }
    document.getElementById('witnessesForm').appendChild(newDiv);
    numID++;
    return newDiv;
};

function changeToOfficer(id) {
    id = id.slice(-1);
    document.getElementById('FreeText' + id).style.display = "none";
    document.getElementById('UserID' + id).style.display = "none";
    document.getElementById('OfficerID' + id).style.display = "block";
    document.getElementById('OfficerRank' + id).style.display = "block";
    document.getElementById('LastName' + id).style.display = "block";
    document.getElementById('Name' + id).style.display = "block";
    document.getElementById('UserMail' + id).style.display = "none";
    document.getElementById('OfficerStation' + id).style.display = "block";
    document.getElementById('Phone' + id).style.display = "none";
    document.getElementById('Lang' + id).style.display = "block";
};

function changeToFreeText(id) {
    id = id.slice(-1);
    document.getElementById('FreeText' + id).style.display = "block";
    document.getElementById('UserID' + id).style.display = "none";
    document.getElementById('OfficerID' + id).style.display = "none";
    document.getElementById('OfficerRank' + id).style.display = "none";
    document.getElementById('LastName' + id).style.display = "none";
    document.getElementById('Name' + id).style.display = "none";
    document.getElementById('UserMail' + id).style.display = "none";
    document.getElementById('OfficerStation' + id).style.display = "none";
    document.getElementById('Phone' + id).style.display = "none";
    document.getElementById('Lang' + id).style.display = "none";
};

function changeToNormal(id) {
    id = id.slice(-1);
    document.getElementById('FreeText' + id).style.display = "none";
    document.getElementById('UserID' + id).style.display = "block";
    document.getElementById('OfficerID' + id).style.display = "none";
    document.getElementById('OfficerRank' + id).style.display = "none";
    document.getElementById('LastName' + id).style.display = "block";
    document.getElementById('Name' + id).style.display = "block";
    document.getElementById('UserMail' + id).style.display = "block";
    document.getElementById('OfficerStation' + id).style.display = "none";
    document.getElementById('Phone' + id).style.display = "block";
    document.getElementById('Lang' + id).style.display = "block";

};

function changeForm(id) {
    let type = document.getElementById(id).value;
    if (type.localeCompare("שוטר") === 0) {
        changeToOfficer(id);
    } else if (type.localeCompare("טקסט חופשי") === 0) {
        changeToFreeText(id);
    } else {
        changeToNormal(id);
    }
};

//Remove Display from new row
document.getElementById('addRowToWitnessesForm').onclick = function () {
    let div = createNewRow();
    div.style.removeProperty("display");
};


//Save and go to Case Page
function saveAndNext() {
    let witnessesNumber = numID - 1;
    const formData = {};
    for (let j = witnessesNumber; j > 0; j--) {
        let data = {};
        let children = [].slice.call(document.getElementById('fromRow' + j).getElementsByTagName('*'), 0);
        let idsAndClasses = children.map(function (child) {
            if (child.tagName !== 'OPTION') {
                if (child.value !== "" && child.name !== "")
                    data[child.name] = child.value;
            }
        });
        formData[j] = data;
    }

    let witnesses ={};
    witnesses['witnesses']=formData;

    serviceSave(witnesses);
};

function goToCaseUrl() {
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/case.html', url);
    newUrl.searchParams.append('caseID', curCaseId);
    window.location.href = newUrl.href;
}

function serviceSave(data) {
    let urlToAsk = ip+'/saveWitnesses?caseID='+_id;
    request.open('POST', urlToAsk, true);
    request.onreadystatechange = function () {
        // If the request completed, close the extension popup
        if (request.readyState == 4) {
            if (request.status == 200) {
                var url = new URL(window.location.href);
                const newUrl = new URL('../../pages/cases/case.html', url);
                newUrl.searchParams.append('caseID', curCaseId);
                window.location.href = newUrl.href;
            }
        }
    }
    request.send(JSON.stringify(data));
}


//Import File
$(document).ready(function () {
    let fileUpload = document.getElementById("file")
    fileUpload.addEventListener('change', importFile);

});

function upload() {
    let fileUpload = document.getElementById("file");
    fileUpload.click();
};

function importFile(evt) {
    var input = evt.target;
    var reader = new FileReader();
    reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type: 'binary'});
        wb.SheetNames.forEach(function (sheetName) {
            var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            var jsonObj = JSON.stringify(rowObj);
            jsonObj = JSON.parse(jsonObj);
            console.log(jsonObj)
            show(jsonObj);
        })
    };
    reader.readAsBinaryString(input.files[0]);
};

function show(jsonObj) {
    var text = "";
    let divNum = Object.keys(jsonObj).length;
    let data = jsonObj.data;
    let currID = numID;
    for (var key of jsonObj) {
        currID = numID;
        let div = createNewRow();
        div.style.removeProperty("display");
        document.getElementById('FreeText' + currID).value = Object.values(key)[0];
        document.getElementById('UserID' + currID).value = Object.values(key)[1];
        document.getElementById('LastName' + currID).value = Object.values(key)[2];
        document.getElementById('Name' + currID).value = Object.values(key)[3];
        document.getElementById('UserMail' + currID).value = Object.values(key)[4];
        document.getElementById('Phone' + currID).value = Object.values(key)[5];
        document.getElementById('Notes' + currID).value = Object.values(key)[7];
        console.log(key);
    }
}


//Init
let ip = 'Http://192.168.1.8:8000';
let numID = 2;
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let curCaseId = curUrl.searchParams.get("caseID");
let _id = localStorage.getItem(curCaseId);
loadWitnesses();

//???
function addAndFill(values) {
    if (numID == 2) {
        if (values[0] === 0) {
            var oldDiv = document.getElementById('fromRow1');
            var newDiv = oldDiv.cloneNode(true);
            newDiv.id = newDiv.id.substring(0, newDiv.id.length - 1) + numID;
            for (i = 0; i < newDiv.childNodes.length; i++) {
                if (i == 1) {
                    newDiv.childNodes[i].childNodes[1].id = numID;
                    newDiv.childNodes[i].id = 'div' + numID;
                }
                if (newDiv.childNodes[i].id != null) {
                    newDiv.childNodes[i].id = newDiv.childNodes[i].id.substring(0, newDiv.childNodes[i].id.length - 1) + numID;
                }
            }

        } else if (values[0] === 1) {

        } else {

        }
    }

};