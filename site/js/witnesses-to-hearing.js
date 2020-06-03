$(document).ready(function () {
    let url = ip + '/getCaseWitnesses?caseID=' + _id;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            let witnessesTable = document.getElementById("witnessesTable");
            let data = JSON.parse(request.responseText);
            let witnesses = data['witnesses'];
            for (let i = 0; i < witnesses.length; i++) {
                let row = document.createElement("tr");
                let input = document.createElement("input");
                input.setAttribute("class", "checkthis");
                input.setAttribute("type", "checkbox");
                input.setAttribute("name", witnesses[i]._id.$oid);
                input.setAttribute("value", witnesses[i].firstname + " " + witnesses[i].lastname);
                if(sessionStorage.getItem(witnesses[i].witnessID)){
                    input.setAttribute("disabled", "disabled");
                }
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');
                td1.appendChild(input);
                td2.appendChild(document.createTextNode(witnesses[i].witnessID));
                td3.appendChild(document.createTextNode(witnesses[i].firstname));
                td4.appendChild(document.createTextNode(witnesses[i].lastname));
                td5.appendChild(document.createTextNode(witnesses[i].phone));
                if(witnesses[i].mail){
                    td6.appendChild(document.createTextNode(witnesses[i].mail));
                }
                else{
                    td6.appendChild(document.createTextNode('-'));
                }
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
                row.appendChild(td6);
                witnessesTable.appendChild(row);

            }
            createTable();
        }
    }
    request.send();

});

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
            searchPlaceholder: "חפש עד לפי כל מזהה",
            search: ""
        },
        "aoColumnDefs": [
            {aTargets: [0], bSortable: false}
        ],
        searching: true, paging: true, info: false
    });
};


function goNext(ids, names) {
    localStorage.setItem('ids', JSON.stringify(ids));
    localStorage.setItem('names', JSON.stringify(names));
    let goTo = curUrl.searchParams.get("h");
    let newUrl = new URL('../../pages/hearing/hearing-summary.html', curUrl);
    newUrl.searchParams.append('caseID', curCaseId);
    newUrl.searchParams.append('h', goTo);
    window.location.href = newUrl.href;
}

$(document).ready(
    (function ($) {
        'use strict';
        $('#save').on('click', function () {
            let client_table = $('#recent-purchases-listing');
            var inputs = document.getElementsByTagName("input");
            let ids = [];
            let names = [];
            let j = 0;
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "checkbox" && inputs[i].checked && inputs[i].id!=="checkall") {
                    ids.push(inputs[i].name);
                    names.push(inputs[i].value);
                    // ids[j] = inputs[i].name;
                    // names[j] = inputs[i].value;
                    j++;

                }
            }
            goNext(ids, names);
        })
    })(jQuery)
);

let ip = 'http://icc.ise.bgu.ac.il/njsw07/edkan';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let curCaseId = curUrl.searchParams.get("caseID");

let _id = localStorage.getItem(curCaseId);


