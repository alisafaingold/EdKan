
// ================ Table ================

window.onload = function(){
    //todo
    localStorage.setItem('lawyerID', '5eb1725e64e8f921ee78ac6e');
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
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Officers_Template"
    };
    wb.SheetNames.push("Test Sheet");

    var ws_data = [["Type","Officer_ID","Officer_Rank","First_Name","Last_Name","Officer_Station", "Language", "Notes"]];  //a row with 2 columns

    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    $("#button-a").click(function(){
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Officers_Template.xlsx');
    });

    $("#button-a").click();


}

function generateCSVForWiteness() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Witnesses_Template"
    };
    wb.SheetNames.push("Test Sheet");

    var ws_data = [["Type","ID","First_Name","Last_Name","Address","Phone", "Language", "Notes"]];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    $("#button-a").click(function(){
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Witnesses_Template.xlsx');
    });

    $("#button-a").click();

}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

let ip = 'http://icc.ise.bgu.ac.il/njsw07/edkan';
const request = new XMLHttpRequest();
let calendar;

let coutrs=["בית המשפט המחוזי, באר שבע","בית משפט השלום, באר שבע","בית הדין האזורי לעבודה, באר שבע","בתי המשפט לעניינים מקומיים, באר שבע","בית המשפט לנוער, מחוז דרום, באר שבע"];
let lawyerID = localStorage.getItem("lawyerID");
let calendarID=1;
