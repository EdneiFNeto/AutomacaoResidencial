import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAXwrU3rPQPWnMPH_l1rll4q6rS47uEgUg',
  authDomain: 'iot---nodejs.firebaseapp.com',
  databaseURL: 'https://iot---nodejs-default-rtdb.firebaseio.com',
  projectId: 'iot---nodejs',
  storageBucket: 'iot---nodejs.appspot.com',
  messagingSenderId: '777489664581',
  appId: '1:777489664581:web:6215ca2389274117c1b12c',
  measurementId: 'G-G6CH2JGDZF',
};
const app = initializeApp(firebaseConfig);
export default app;
