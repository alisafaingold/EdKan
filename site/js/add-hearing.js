window.onload = function(){
    let url = new URL(window.location.href);
    let caseID = url.searchParams.get("caseID");
    if(caseID!=null){
        document.getElementById("caseID").value=caseID;
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

function save(data) {
    // let localUrl =url+'/saveHearing';
    // request.open('POST',localUrl,true);
    // request.send(JSON.stringify(data));

    //TODO where we go after that?
};


function saveAndNext() {
    let form  = document.getElementsByTagName('form')[0];
    if(form.checkValidity()===true){
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                data[input.name] = input.value;
            }
        }
        save(data);
        let caseID= document.getElementById("caseID").value;
        setGetParameter('caseID',caseID);
    }
    else{
        form.classList.add('was-validated');
    }

};


function saveCase() {
    let form = document.getElementsByTagName('form')[0];
    if (form.checkValidity() === true) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                data[input.name] = input.value;
            }
        }
        data["openingUserID"] = "1";
        save(data);
    } else {
        form.classList.add('was-validated');
    }
};



function setGetParameter(paramName, paramValue){
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/hearing/witnesess-to-hearing.html', url);
    newUrl.searchParams.append(paramName, paramValue);
    window.location.href = newUrl.href;
};

let url="";