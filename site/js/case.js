function addDetails() {
    // let fakeData = '{"witnesses":[{"witnessID":"123","Phone":"0541234567","witnessType":1,"Adress":"tel aviv 12","firstname":"ed1","lastname":"last1","_id":{"$oid":"5e7b7f0a520b082b50dae866"},"email":"ed1@gmail.com","cases":[{"caseID":"2020","notes":"bbbbbbb"},{"caseID":"2021","notes":"qqqqqqq"}],"language":"heb"},{"witnessID":"456","Phone":"0541234567","witnessType":2,"Adress":"tel aviv 12","firstname":"cup1","lastname":"lastcup1","_id":{"$oid":"5e8712a21c9d4400002387d3"},"rank":"רסל","station":"ירקון","email":"cup1@gmail.com","cases":[{"caseID":"2020","notes":"bbbbbbb"},{"caseID":"2021","notes":"qqqqqqq"}],"language":"heb"}],"caseDetails":{"_id":{"$oid":"5e7b7e9c520b082b50dae85f"},"caseID":"2020","courtID":"1","lawyers":["1234","5678"],"openingUserID":"123456789","openingDate":{"$date":1577829600000},"PMD":"11111","notes":"בלה בלה בלה","buffers":["b1","b2","b3"],"type":"criminal"},"hearings":[{"_id":{"$oid":"5e9754d91c9d44000027066d"},"hearingID":"456","caseID":"2020","courtID":"1","hallID":"3","hearingDate":"2020-04-15","hearingHour":"22:00"}]}';
    document.getElementById("title").innerText="תיק מספר "+caseID;

    let url = ip+'/getCaseDetails?caseID=' + _id;

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
            let caseType = data["caseDetails"].caseType;
            let courtName;
            if(courtID==='1')
                courtName="מחוזי";
            else if(courtID==='2')
                courtName="שלום";
            else{
                courtName="פלילי";
            }
            // let caseDetails1 = data.
            let first = document.createTextNode("תאריך פתיחה: "+openingDate);
            let second = document.createTextNode("תיק בית משפט "+courtName);
            let third = document.createTextNode("עורך דין מטפל: "+lawyer);
            let br = document.createElement('br');

            let case1 = document.getElementById("caseDetails1");
            case1.appendChild(first);
            case1.appendChild(br);
            case1.appendChild(second);
            case1.appendChild( br.cloneNode(true));
            case1.appendChild(third);

            let first1 = document.createTextNode('מספר פמ"ד: '+PMD);
            let second2  = document.createTextNode("סוג התיק: "+caseType);
            let third2 = document.createTextNode("הערות: "+notes);


            let case2 = document.getElementById("caseDetails2");
            case2.appendChild(first1);
            case2.appendChild(br.cloneNode(true));
            case2.appendChild(second2);
            case2.appendChild(br.cloneNode(true));
            case1.appendChild(third2);


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
                        localStorage.setItem(button.id,witnesses[i]._id)
                        button.setAttribute("onClick", "goToWitnessUrl(" + "this" + ")");
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
                button.id=hearings[i].id;
                localStorage.setItem(button.id,hearings[i]._id)
                button.setAttribute("onClick", "goToHearingUrl(" + "this" + ")");
                cardH.appendChild(button);
            }

            // ======== Remember


        }

    }
    request.send();
}


function goToWitnessUrl(button){
    let url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/witness.html', url);
    newUrl.searchParams.append("witnessID", button.id);
    window.location.href = newUrl.href;
};

function goToHearingUrl(button){
    let url = new URL(window.location.href);
    const newUrl = new URL('../../pages/cases/witness.html', url);
    newUrl.searchParams.append("witnessID", button.id);
    window.location.href = newUrl.href;
};



//Extract
function generateWord() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let url = ip+'/getCaseDetails?caseID=' + _id;
    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        let witnesses = data.witnesses;
        var text = "";
        var paragraph;
        const doc = new Document();
        for (let i = 0; i < witnesses.length; i++) {
            paragraph = new Paragraph(witnesses[i].firstname + " " + witnesses[i].lastname+" "+ witnesses[i].phone+ "\n");
            doc.addParagraph(paragraph);
        }
        doc.addParagraph(paragraph);

        const packer = new Packer();

        packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "witnesses.docx");
            console.log("Document created successfully");
        });
    };

    request.send();
}

function generateCSV() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let url = ip+'/getCaseDetails?caseID=' + _id;
    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var arrData = typeof data != 'object' ? JSON.parse(data) : data;

        var CSV = 'sep=,' + '\r\n\n';

        //This condition will generate the Label/Header
        if (true) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "MyReport_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += "witnesses".replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    request.send();
}

//Init
let ip = 'Http://192.168.1.6:8000';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let caseID = curUrl.searchParams.get("caseID");
let _id= localStorage.getItem(caseID);

addDetails();