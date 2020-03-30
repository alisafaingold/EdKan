function addCaseDetails() {
    let buffers = document.getElementById("buffers")
    request.open('GET', url, true,);

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            for (let i = 0; i < data.data.length; i++) {
                // var mainDiv= document.createElement("div");
                // mainDiv.setAttribute("class","col-md-4 grid-margin grid-margin-md-0 stretch-card")
                //
                // var cardDiv= document.createElement("div");
                // mainDiv.setAttribute("class","card")
                //
                // var cardBodyDiv= document.createElement("div");
                // mainDiv.setAttribute("class","card-body")
                //
                // var h4= document.createElement("h4");
                // mainDiv.setAttribute("class","card-title")
                // h4.innerText="חוצץ מס'"+data.data[i].employee_salary;
                // var p= document.createElement("p");
                //
                // p.innerText="Date: "+data.data[i].id;+"</br>";
                //
                // cardBodyDiv.appendChild(h4);
                // cardBodyDiv.appendChild(p);
                // cardDiv.appendChild(cardBodyDiv);
                // mainDiv.appendChild(cardDiv);
                // buffers.appendChild(mainDiv);

                var button = document.createElement("button");
                button.className = "btn btn-outline-primary btn-fw";
                button.innerHTML = "תיק מס' " + data.data[i].employee_salary;
                button.id = data.data[i].employee_salary;
                button.setAttribute("onClick", "login(" + "this" + ")");
                buffers.appendChild(button);
            }
        } else {
            console.log("??????????")
        }
    }
    request.send();
}

const url = 'http://dummy.restapiexample.com/api/v1/employees';
const request = new XMLHttpRequest();
addCaseDetails();

