function addCaseDetails() {
    addDetails();

}



function addDetails() {
    let cururl = new URL(window.location.href);
    let caseID = cururl.searchParams.get("caseID");
    document.getElementById("title").innerText="תיק מספר "+caseID;

    var url = 'Http://192.168.1.107:8000/getCaseDetails?caseID=' + '2020';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);

            //======== Case Details =================
            let courtID = data["caseDetails"].courtID;
            let lawyer = data["caseDetails"].lawyers[0];
            let openingDate = data["caseDetails"].openingDate;
            let PMD = data["caseDetails"].PMD;
            let notes = data["caseDetails"].notes;
            let courtName;
            if(courtID==='1')
                courtName="מחוזי";
            else if(courtID==='2')
                courtName="שלום";
            else{
                courtName="פלילי";
            }
            document.getElementById("caseDetails1").innerText="תאריך פתיחה: "+openingDate +"<br>"+"סוג בית משפט "+courtName+"<br>"+"עורך דין מטפל: "+lawyer+"<br>";
            document.getElementById("caseDetails2").innerText="<br>"+"מספר פמ'ד: "+PMD+"<br>"+"הערות: "+notes;


            //=========== Witnesses =================
            let cardW = document.getElementById("collapse1");
            cardW.innerHTML="";
            for (let i = 0; i < data["witnesses"].length; i++) {
                let bigDiv = document.createElement("div");
                bigDiv.className="row mt-4";
                bigDiv.id="row"+i;
                for(let j=0; j<6 && i<data["witnesses"].length; j++){
                    let div = document.createElement("div");
                    div.className="col-md-2";
                    let button = document.createElement("button");
                    button.className = "btn btn-outline-danger btn-lg";
                    button.innerHTML = data["witnesses"][i].firstname+data["witnesses"][i].lastname;
                    button.id =data["witnesses"][i].witnessID;
                    button.setAttribute("onClick", "moveToWitness(" + "this" + ")");
                    div.appendChild(button);
                    i++;
                    bigDiv.appendChild(div);
                }
                cardW.appendChild(bigDiv);
                i--;
            }

            // ======== Hearing =========
            let cardH = document.getElementById("collapse2");
            for (let i = 0; i < data["hearings"].length; i++) {
                let button = document.createElement("button");
                button.className = "btn btn-inverse-info btn-lg btn-block";
                button.innerHTML = data["hearings"][i].hearingDate +data["hearings"][i].hearingHour;
                cardH.appendChild(button);
            }

            // ======== Remember


        }
        else{
            console.log("??????????");
        }



    }
    request.send();
}

function moveToWitness(button){
    var url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/witness.html', url);
    newUrl.searchParams.append("witnessID", button.id);
    window.location.href = newUrl.href;
};

// const url = 'http://dummy.restapiexample.com/api/v1/employees';
// const request = new XMLHttpRequest();
addCaseDetails();

