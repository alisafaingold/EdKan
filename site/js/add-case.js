function getAttorney() {
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.data.length; i++) {
                attorney.push(data.data[i].employee_name);
            }
        } else {
            console.log("??????????")
        }
    }
    request.send();
}

function saveAndNext() {
    let caseID= document.getElementById('caseId').value;
    let describeID= document.getElementById('describeId').value;
    let attorneyName= document.querySelector('select').value;
    let dateCase= document.getElementById('dateCase').value;

    //Save
    // request.open('POST',)

    //next page

    setGetParameter('caseID',caseID);
}

function setGetParameter(paramName, paramValue)
{
    var url = window.location.href;
    var index =url.lastIndexOf('/')+1;
    var page =url.substring(index);
    url = url.replace(page, 'add-buffer.html');
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName + "="));
        var suffix = url.substring(url.indexOf(paramName + "="));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
        if (url.indexOf("?") < 0)
            url += "?" + paramName + "=" + paramValue;
        else
            url += "&" + paramName + "=" + paramValue;
    }
    window.location.href = url;
}


// function validation()
// {
//     var forms = document.getElementsByClassName('needs-validation');
//     var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener('submit', function(event) {
//             if (form.checkValidity() === false) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//             form.classList.add('was-validated');
//         })
//     })
// }



const url = 'http://dummy.restapiexample.com/api/v1/employees';
const request = new XMLHttpRequest();
const attorney =new Array;
// getAttorney();
// validation();
