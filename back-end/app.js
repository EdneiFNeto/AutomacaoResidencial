import express from 'express';
import  http from 'http';
import { getDatabase, ref, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { format } from 'date-fns'

const firebaseConfig = {
  apiKey: "AIzaSyCfB7NxypqH-9AzpRa31XGM4srjxP-vJ-w",
  authDomain: "iot---app.firebaseapp.com",
  databaseURL: "https://iot---app-default-rtdb.firebaseio.com",
  projectId: "iot---app",
  storageBucket: "iot---app.appspot.com",
  messagingSenderId: "842760815061",
  appId: "1:842760815061:web:e0913baf755a469d45fd5c",
  measurementId: "G-9NBPZD7GN1"
};

initializeApp(firebaseConfig);

const app = express();
app.use(express.json());

const server = http.createServer(app);
import SerialPort from 'serialport';
const ReadLine = SerialPort.parsers.Readline;

const mySerial = new SerialPort("COM25", { 
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
    sendConsumo({data, date_time: format(new Date(), 'dd/MM/yyyy HH:mm:ss'), kwh: 100.9, value: 0.01});
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

async function sendConsumo(data) {
  const db = getDatabase();
  push(ref(db, '/consumption_kwth'), 
    { ...data })
    .catch(error => console.error('error', error));
}

server.listen(3000, () => {
  console.log(`Server run in ${format(new(Date), 'yyyy-MM-dd HH:mm:ss')}`);
});




