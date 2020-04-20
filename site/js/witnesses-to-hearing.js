function init() {
    let url = ip+'/getCaseDetails?caseID=' + '5e9cc06bdbf40f0f81fd6c6b';
    var request = new XMLHttpRequest()
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            let witnessesTable = document.getElementById("witnessesTable");
            const data = JSON.parse(request.responseText);
            let witnesses = data.witnesses;
            for (let i = 0; i < witnesses.length; i++) {
                $('#recent-purchases-listing').DataTable().row.add([ "<input type=\"checkbox\" class=\"checkthis\" />", "1","2","3","4","5","6"]).draw();
                // witnessesTable.datarow.add( ["<input type=\"checkbox\" class=\"checkthis\" />",data["witnesses"][i].firstname, data["witnesses"][i].firstname, 'Edinburgh' ] ).draw();

            }
        }
    }

}

'use strict';
$(function() {
    $('#recent-purchases-listing').DataTable().row.add([ "<input type=\"checkbox\" class=\"checkthis\" />", "1","2","3","4","5","6"]).draw();
});
$()


function goNext(ids, names) {
    localStorage.setItem('ids', JSON.stringify(ids));
    localStorage.setItem('names', JSON.stringify(names));
    let newUrl = new URL('../../pages/hearing/hearing-summary.html', url);
    newUrl.searchParams.append('caseID', curCaseId);
    window.location.href = newUrl.href;
}

$(document).ready(
    (function ($) {
        'use strict';
        $(function () {
            $('#recent-purchases-listing').DataTable().row.add(["<input type=\"checkbox\" class=\"checkthis\"/>", "1", "2", "3", "4", "5", "6"]).draw().node().id = "11";
        });
        $('#save').on('click', function () {
            let client_table = $('#recent-purchases-listing');
            var ids = $('input[type="checkbox"]').map(function () {
                return $(this).prop("checked") ? $(this).closest('tr')[0].cells[1].innerHTML : null;
            });
            var names = $('input[type="checkbox"]').map(function () {
                return $(this).prop("checked") ? $(this).closest('tr')[0].cells[2].innerHTML : null;
            });
            goNext(ids, names);
        })
    })(jQuery)
);

let ip = 'Http://192.168.1.8:8000';
const request = new XMLHttpRequest();
let curUrl = new URL(window.location.href);
let curCaseId = curUrl.searchParams.get("caseID");
let _id = localStorage.getItem(curCaseId);

init();


