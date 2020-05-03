
// ================ Table ================

window.onload = function(){
    //todo
    localStorage.setItem('lawyerID', '5e9ef8df1c9d44000066a164');
    localStorage.setItem('lawyerName', 'תומר גודלי');
    let title = document.getElementById("title");
    title.innerText='שלום עו"ד ' +localStorage.getItem('lawyerName');
    let url = ip + '/getLawyerHearingsDashboard?lawyerID=' + lawyerID;
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            let hearingTable = document.getElementById("hearingTable");
            let data = JSON.parse(request.responseText);
            let hearings = data['hearings'];
            let meetings = data['meetings'];
            for (let i = 0; i < hearings.length; i++) {

                let courtID = hearings[i].courtID;
                let courtName = coutrs[courtID-1];

                //add to table
                let row = document.createElement("tr");
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');

                td1.appendChild(document.createTextNode(hearings[i].subject));
                td2.appendChild(document.createTextNode(hearings[i].caseNumber));
                td3.appendChild(document.createTextNode(courtName +" אולם: "+ hearings[i].hallID));
                let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                if(hearings[i].hearingDate.$numberLong){
                    d.setMilliseconds(hearings[i].hearingDate.$numberLong);
                }
                let date = d.getDate()+"/"+d.getMonth()+"/"+ d.getYear();
                td4.appendChild(document.createTextNode(date));
                td5.appendChild(document.createTextNode(hearings[i].hearingHour));
                td6.appendChild(document.createTextNode(hearings[i].numberOfApprovedWitnesses+"/"+hearings[i].numberOfWitnesses));
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
                row.appendChild(td6);
                hearingTable.appendChild(row);

                //add to calendar
                let event={id:calendarID , title:hearings[i].subject , start:  d, color: '#4d83ff' };
                calendar.addEvent(event);


            }
            for (let i=0; i<meetings.length; i++){

                let subject = meetings[i].subject;
                let caseID =  meetings[i].caseNumber;
                let eventPlace = meetings[i].eventPlace;
                let eventHour= meetings[i].eventHour;
                let eventDate= meetings[i].eventDate.$numberLong;
                let status = meetings[i].status;
                let statusTable;
                let d = new Date(0);
                d.setMilliseconds(eventDate);
                let date = d.getDate()+"/"+d.getMonth()+"/"+ d.getYear();

                //add to table
                let row = document.createElement("tr");
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');

                td1.appendChild(document.createTextNode(subject));
                td2.appendChild(document.createTextNode(caseID));
                td3.appendChild(document.createTextNode(eventPlace));
                td4.appendChild(document.createTextNode(date));
                td5.appendChild(document.createTextNode(eventHour));
                if(status==='sent'){
                    statusTable = "0/1";
                }else{
                    statusTable = "1/1";
                }
                td6.appendChild(document.createTextNode(statusTable));
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
                row.appendChild(td6);
                hearingTable.appendChild(row);

                //add to calendar
                let event={id:calendarID , title:subject , start:  d, color: '#ffc100'};
                calendar.addEvent(event);
                calendarID++;

            }
            createTable();
        }
    }
    request.send();

};

function createTable() {
    $('#recent-purchases-listing').DataTable({
        "aLengthMenu": [
            [5, 10, 15, -1],
            [5, 10, 15, "All"]
        ],
        rowId: function (a) {
            return a._id;
        },
        "iDisplayLength": 10,
        "language": {
            searchPlaceholder: "חפש דיון",
            search: ""
        },
        "aoColumnDefs": [
            {aTargets: [0], bSortable: false}
        ],
        searching: true, paging: true, info: false
    });
};


// ================ Calendar ================
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid' ],
        header: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        defaultDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
        ],
        eventRender: function (event, element, view) {
            if (event.color) {
                element.css('background-color', event.color)
            }
        }
    });

    calendar.render();

});

// ================ Extract Templates ================
function generateCSVForPolice() {
    var CSV = 'sep=,' + '\r\n\n';
    let arrData=["type","Officer ID","Officer Rank","First Name","Last Name","Officer Station", "Language", "Notes"];

    //This condition will generate the Label/Header
    if (true) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData) {

            //Now convert each value to string and comma-seprated
            row += arrData[index] + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }
    CSV +='1' + '\r\n';

    //Generate a file name
    var fileName = "template_";
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

}

function generateCSVForWiteness() {
    var CSV = 'sep=,' + '\r\n\n';
    let arrData=["type","ID","First Name","Last Name","Address","Phone", "Language", "Notes"];


    //This condition will generate the Label/Header
    if (true) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData) {

            //Now convert each value to string and comma-seprated
            row += arrData[index] + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }
    CSV +='0' + '\r\n';

    //Generate a file name
    var fileName = "template_";
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
}



let ip = 'Http://192.168.1.8:8000';
const request = new XMLHttpRequest();
let calendar;

let coutrs=["בית המשפט המחוזי, באר שבע","בית משפט השלום, באר שבע","בית הדין האזורי לעבודה, באר שבע","בתי המשפט לעניינים מקומיים, באר שבע","בית המשפט לנוער, מחוז דרום, באר שבע"];
let lawyerID = localStorage.getItem("lawyerID");
let calendarID=1;
