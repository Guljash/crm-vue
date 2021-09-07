import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min.js";
import messagePlugin from "@/utils/message.plugin";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Loader from '@/components/app/Loader.vue';

const firebaseConfig = {
  apiKey: "AIzaSyAQOfBFQyOYkTVJu9PSc7vEiv3eLOX8V2U",
  authDomain: "crm-test-44aac.firebaseapp.com",
  projectId: "crm-test-44aac",
  storageBucket: "crm-test-44aac.appspot.com",
  messagingSenderId: "662504440095",
  appId: "1:662504440095:web:a0aaeec9a8f5bf0b3d302a",
  measurementId: "G-WLBLLCKVRJ",
  databaseURL:
    "https://crm-test-44aac-default-rtdb.europe-west1.firebasedatabase.app/",
};

let app

firebase.default.initializeApp(firebaseConfig);

firebase.default.auth().onAuthStateChanged(() => {
  if (!app) {
    createApp(App).use(store).use(router).use(messagePlugin).component('Loader', Loader).mount("#app");
  }
})
