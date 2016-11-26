var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var SerialPort = require('serialport');
var xmlhttp = new XMLHttpRequest();
var port = new SerialPort('COM6');
var dataSend = [];

main();

function main() {
   var data;
   port.on('open', function() {
    port.write('main screen turn on', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('message written');
      port.on('data', function(data){
        dataSend = data[0];
        if (dataSend == 0) {
          console.log ("Vaga Ocupada")
        }

        else {
          console.log ("Vaga Livre")
        }

        arduinoState(dataSend);
      })
    });
  });
   
  // open errors will be emitted as an error event 
  port.on('error', function(err) {
    console.log('Error: ', err.message);
  });
};

function arduinoState(dataSend) {
  
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
      main();
    }  
  }

  xmlhttp.open("PUT", "http://www.smartsoft.com.br/webservice/restifydb/Employees/diw_personagem/152", true); //adicionar a ID da Vaga em Questão a requisição PUT
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  var info = {
    "item_level": dataSend
  }
  var dataToSend = '_data=' + JSON.stringify(info);
  xmlhttp.send(dataToSend);
};