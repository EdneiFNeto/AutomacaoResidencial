const express = require('express');
const http = require('http');

const app = express();
app.use(express.json());

const server = http.createServer(app);

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const mySerial = new SerialPort("COM21", { 
  baudRate: 9600,
});

let myValue;
const parser = new ReadLine({ delimiter: '\r\n' });
mySerial.pipe(parser);

mySerial.on("open", () => {
  parser.on('data', (data) => {
    if(myValue !== undefined){
      const  valueLowecase = String(myValue).toUpperCase();

      if(valueLowecase === 'OFF'){
        mySerial.write('1') 
      } else if(valueLowecase === 'ON'){
        mySerial.write('2') 
      }
    }

    console.log('data', data);
  });
});

app.post('/low', (request, response, next ) => {
  const { command } = request.body;
  const  valueLowecase = String(command).toUpperCase();
  
  if(valueLowecase !== 'OFF' && valueLowecase !== 'ON')
    return response.status(404).json({ status: `Command not found` });
  
  myValue = command;
  return response.status(200).json({ status: valueLowecase === 'OFF' ? 'OFF': 'ON' });
});

server.listen(3000, () => {
  console.log('server run...');
});




