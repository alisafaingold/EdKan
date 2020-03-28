document.getElementById('addRowToWitnessesForm').onclick=function () {

    var element = document.getElementById("addHere");
    //First div
    var newDivFormRow = document.createElement("div");
    newDivFormRow.setAttribute("class","form-row");
    //Check box div
    var newDivForm = document.createElement("div");
    newDivForm.setAttribute("class","form-check mx-sm-2");
    newDivForm.setAttribute("dir","ltr");
    //check box label
    var newlabel = document.createElement("label");
    newlabel.setAttribute("class","form-check-label");
    newlabel.innerHTML = "שוטר";
    //check box input
    var newInput = document.createElement("input");
    newInput.setAttribute("type","checkbox");
    newInput.setAttribute("class","form-check-input");
    newInput.setAttribute("checked","")
    //Add


    newlabel.appendChild(newInput);
    newDivForm.appendChild(newlabel);
    newDivFormRow.appendChild(newDivForm);

    //input 2
    var newInput2 = document.createElement("input");
    newInput2.setAttribute("type","text");
    newInput2.setAttribute("class","form-control mb-2 mr-sm-2");
    newInput2.setAttribute("id","inlineFormInputGroupUserName"+numID);
    newInput2.setAttribute("placeholder","שם פרטי");
    newDivFormRow.appendChild(newInput2);
    //input 3
    var newInput3 = document.createElement("input");
    newInput3.setAttribute("type","text");
    newInput3.setAttribute("class","form-control mb-2 mr-sm-2");
    newInput3.setAttribute("id","inlineFormInputGroupUserLastName"+numID);
    newInput3.setAttribute("placeholder","שם משפחה");
    newDivFormRow.appendChild(newInput3);

    //input 4
    var newInput4 = document.createElement("input");
    newInput4.setAttribute("type","text");
    newInput4.setAttribute("class","form-control mb-2 mr-sm-2");
    newInput4.setAttribute("id","inlineFormInputGroupUserID"+numID);
    newInput4.setAttribute("placeholder","ת.ז");
    newDivFormRow.appendChild(newInput4);

    //input 5
    var newInput5 = document.createElement("input");
    newInput5.setAttribute("type","text");
    newInput5.setAttribute("class","form-control mb-2 mr-sm-2");
    newInput5.setAttribute("id","inlineFormInputGroupUserPhone"+numID);
    newInput5.setAttribute("placeholder","טלפון");
    newDivFormRow.appendChild(newInput5);

    //input 6
    var newInput6 = document.createElement("input");
    newInput6.setAttribute("type","text");
    newInput6.setAttribute("class","form-control mb-2 mr-sm-2");
    newInput6.setAttribute("id","inlineFormInputGroupUserMail"+numID);
    newInput6.setAttribute("placeholder","מייל");
    newDivFormRow.appendChild(newInput6);

    element.appendChild(newDivFormRow)
    numID++;
}
let numID=2;

$('[data-toggle="checkbox"]').each(function () {
    var $checkbox = $(this);
    $checkbox.checkbox();
});

