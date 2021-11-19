import express from 'express';
import  http from 'http';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import { format } from 'date-fns'
import axios from 'axios';
import dotenv from 'dotenv';
import SerialPort from 'serialport';
import admin from 'firebase-admin';
import { createRequire } from "module"; 
import {Server} from 'socket.io';

dotenv.config();

const api = axios.create({
  baseURL: 'https://fcm.googleapis.com/fcm',
  headers: { 
    'Content-Type':'application/json', 
    'project_id': `${process.env.PROJECT_ID}`, 
    'Authorization': `key=${process.env.AUTHORIZATION_TOKEN}` 
  }
});

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "iot-app-12a83.firebaseapp.com",
  databaseURL: "https://iot-app-12a83-default-rtdb.firebaseio.com",
  projectId: "iot-app-12a83",
  storageBucket: "iot-app-12a83.appspot.com",
  messagingSenderId: `${process.env.MESSAGIN_SENDER_ID}`,
  appId: `${process.env.APP_ID}`,
  measurementId: "G-9NBPZD7GN1"
};

initializeApp(firebaseConfig);

const require = createRequire(import.meta.url);
const serviceAccount = require("./service/serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-app-12a83-default-rtdb.firebaseio.com"
});

const dbFirestore = admin.firestore();

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

const ReadLine = SerialPort.parsers.Readline;

const mySerial = new SerialPort("COM19", { 
  baudRate: 9600,
});

let _command = undefined;
let _email = undefined;
let _facebookId = undefined;
let _tariff = undefined;
let _flag = undefined;
let _userToken = undefined;
let total = 0.0;
let _dataChart = [];
let _totalMonth = 0.0;

const currenteDate = format(new Date(), 'yyyy-MM-dd');

const parser = new ReadLine({ delimiter: '\r\n' });
mySerial.pipe(parser);

mySerial.on("open", () => {
  parser.on('data', (data) => {
    if(_command !== undefined){
      const  valueLowecase = String(_command).toUpperCase();
      try {
        if(valueLowecase === 'ON' && _email !== undefined 
          && _facebookId !== undefined && _tariff !== undefined 
          && _flag !== undefined && _userToken !== undefined)
        {
          
          const parser = JSON.parse(data);
          const { irms, potency, voltage } = parser;
          const value   = _tariff / 10800;
          const kwh     = irms / 1000; 
          const result  = kwh * value; 
          total += result;

          const dataRequest = { 
            date_time: currenteDate, 
            voltage,  
            potency, 
            tariff: _tariff, 
            chain: irms, 
            email: _email, 
            facebookId: _facebookId, 
            flag: _flag,
            kwh, 
            total: formatterValue(total),
            created_at:  format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          }

          sendConsumo(dataRequest);

          if(kwh > 10 && _userToken !== undefined) {
            sendNotification(getNotification({ kwh, tariff: _tariff }));
          }
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
  });
});

app.get('/stop', async (request, response) => {
  _command = undefined;
  return response.status(200).json({ message: 'Stop is success!' });
});

app.post('/start', async (request, response) => {

  const { command, email, facebookId, tariff, flag, userToken } = request.body;
  const  valueLowecase = String(command).toUpperCase();
  
  _email = email;
  _facebookId = facebookId;
  _command = command;
  _tariff = tariff;
  _flag = flag;
  _userToken = userToken;

  if(userToken === undefined)
    return response.status(400).json({ error: `Token user not found` });
  
  if(flag === undefined)
    return response.status(400).json({ error: `Flag not found` });
  
  if(tariff === undefined)
    return response.status(400).json({ error: `Tariff not found` });
  
  if(facebookId === undefined)
    return response.status(400).json({ error: `FacebookId not found` });
  
  if(email === undefined)
    return response.status(400).json({ error: `E-mail not found` });

  if(valueLowecase !== 'OFF' && valueLowecase !== 'ON')
    return response.status(400).json({ error: `Command not found` });

  const getconcumption = await getConsumptionData()
  if(getconcumption.exists()){
    _totalMonth = getconcumption.val().date_time === currenteDate ? getconcumption.val().total : total;
  }

  return response.status(200).json(request.body);
});

app.get('/get-data', async (request, response) => {
  if(_dataChart.length === 0)
    return response.status(400).json({error: 'Empty data chart!'});
  return response.status(200).json(_dataChart);  
});

app.use(express.static('./public'));
app.get('/', function(req, res) {
  res.render('index.html');
});

function formatterValue(value){
  return Number(Number(value).toFixed(7))
}

function getNotification({ kwh, tariff }) {
  return {
    to: `${_userToken}`,
    notification: {
      title: "Iot - Consumo de energia",
      body: `Consumo atual ${formatValue(kwh)}kwh\n com valor R$ ${formatValue(tariff)}`,
      mutable_content: true,
      sound: "Tri-tone"
    },
    data: {
      "name": "Consumo energia",
      "type": "Atualizando consumo"
    },
  }
}

function formatValue(value){
  return  String(Number(value).toFixed(2)).replace(".", ",")
}

function sendNotification(notificationRequest){
    const { to, notification, data } = notificationRequest; 
    api.post('/send', { to, notification, data })
      .then((resuslt)=> console.log('send notification', resuslt.data))
      .catch(error => console.log('Error notification', error))
}

async function sendConsumo(data) {
  const db = getDatabase();
  set(ref(db, `/consumption_kwt/${_facebookId}`), 
  {...data, totalMonth: _totalMonth + data.total})
  .then(async ()=> await saveHistory(data))
  .catch(error => console.error('error', error));
}

async function getConsumptionData(){
  const dbRef  = ref(getDatabase());
  return get(child(dbRef , `consumption_kwt/${_facebookId}`));
}

async function saveHistory(data) {
  const docRef = dbFirestore.collection('history_kwh');
  docRef
  .doc(data.email)
  .collection(data.facebookId)
  .add({ ...data, totalMonth: _totalMonth })
  .then(res => {
    console.log('success', res.id);
    io.emit("getDataChart", {
      value: data
    });
  })
  .catch(error => console.error(error))
}

server.listen(3000, process.env.IP, () => {
  console.log(`Server run in ${format(new(Date), 'yyyy-MM-dd HH:mm:ss')}`);
});

io.on('connection', (socket) => {
  console.log('Socket connected');
});





