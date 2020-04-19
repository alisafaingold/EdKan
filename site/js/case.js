function addCaseDetails() {
    addDetails();

}



function addDetails() {
    let cururl = new URL(window.location.href);
    let caseID = cururl.searchParams.get("caseID");
    // let fakeData = '{"witnesses":[{"witnessID":"123","Phone":"0541234567","witnessType":1,"Adress":"tel aviv 12","firstname":"ed1","lastname":"last1","_id":{"$oid":"5e7b7f0a520b082b50dae866"},"email":"ed1@gmail.com","cases":[{"caseID":"2020","notes":"bbbbbbb"},{"caseID":"2021","notes":"qqqqqqq"}],"language":"heb"},{"witnessID":"456","Phone":"0541234567","witnessType":2,"Adress":"tel aviv 12","firstname":"cup1","lastname":"lastcup1","_id":{"$oid":"5e8712a21c9d4400002387d3"},"rank":"רסל","station":"ירקון","email":"cup1@gmail.com","cases":[{"caseID":"2020","notes":"bbbbbbb"},{"caseID":"2021","notes":"qqqqqqq"}],"language":"heb"}],"caseDetails":{"_id":{"$oid":"5e7b7e9c520b082b50dae85f"},"caseID":"2020","courtID":"1","lawyers":["1234","5678"],"openingUserID":"123456789","openingDate":{"$date":1577829600000},"PMD":"11111","notes":"בלה בלה בלה","buffers":["b1","b2","b3"],"type":"criminal"},"hearings":[{"_id":{"$oid":"5e9754d91c9d44000027066d"},"hearingID":"456","caseID":"2020","courtID":"1","hallID":"3","hearingDate":"2020-04-15","hearingHour":"22:00"}]}';
    document.getElementById("title").innerText="תיק מספר "+caseID;

    var url = 'Http://192.168.1.6:8000/getCaseDetails?caseID=' + caseID;
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            // const fakedata = JSON.parse(fakeData);
            //======== Case Details =================
            let courtID = data["caseDetails"].courtID;
            let lawyer = data["caseDetails"].lawyers[0];
            let od = data["caseDetails"].openingDate;
            let odd= new Date(Object.values(od)[0]);
            let openingDate = odd.toLocaleDateString ();
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
            // let caseDetails1 = data.
            var first = document.createTextNode("תאריך פתיחה: "+openingDate);
            var second = document.createTextNode("תיק בית משפט "+courtName);
            var third = document.createTextNode("עורך דין מטפל: "+lawyer);
            var br = document.createElement('br');

            let case1 = document.getElementById("caseDetails1");
            case1.appendChild(first);

            case1.appendChild(br);
            case1.appendChild(second)
            case1.appendChild( br.cloneNode(true));
            case1.appendChild(third);

            var first1 = document.createTextNode('מספר פמ"ד: '+PMD);
            var second2 = document.createTextNode("הערות: "+notes);

            let case2 = document.getElementById("caseDetails2");
            case2.appendChild(first1);
            case2.appendChild(br.cloneNode(true));
            case2.appendChild(second2);


            //=========== Witnesses =================
            let cardW = document.getElementById("collapse1");
            cardW.innerHTML="";
            let witnesses = data.witnesses;
            for (let i = 0; i < witnesses.length; i++) {
                let bigDiv = document.createElement("div");
                bigDiv.className="row mt-4";
                bigDiv.id="row"+i;
                for(let j=0; j<6 && i<witnesses.length; j++){
                    let div = document.createElement("div");
                    div.className="col-md-2";
                    let button = document.createElement("button");
                    button.className = "btn btn-outline-danger btn-lg";
                    button.innerHTML = witnesses[i].firstname+" "+witnesses[i].lastname;
                    button.id =witnesses[i].witnessID;
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
            let hearings = data.hearings;
            for (let i = 0; i < hearings.length; i++) {
                let button = document.createElement("button");
                button.className = "btn btn-inverse-info btn-lg btn-block";
                button.innerHTML = hearings[i].hearingDate +" "+hearings[i].hearingHour;
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

