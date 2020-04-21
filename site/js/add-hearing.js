window.onload = function(){
    caseID = curUrl.searchParams.get("caseID");
    _id = localStorage.getItem(caseID);
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
                if(input.name==='caseID'){
                    data[input.name] = _id;

                }
                else{
                    data[input.name] = input.value;

                }
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
    let localUrl =ip+'/saveHearing';
    let s = JSON.stringify(data);
    $.ajax({
        method: "POST",
        url: localUrl,
        data: s
    })
        .done(function( msg ) {
            localStorage.setItem('hearingID',msg);
            const newUrl = new URL('../../pages/hearing/witnesess-to-hearing.html', curUrl);
            newUrl.searchParams.append('caseID',caseID);
            window.location.href = newUrl.href;
        });

    //
    // $.post(localUrl,
    //     {
    //         data
    //     },
    //     function(data1,status){
    //         localStorage.setItem('hearingID',data1);
    //     });

    // request.open('POST',localUrl,false);
    // //TODO TALK WITH ITAI ABOUT THIS API ==> SHOULD RETURN _ID FOR CASE IF NOT EXIST
    // request.onreadystatechange = function() {
    //     // If the request completed, close the extension popup
    //     if (request.readyState == 4){
    //         if (request.status == 200){
    //             localStorage.setItem('hearingID',request.responseText);
    //         }
    //     }
    // }
    // request.send(JSON.stringify(data));
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
        // goToWitnessesToHearingUrl('caseID',caseID);
    }
    else{
        form.classList.add('was-validated');
    }

};

function goToWitnessesToHearingUrl(paramName, paramValue){
    const newUrl = new URL('../../pages/hearing/witnesess-to-hearing.html', curUrl);
    newUrl.searchParams.append(paramName, paramValue);
    window.location.href = newUrl.href;
};

let ip = 'Http://192.168.1.107:8000';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let caseID;
let _id;