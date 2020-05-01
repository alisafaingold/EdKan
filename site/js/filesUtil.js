function generateWord() {
    var url = 'https://api.myjson.com/bins/13g2d4';
    var request = new XMLHttpRequest()
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var text = "";
        var paragraph;
        const doc = new Document();
        for (let i = 0; i < data.length; i++) {
            paragraph = new Paragraph(data[i].Name + " " + data[i].LastName + "\n");
            doc.addParagraph(paragraph);
        }
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

function generateCSV() {
    var url = 'https://jsonplaceholder.typicode.com/posts';
    var request = new XMLHttpRequest()
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var arrData = typeof data != 'object' ? JSON.parse(data) : data;

        var CSV = 'sep=,' + '\r\n\n';

        //This condition will generate the Label/Header
        if (true) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "MyReport_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += "witnesses".replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    request.send();
}

