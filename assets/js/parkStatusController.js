function checkParkStatus() {
	var xmlhttp = new XMLHttpRequest();
    
	xmlhttp.onreadystatechange = processRequest;
	xmlhttp.open("GET", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_personagem/?_view=json&_expand=yes", true);
	xmlhttp.send();

	function processRequest() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	console.log('reading')
	        var restifyData = JSON.parse(xmlhttp.responseText);

	        var rowsLength = restifyData.restify.rows.length;

	        // Update parks status
	        if (rowsLength > 0) {
	            var parkState = restifyData.restify.rows[0].values.item_level.value;
            	var parkName = restifyData.restify.rows[0].values.especializacao.value;
            	var parkId = restifyData.restify.rows[0].values.id.value

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
	        		removeParkFromDatabase(parkId);
            	}
	        
	        }
	    }
	}
}

function removeParkFromDatabase(parkId) {
    var xmlhttp = new XMLHttpRequest();

    var parkToDeleteAddress = "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_personagem/152" + parkId;

    // Sent a DELETE request with bookId
    xmlhttp.open("PUT", parkToDeleteAddress, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
}

setInterval(checkParkStatus, 1000);