function insertParkData() {
	var isAvaible = document.forms[0].isAvaible.value;
	var parkingSpace = document.forms[0].parkingSpace.value;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {               
            alert('Vaga inserida com sucesso');
        }
    };

    xmlhttp.open("POST", "http://www.smartsoft.com.br/webservice/restifydb/Employees/prp_vaga", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    var data = {
        "estado": isAvaible,
        "nmvaga": parkingSpace
    };

    var dataToSend = '_data=' + JSON.stringify(data);

    xmlhttp.send(dataToSend);
}

function deleteParkingLocation() {
	var parkingId = document.forms[1].parkingId.value;

    var xmlhttp = new XMLHttpRequest();

    var parkToDeleteAddress = "http://www.smartsoft.com.br/webservice/restifydb/Employees/prp_vaga/" + parkingId;

    // Sent a DELETE request with bookId
    xmlhttp.open("DELETE", parkToDeleteAddress, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();


    alert('Removido com sucesso');
    document.forms[1].parkingId.value = "";
}