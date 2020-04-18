// // function init() {
// //     let curUrl = new URL(window.location.href);
// //     let caseID = curUrl.searchParams.get("caseID");
// //
// //     //
// //     var url = 'Http://192.168.1.107:8000/getCaseDetails?caseID=' + '2020';
// //     var request = new XMLHttpRequest()
// //     request.open('GET', url, true);
// //     request.onload = function () {
// //         if (request.status === 200) {
// //             let witnessesTable = document.getElementById("witnessesTable");
// //             const data = JSON.parse(request.responseText);
// //             for (let i = 0; i < data["witnesses"].length; i++) {
// //                 witnessesTable.row.add( ["<input type=\"checkbox\" class=\"checkthis\" />",data["witnesses"][i].firstname, data["witnesses"][i].firstname, 'Edinburgh' ] ).draw();
// //
// //
// //             }
// //         }
// //     }
// //
// // }
//
// 'use strict';
// $(function() {
//     $('#recent-purchases-listing').DataTable().row.add([ "<input type=\"checkbox\" class=\"checkthis\" />", "1","2","3","4","5","6"]).draw();
// });
// $()


function goNext(ids, names) {
    localStorage.setItem('ids', JSON.stringify(ids));
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem("caseID", JSON.stringify(url.searchParams.get("caseID")));
    const newUrl = new URL('../../pages/hearing/hearing-summary.html', url);
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

var url = new URL(window.location.href);





