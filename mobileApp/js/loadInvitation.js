$( document ).ready(function() {
        var query = window.location.search.substring(1);
        var qs = parse_query_string(query);
        console.log(qs.hearingID + " -- " + qs.witnessID);

        // var url = 'Http://192.168.1.107:8000/getHearingDetails?hearingID=' + qs.hearingID + '&witnessID=' + qs.witnessID;
        var url = 'Http://192.168.1.107:8000/getHearingDetails?hearingID=' + "5e9cc768d02e136b9dd96797" + '&witnessID=' + "5e9ea2868fa38549d28577aa";

        // var url = "https://api.jsonbin.io/b/5e9b0b8e5fa47104cea2fae3";
        var request = new XMLHttpRequest()
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        console.log(url);
// Open a new connection, using the GET request on the URL endpoint
        request.open('GET', url, true);
        request.onload = function () {
            var data = JSON.parse(request.responseText);
            var hearing = data.hearing;
            console.log(hearing.subject);
            console.log(data.language);

            var timeHeader = document.getElementById("time_header");
            var locationHeader = document.getElementById("location_header");
            var contactHeader = document.getElementById("contact_header");
            var hearingSubject = document.getElementById("hearing_subject");
            var lawyerName = document.getElementById("lawyer_name");
            var lawyerPhone = document.getElementById("lawyer_phone");
            var hallLocation = document.getElementById("hall_location");
            var courtLocation = document.getElementById("court_location");
            var hourHeader = document.getElementById("hour");
            var dateHeader = document.getElementById("date");
            var locationGuide = document.getElementById("location_guide");
            var declineArrival = document.getElementById("decline_arrival");
            var approveArrival = document.getElementById("approve_arrival");
            var mainHeader = document.getElementById("main_header");

            if (data.language == "1") {
                timeHeader.innerHTML = "מועד הדיון";
                locationHeader.innerHTML = "מיקום הדיון";
                contactHeader.innerHTML = "יצירת קשר";
            } else if (data.language == "2") {
                timeHeader.innerHTML = "дата слушения";
                locationHeader.innerHTML = "место  слушения";
                contactHeader.innerHTML = "свяжитесь с нами";
                dateHeader.innerHTML = "дата слушения: ";
                hourHeader.innerHTML = "начало слушения: ";
                courtLocation.innerHTML = "заседание суда: ";
                hallLocation.innerHTML = "зал заседаний: ";
                lawyerName.innerHTML = "Имя: ";
                lawyerPhone.innerHTML = "Номер телефона: ";
                locationGuide.innerHTML = "инструкции по пребыванию";
                declineArrival.innerHTML = "нажмите  для установления новой даты";
                approveArrival.innerHTML = "нажмите для подтверждения пребывания";
                mainHeader.innerHTML = "повестка на заседание суда";
            } else if (data.language == "3") {
                timeHeader.innerHTML = "موعد المناقشة";
                locationHeader.innerHTML = "موقع المناقشة";
                contactHeader.innerHTML = "االتواصل";
                dateHeader.innerHTML = "تاريخ المناقشة: ";
                hourHeader.innerHTML = "وقت المناقشة: ";
                courtLocation.innerHTML = "المحكمة: ";
                hallLocation.innerHTML = "قاعة المحكمة: ";
                lawyerName.innerHTML = "الاسم: ";
                lawyerPhone.innerHTML = "الرقم: ";
                locationGuide.innerHTML = "الاتجاهات";
                declineArrival.innerHTML = "اضغط لتحديد موعد جديد";
                approveArrival.innerHTML = "اضغط لتاكيد وصولك";
                mainHeader.innerHTML = "استدعاء للمناقشة في المحكمة";
            }
            dateHeader.innerHTML += hearing.hearingDate;
            hourHeader.innerHTML += hearing.hearingHour;
            courtLocation.innerHTML += hearing.courtID;
            hallLocation.innerHTML += hearing.hallID;
            lawyerName.innerHTML += hearing.contactName;
            lawyerPhone.innerHTML += hearing.contactNumber;
            hearingSubject.innerHTML = hearing.subject;
        }

// Send request
        request.send();
});


function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}