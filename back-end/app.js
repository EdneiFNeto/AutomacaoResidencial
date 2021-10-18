import express from 'express';
import  http from 'http';
import { getDatabase, ref, set, child, get, push } from "firebase/database";
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

const mySerial = new SerialPort("COM29", { 
  baudRate: 9600,
});

let myValue;
let email = null;
let facebookId = null;

const parser = new ReadLine({ delimiter: '\r\n' });
mySerial.pipe(parser);

mySerial.on("open", () => {
  parser.on('data', (data) => {
    if(myValue !== undefined){
      const  valueLowecase = String(myValue).toUpperCase();
      try {
        if(valueLowecase === 'ON' && email !== null && facebookId !== null){
          const random = Math.floor((Math.random() * 10) + 1);
          const tarifa = random * 0.01;
          const dataRequest = { data, date_time: format(new Date(), 'dd/MM/yyyy HH:mm:ss'), kwh: random * 100, value: tarifa, email, facebookId }
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
  myValue = undefined;
  return response.status(200).json({ message: 'success', myValue: `myValue ${myValue}` });
});

app.post('/start', async (request, response) => {

  const { command, emailRequest, facebookIdRequest } = request.body;
  const  valueLowecase = String(command).toUpperCase();
  
  email = emailRequest;
  facebookId = facebookIdRequest;
  myValue = command;
  
  if(facebookIdRequest === undefined)
    return response.status(404).json({ error: `FacebookId not found` });
  
  if(emailRequest === undefined)
    return response.status(404).json({ error: `E-mail not found` });

  if(valueLowecase !== 'OFF' && valueLowecase !== 'ON')
    return response.status(404).json({ error: `Command not found` });
  
  return response.status(200).json(request.body);
});

async function sendConsumo(data) {
  const db = getDatabase();
  set(ref(db, `/consumption_kwt/${facebookId}`), 
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

server.listen(3000, () => {
  console.log(`Server run in ${format(new(Date), 'yyyy-MM-dd HH:mm:ss')}`);
});




