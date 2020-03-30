
$(document).ready(function () {
    var attorney = new Array();
    // function getAttorney() {
    //     request.open('GET', url, true);
    //     request.onload = function () {
    //         if (request.status === 200) {
    //             const data = JSON.parse(request.responseText);
    //             for (let i = 0; i < data.data.length; i++) {
    //                 attorney.push(data.data[i].employee_name);
    //             }
    //         } else {
    //             console.log("??????????")
    //         }
    //     }
    //     request.send();
    // }
    // function split(val) {
    //     return val.split(/,\s*/);
    // }
    function extractLast(request) {
        data = JSON.parse(request.responseText);
        return data.data.pop().employee_name;
    }


    $("#attorneySelector")
        // don't navigate away from the field on tab when selecting an item
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            source: function (request, response) {
                $.ajax({
                    //receives json array answer from the url
                    url: "http://dummy.restapiexample.com/api/v1/employees",
                    data: {
                        term: extractLast(request)
                    },
                    dataType: "json",
                    type: "POST",
                    success: function (data) {
                        response(data);
                    },
                    error: function () {
                        // added an error handler for the sake of the example
                        response($.ui.autocomplete.filter(
                            ["opt1", "opt2"]
                            , extractLast(request.term)));
                    }
                });
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push(ui.item.value);
                // add placeholder to get the comma-and-space at the end
                terms.push("");
                this.value = terms.join(", ");
                return false;
            }
        });
});
