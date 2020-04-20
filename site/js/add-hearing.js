window.onload = function(){
    caseID = curUrl.searchParams.get("caseID");
    if(caseID!=null){
        document.getElementById("caseID").value=caseID;
        _id = localStorage.getItem(caseID);
    }

    let courtSelector = document.getElementById("courtSelector");
    //
    // //========== Court ====================
    // let api = 'Http://192.168.1.107:8000/getCourt';
    // let request = new XMLHttpRequest()
    // request.open('GET', api, true);
    // request.onload = function() {
    //     if (request.status === 200) {
    //         const data = JSON.parse(request.responseText);
    //         for (let i = 0; i < data["lawyers"].length; i++) {
    //             let optgroup = document.createElement('optgroup');
    //             let option = document.createElement('option');
    //             option.name=data["lawyers"][i]["lawyerID"]
    //             option.text = data["lawyers"][i]["firstname"].toUpperCase()+" "+data["lawyers"][i]["lastname"].toUpperCase();
    //             option.id=1;
    //             optgroup.appendChild(option);
    //             dropdown.add(optgroup);
    //         }
    //     } else {
    //         console.log("??????????")
    //     }
    // }
    // request.send();



};
function saveCase() {
    let form = document.getElementsByTagName('form')[0];
    if (form.checkValidity() === true) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                if(input.name==='caseID' && caseID==null){
                    caseID=input.value;
                }
                data[input.name] = input.value;
            }
        }
        data["openingUserID"] = "1";
        localStorage.setItem('hearing', data);
        saveToService(data);
    } else {
        form.classList.add('was-validated');
    }
};

function saveToService(data) {
    let localUrl =url+'/saveHearing';
    if(_id!=null){
        localUrl +='?caseID='+_id;
    }
    request.open('POST',localUrl,true);
    request.send(JSON.stringify(data));
    //TODO TALK WITH ITAI ABOUT THIS API ==> SHOULD RETURN _ID FOR CASE IF NOT EXIST
    request.onreadystatechange = function() {
        // If the request completed, close the extension popup
        if (request.readyState == 4){
            if (request.status == 200){
                localStorage.setItem(caseID,request.responseText);
            }
        }
    }
    request.send(JSON.stringify(data));
    localStorage.setItem("hearing", JSON.stringify(data));
};


function saveAndNext() {
    let form  = document.getElementsByTagName('form')[0];
    if(form.checkValidity()===true){
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                if(input.name==='caseID' && caseID==null){
                    caseID=input.value;
                }
                data[input.name] = input.value;
                localStorage.setItem(input.name, input.value);
            }
        }
        saveToService(data);
        goToWitnessesToHearingUrl('caseID',caseID);
    }
    else{
        form.classList.add('was-validated');
    }

};

function goToWitnessesToHearingUrl(paramName, paramValue){
    const newUrl = new URL('../../pages/hearing/witnesess-to-hearing.html', url);
    newUrl.searchParams.append(paramName, paramValue);
    window.location.href = newUrl.href;
};

let ip = 'Http://192.168.1.6:8000';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let caseID;
let _id;