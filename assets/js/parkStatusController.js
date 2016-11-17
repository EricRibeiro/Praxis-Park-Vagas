function checkParkStatus() {
	var xmlhttp = new XMLHttpRequest();
    
	xmlhttp.onreadystatechange = processRequest;
	xmlhttp.open("GET", "http://www.smartsoft.com.br/webservice/restifydb/Employees/prp_vaga/?_view=json&_expand=yes", true);
	xmlhttp.send();

	function processRequest() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	console.log('reading')
	        var restifyData = JSON.parse(xmlhttp.responseText);

	        var rowsLength = restifyData.restify.rows.length;

	        // Update parks status
	        if (rowsLength > 0) {
	            var parkState = restifyData.restify.rows[0].values.estado.value;
            	var parkName = restifyData.restify.rows[0].values.nmvaga.value;
            	var parkId = restifyData.restify.rows[0].values.cdvaga.value

            	var parkElement = document.getElementById(parkName);

            	if (parkElement) {
	            	// Define status
	            	if (parkState == 0) {
		            	if (!parkElement.className.match('unavaible-lot')) {
		            		parkElement.className += ' unavaible-lot';
		            	}
	            	} else if (parkState == 1) {
	            		if (parkElement.className.match('unavaible-lot')) {
		            		parkElement.className = parkElement.className.split(' ')[0];
		            	}
	            	}
            	} else {
            		alert("A vaga " + parkName + " foi cadastrada de forma incorreta, removendo...");
            	}
	        
	        removeParkFromDatabase(parkId);
	        }
	    }
	}
}

function removeParkFromDatabase(parkId) {
    var xmlhttp = new XMLHttpRequest();

    var parkToDeleteAddress = "http://www.smartsoft.com.br/webservice/restifydb/Employees/prp_vaga/" + parkId;

    // Sent a DELETE request with bookId
    xmlhttp.open("DELETE", parkToDeleteAddress, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
}

setInterval(checkParkStatus, 1000);