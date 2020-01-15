import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-database";
import _ from "lodash";

const config = {
  apiKey: "AIzaSyBXFpz69eQZ_N1SHO37O1e7mMmAlkWIikc",
  authDomain: "brigadaun.firebaseapp.com",
  databaseURL: "https://brigadaun.firebaseio.com",
  projectId: "brigadaun",
  storageBucket: "brigadaun.appspot.com",
  messagingSenderId: "715436806531",
  appId: "1:715436806531:web:f74cf02bc7bf4e628566b6",
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  resetSelected() {
    return this.db.ref("/Users").once("value", snapshot => {
      const fireData = _.toArray(snapshot.val());
      fireData.forEach(child => {
        app
          .database()
          .ref("/Users/" + child.UID)
          .update({
            selected: false,
          });
      });
    });
  }

  notifExpired(data) {
    return data.map(brigade =>
      app
        .database()
        .ref("/Users/" + brigade.UID)
        .update({ notif: false })
    );
  }

  updateRejectedCases(data) {
    return data.map(brigade =>
      app
        .database()
        .ref("/Users/" + brigade.UID)
        .once("value", snapshot => {
          let data1 = snapshot.val().receivedNotif;
          let data2 = snapshot.val().accepted;
          let data3 = snapshot.val().UID;
          let data4 = data1 - data2;
          app
            .database()
            .ref("/Users/" + data3)
            .update({ rejected: data4 });
        })
    );
  }

  updateCaseBranch(data, fillCase) {
    Number.prototype.padLeft = function(base, chr) {
      let len = String(base || 10).length - String(this).length + 1;
      return len > 0 ? new Array(len).join(chr || "0") + this : this;
    };
    let d = new Date(),
      dform =
        [
          (d.getMonth() + 1).padLeft(),
          d.getDate().padLeft(),
          d.getFullYear(),
        ].join("/") +
        " " +
        [
          d.getHours().padLeft(),
          d.getMinutes().padLeft(),
          d.getSeconds().padLeft(),
        ].join(":");
    data.map(brigade =>
      app
        .database()
        .ref("/Casos/" + brigade.UID + brigade.receivedNotif.toString())
        .update({
          lugar: fillCase.lugarEmergencia.label,
          codigo: fillCase.codigo.label,
          categoria: fillCase.categoria.label,
          descripcion: fillCase.descAdicional,
          inicioFecha: dform,
          finalFecha: "",
          tInicial: 0,
          tFinal: 0,
          tTranscurrido: 0,
        })
    );
  }

  pushNotification(dataB) {
    const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
    let data = {
      to: dataB.map(brigada => brigada.Expotoken),
      title: "He",
      body: "---",
      sound: "default",
      ttl: 5, //MODIFICAR DESPUÉS
      data: {
        name: "Mañe",
        ape: "Towers",
      },
      priority: "high",
    };
    fetch(PUSH_ENDPOINT, {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch(err => alert(err));
  }
}

export default new Firebase();
