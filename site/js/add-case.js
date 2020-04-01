function addAttorney() {
    let dropdown = document.getElementById("attorneySelctor")

    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;
            for (let i = 0; i < data.data.length; i++) {
                option = document.createElement('option');
                option.text = data.data[i].employee_name;
                dropdown.add(option);
            }
        } else {
            console.log("??????????")
        }
    }
    request.send();
}

const url = 'http://dummy.restapiexample.com/api/v1/employees';
const request = new XMLHttpRequest();
addAttorney();

$(function() {
    $("#datepicker").datepicker({
        showOn: "button",
        buttonImage: "https://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
});