document.getElementById('addRowToWitnessesForm').onclick = function () {
    let div = createNewRow();
    div.style.removeProperty("display");
};

$(document).ready(function () {

    let fileUpload = document.getElementById("file")
    fileUpload.addEventListener('change', importFile);

});


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
        }
    }
    document.getElementById('witnessesForm').appendChild(newDiv);
    numID++;
    return newDiv;
};


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
    document.getElementById('OfficerRank"' + id).style.display = "none";
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


function upload() {
    let fileUpload = document.getElementById("file")
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

function next() {
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

    var url = 'Http://192.168.1.107:8000/saveWitnesses?caseID=2022';
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.send(JSON.stringify(witnesses));

    var url = new URL(window.location.href);
    let caseID = url.searchParams.get("caseID");
    const newUrl = new URL('../../pages/cases/case.html', url);
    newUrl.searchParams.append("caseID", caseID);
    window.location.href = newUrl.href;
};

let numID = 2;
const url = 'http://dummy.restapiexample.com/api/v1/employees';
const request = new XMLHttpRequest();





