import Vue from 'vue';
import './plugins/bootstrap-vue';
import firebase from 'firebase/app';
import App from './App.vue';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: 'AIzaSyCxp1W7_Lg72vLEb6StRtiAcuuOQkJtJmc',
  authDomain: 'rentalsite-66642.firebaseapp.com',
  projectId: 'rentalsite-66642',
  storageBucket: 'rentalsite-66642.appspot.com',
  messagingSenderId: '200696095308',
  appId: '1:200696095308:web:34825fe8b572c75b664ae9',
};

firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
