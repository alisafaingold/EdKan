function generate() {
    var url = 'http://dummy.restapiexample.com/api/v1/employees';
    var request = new XMLHttpRequest()
    var element = document.getElementById("insertButtons");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    request.open('GET', url, true);
    request.onload = function () {
        element.innerHTML = "";
        var data = JSON.parse(this.response);
        var text = "";
        const paragraph = new Paragraph(text);
        for (let i = 0; i < data.data.length; i++) {
            text += data.data[i].employee_salary + "" + data.data[i].employee_salary+ "\n";
        }
        const doc = new Document();

        const institutionText = new TextRun("Foo Bar").bold();
        const dateText = new TextRun("Github is the best").tab().bold();
        paragraph.addRun(institutionText);
        paragraph.addRun(dateText);

        doc.addParagraph(paragraph);

        const packer = new Packer();

        packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "witnesses.docx");
            console.log("Document created successfully");
        });
    };

    request.send();
}