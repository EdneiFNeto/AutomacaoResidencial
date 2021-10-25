import express from 'express';
import  http from 'http';
import { getDatabase, ref, set } from "firebase/database";
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

import admin from 'firebase-admin';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const serviceAccount = require("./service/serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot---app-default-rtdb.firebaseio.com"
});

const dbFirestore = admin.firestore();

const app = express();
app.use(express.json());

const server = http.createServer(app);
import SerialPort from 'serialport';
const ReadLine = SerialPort.parsers.Readline;

const mySerial = new SerialPort("COM30", { 
  baudRate: 9600,
});

let _command = null;
let _email = null;
let _facebookId = null;
let _tariff = null;
let _flag = null;

const parser = new ReadLine({ delimiter: '\r\n' });
mySerial.pipe(parser);

mySerial.on("open", () => {
  parser.on('data', (data) => {
    if(_command !== null){
      const  valueLowecase = String(_command).toUpperCase();
      try {
        if(valueLowecase === 'ON' && _email !== null && _facebookId !== null && _tariff !== null && _flag !== null){
          const parser = JSON.parse(data);
          const { irms, potency, voltage } = parser;
          const tariff = parseFloat(Number(_tariff * voltage).toFixed(2));
          
          const dataRequest = { date_time: format(new Date(), 'dd/MM/yyyy HH:mm:ss'), 
            voltage,  
            potency, 
            tariff, 
            chain: irms, 
            email: _email, 
            facebookId: _facebookId, 
            flag: _flag 
          }

          sendConsumo(dataRequest);
        } else {
          console.log('Is not running...');
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
  });
});

app.get('/stop', async (request, response) => {
  _command = null;
  return response.status(200).json({ message: 'Stop is success!' });
});

app.post('/start', async (request, response) => {

  const { command, email, facebookId, tariff, flag } = request.body;
  const  valueLowecase = String(command).toUpperCase();
  
  _email = email;
  _facebookId = facebookId;
  _command = command;
  _tariff = tariff;
  _flag = flag;

  if(flag === undefined)
    return response.status(404).json({ error: `Flag not found` });
  
  if(tariff === undefined)
    return response.status(404).json({ error: `Tariff not found` });
  
  if(facebookId === undefined)
    return response.status(404).json({ error: `FacebookId not found` });
  
  if(email === undefined)
    return response.status(404).json({ error: `E-mail not found` });

  if(valueLowecase !== 'OFF' && valueLowecase !== 'ON')
    return response.status(404).json({ error: `Command not found` });
  
  return response.status(200).json(request.body);
});

async function sendConsumo(data) {
  const db = getDatabase();
  set(ref(db, `/consumption_kwt/${_facebookId}`), 
    { ...data })
    .then(async ()=> await saveHistory(data))
    .catch(error => console.error('error', error));
}

async function saveHistory(data) {
  const docRef = dbFirestore.collection('history_kwh');
  docRef
  .doc(data.email)
  .collection(data.facebookId)
  .add({ ...data })
  .then((res) => console.log('Success', res.id))
  .catch(error => console.error(error))
}

server.listen(3000, '192.168.1.91', () => {
  console.log(`Server run in ${format(new(Date), 'yyyy-MM-dd HH:mm:ss')}`);
});




