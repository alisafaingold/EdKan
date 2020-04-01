

document.getElementById('addRowToWitnessesForm').onclick = function () {
    let div = createNewRow();
    div.style.display="block";
};

function createNewRow() {
    var oldDiv = document.getElementById('fromRow1');
    var newDiv = oldDiv.cloneNode(true);
    newDiv.id = newDiv.id.substring(0, newDiv.id.length - 1) + numID;
    newDiv.style.display= "none";
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



function addAndFill(values){
    if(numID==2){
        if(values[0]===0){
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

        }
        else if(values[0]===1){

        }
        else{

        }
    }



};




function changeToOfficer(id) {
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

function onLoad() {
    let fileUpload = document.getElementById("file")
    fileUpload.addEventListener('change', importFile);
};

function upload() {
    let fileUpload = document.getElementById("file")
    fileUpload.click();
};




function importFile(evt) {
    var input = evt.target;
    var reader = new FileReader();
    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach(function(sheetName){
            var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            var jsonObj = JSON.stringify(rowObj);
            jsonObj=JSON.parse(jsonObj);
            console.log(jsonObj)
            show(jsonObj);
        })
    };
    reader.readAsBinaryString(input.files[0]);
};

function show(jsonObj) {
    let divNum = Object.keys(jsonObj).length;
    for (var key in jsonObj) {
        var obj = jsonObj[key];
        for (var prop in obj) {
            let values = new Array();
            if (obj.hasOwnProperty(prop)) {
                values.push(obj[prop]);
            }
            addAndFill(values);
        }


    }
}

//     //Validate whether File is valid Excel file.
//     var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
//     if (regex.test(fileUpload.value.toLowerCase())) {
//         if (typeof (FileReader) != "undefined") {
//             var reader = new FileReader();
//             //For Browsers other than IE.
//             if (reader.readAsBinaryString) {
//                 reader.onload = function (e) {
//                     ProcessExcel(e.target.result);
//                 };
//                 reader.readAsBinaryString(fileUpload.files[0]);
//             } else {
//                 //For IE Browser.
//                 reader.onload = function (e) {
//                     var data = "";
//                     var bytes = new Uint8Array(e.target.result);
//                     for (var i = 0; i < bytes.byteLength; i++) {
//                         data += String.fromCharCode(bytes[i]);
//                     }
//                     ProcessExcel(data);
//                 };
//                 reader.readAsArrayBuffer(fileUpload.files[0]);
//             }
//         } else {
//             alert("This browser does not support HTML5.");
//         }
//     } else {
//         alert("Please upload a valid Excel file.");
//     }
// };
// function ProcessExcel(data) {
//     //Read the Excel File data.
//     var workbook = XLSX.read(data, {
//         type: 'binary'
//     });
//
//     //Fetch the name of First Sheet.
//     var firstSheet = workbook.SheetNames[0];
//
//     //Read all rows from First Sheet into an JSON array.
//     var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
//
//     //Create a HTML Table element.
//     var table = document.createElement("table");
//     table.border = "1";
//
//     //Add the header row.
//     var row = table.insertRow(-1);
//
//     //Add the header cells.
//     var headerCell = document.createElement("TH");
//     headerCell.innerHTML = "Id";
//     row.appendChild(headerCell);
//
//     headerCell = document.createElement("TH");
//     headerCell.innerHTML = "Name";
//     row.appendChild(headerCell);
//
//     headerCell = document.createElement("TH");
//     headerCell.innerHTML = "Country";
//     row.appendChild(headerCell);
//
//     //Add the data rows from Excel file.
//     for (var i = 0; i < excelRows.length; i++) {
//         //Add the data row.
//         var row = table.insertRow(-1);
//
//         //Add the data cells.
//         var cell = row.insertCell(-1);
//         cell.innerHTML = excelRows[i].Id;
//
//         cell = row.insertCell(-1);
//         cell.innerHTML = excelRows[i].Name;
//
//         cell = row.insertCell(-1);
//         cell.innerHTML = excelRows[i].Country;
//     }
//
//     var dvExcel = document.getElementById("dvExcel");
//     dvExcel.innerHTML = "";
//     dvExcel.appendChild(table);


    function next() {
        var url = new URL(window.location.href);
        let caseID = url.searchParams.get("caseID");
        const newUrl = new URL('../../pages/cases/case.html', url);
        newUrl.searchParams.append("caseID", caseID);
        window.location.href = newUrl.href;
    };

    let numID = 2;
    const url = 'http://dummy.restapiexample.com/api/v1/employees';
    const request = new XMLHttpRequest();
    window.onload = onLoad();




