import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/firebase-database";
import "firebase/storage";
import "firebase/messaging";
import _ from "lodash";
import CustomToast from "../components/custom-toast/index";
import { toast } from "react-toastify";
import React from "react";

const config = {
    apiKey: "AIzaSyBXFpz69eQZ_N1SHO37O1e7mMmAlkWIikc",
    authDomain: "brigadaun.firebaseapp.com",
    databaseURL: "https://brigadaun.firebaseio.com",
    projectId: "brigadaun",
    storageBucket: "brigadaun.appspot.com",
    messagingSenderId: "715436806531",
    appId: "1:715436806531:web:f74cf02bc7bf4e628566b6"
};
// Initialize Firebase

class Firebase {
    constructor() {
        app.initializeApp(config);
        const messaging = app.messaging();
        // messaging.usePublicVapidKey(
        // "BKm0hHsl7j1dwJHcan2I1LJLpwlYgRnlzV1FP1MOxd60Za7myyIGCWEgyfaVWhH_cM5Vh61H0d6kz8LGrlO-tQk"
        // );
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
    }

    getPushToken() {
        app.messaging()
            .getToken()
            .then(currentToken => {
                if (currentToken) {
                    console.log(currentToken);
                    app.database()
                        .ref("/Users/admin@gmail")
                        .update({ pushToken: currentToken });
                } else {
                    console.log("Request permissions to generate a new one");
                }
            })
            .catch(err => {
                console.log("Error receiving token");
            });
    }

    foregroundNotificationList() {
        app.messaging().onMessage(payload => {
            // Mensajes del celular a la web
            const { body } = payload.data;
            const src =
                "https://firebasestorage.googleapis.com/v0/b/brigadaun.appspot.com/o/audios%2Falarm.wav?alt=media&token=a2c80767-bae0-47b8-8dae-3b1a7af590df";
            const image =
                body.search("extintor") !== -1
                    ? require("../assets/extintor.png")
                    : body.search("camilla") !== -1
                    ? require("../assets/camilla.png")
                    : body.search("ambulancia") !== -1
                    ? require("../assets/ambulancia.png")
                    : body.search("bombero") !== -1
                    ? require("../assets/bombero.png")
                    : body.search("apoyo") !== -1
                    ? require("../assets/apoyo.png")
                    : body.search("Defensa") !== -1
                    ? require("../assets/DefensaCivil.png")
                    : body.search("Cruz") !== -1
                    ? require("../assets/CruzRoja.png")
                    : body.search("Médico") !== -1
                    ? require("../assets/CentroMédico.png")
                    : body.search("ruedas") !== -1
                    ? require("../assets/silladeruedas.png")
                    : body.search("DEA") !== -1
                    ? require("../assets/DEA.png")
                    : body.search("botiquín") !== -1
                    ? require("../assets/botiquín.png")
                    : body.search("Mantenimiento") !== -1
                    ? require("../assets/mantenimiento.png")
                    : require("../assets/policia.png");
            toast.warn(
                <CustomToast title={body} image={image} audioSrc={src} />,
                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                }
            );
        });
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
                app.database()
                    .ref("/Users/" + child.Email.split(".")[0])
                    .update({
                        selected: false
                    });
            });
        });
    }

    notifExpired(data) {
        return data.map(brigade =>
            app
                .database()
                .ref("/Users/" + brigade.Email.split(".")[0])
                .update({ notif: false })
        );
    }

    updateRejectedCases(data) {
        return data.map(brigade =>
            app
                .database()
                .ref("/Users/" + brigade.Email.split(".")[0])
                .once("value", snapshot => {
                    let data1 = snapshot.val().receivedNotif;
                    let data2 = snapshot.val().accepted;
                    let data3 = snapshot.val().Email.split(".")[0];
                    let data4 = data1 - data2;
                    let data5 = data2 / data1;

                    let ocupado = snapshot.val().ocupado;
                    if (ocupado) {
                        toast(
                            <CustomToast
                                title={`¡El brigadista ${brigade.nombre +
                                    " " +
                                    brigade.apellido} aceptó el caso!`}
                            />
                        );
                    } else {
                        toast(
                            <CustomToast
                                title={`¡El brigadista ${brigade.nombre +
                                    " " +
                                    brigade.apellido} rechazó el caso!`}
                            />
                        );
                    }

                    app.database()
                        .ref("/Users/" + data3)
                        .update({ rejected: data4, acceptRatio: data5 });
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
                    d.getFullYear()
                ].join("/") +
                " " +
                [
                    d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()
                ].join(":");
        data.map(brigade =>
            app
                .database()
                .ref(
                    "/Casos/" +
                        brigade.Email.split(".")[0] +
                        brigade.receivedNotif.toString()
                )
                .update({
                    lugar: fillCase.lugarEmergencia.label,
                    codigo: fillCase.codigo.label,
                    categoria: fillCase.categoria.label,
                    descripcion: fillCase.descAdicional,
                    inicioFecha: dform,
                    celular: brigade.celular,
                    finalFecha: "",
                    tInicial: 0,
                    tFinal: 0,
                    active: false,
                    extintor: false,
                    apoyo: false,
                    camilla: false,
                    policia: false,
                    bombero: false,
                    ambulancia: false,
                    mantenimiento: false,
                    centromedico: false,
                    botiquin: false,
                    defcivil: false,
                    cruzroja: false,
                    dea: false,
                    sillaRueda: false,
                    ambulanciaCheck: false,
                    policiaCheck: false,
                    bomberoCheck: false,
                    camillaCheck: false,
                    apoyoCheck: false,
                    extintorCheck: false,
                    mantenimientoCheck: false,
                    centromedicoCheck: false,
                    botiquinCheck: false,
                    defcivilCheck: false,
                    cruzrojaCheck: false,
                    deaCheck: false,
                    sillaRuedaCheck: false,
                    formatTime: "",
                    descBrigadista: "",
                    tTranscurrido: 0,
                    closed: true,
                    image1: "image1",
                    image2: "image2",
                    nombre: brigade.nombre,
                    apellido: brigade.apellido,
                    Expotoken: brigade.Expotoken,
                    Email: brigade.Email.split(".")[0],
                    receivedNotif: brigade.receivedNotif
                })
        );
    }
    changeSeenExt(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ extintorCheck: true });
    }
    changeSeenCam(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ camillaCheck: true });
    }
    changeSeenPol(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ policiaCheck: true });
    }
    changeSeenAmb(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ ambulanciaCheck: true });
    }
    changeSeenBom(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ bomberoCheck: true });
    }
    changeSeenApoyo(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ apoyoCheck: true });
    }

    changeSeenDefCiv(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ defcivilCheck: true });
    }

    changeSeenBotiquin(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ botiquinCheck: true });
    }

    changeSeenCentroMed(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ centromedicoCheck: true });
    }

    changeSeenCruzRoja(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ cruzrojaCheck: true });
    }

    changeSeenMant(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ mantenimientoCheck: true });
    }

    changeSeenSillaRueda(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ sillaRuedaCheck: true });
    }

    changeSeenDEA(caso) {
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ deaCheck: true });
    }

    handleRedB(caso) {
        console.log("Executed");
        app.database()
            .ref("Casos/" + caso.Email + caso.receivedNotif.toString())
            .update({ closed: true });
    }

    updateExpired(dataB) {
        dataB.forEach(info => {
            app.database()
                .ref("Users/" + info.Email.split(".")[0])
                .update({ expired: true });
        });
    }

    updatePreExpired(dataB) {
        dataB.forEach(info => {
            app.database()
                .ref("Users/" + info.Email.split(".")[0])
                .update({ expired: false });
        });
    }

    miniPushNotification(expoToken, objeto) {
        const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
        let data = {
            to: expoToken,
            title: `¡${objeto} en camino!`,
            body: `Ya el de la central pidió el objeto: ${objeto}`,
            sound: "default",
            data: {
                name: `¡${objeto} en camino!`,
                ape: `Ya el de la central pidió el objeto: ${objeto}`,
                id: "1"
            },
            priority: "high"
        };
        fetch(PUSH_ENDPOINT, {
            mode: "no-cors",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            toast(
                <CustomToast
                    title={`¡Ya el brigadista sabe que su ${objeto} va en camino!`}
                />
            );
        });
    }
    pushNotification(dataB, fillCase) {
        const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";
        console.log(fillCase);
        let data = {
            to: dataB.map(brigada => brigada.Expotoken),
            title: `Código ${fillCase.codigo.label}, Categoría: ${fillCase.categoria.label}`,
            body: `¡Diríjase de inmediato al ${fillCase.lugarEmergencia.label}!`,
            sound: "default",
            ttl: 5, //MODIFICAR DESPUÉS
            data: {
                name: "---",
                ape: "---"
            },
            priority: "high"
        };
        let checker = false;
        this.updatePreExpired(dataB);
        let timeToReach = setTimeout(() => {
            checker = true;
            this.updateExpired(dataB);
            toast(
                <CustomToast
                    title={`¡La notificación del brigadista ${dataB[0].nombre +
                        " " +
                        dataB[0].apellido}  expiró! ¡Caso no creado!`}
                />
            );
        }, 40000);
        fetch(PUSH_ENDPOINT, {
            mode: "no-cors",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                if (!checker) {
                    clearTimeout(timeToReach);
                    this.updateCaseBranch(dataB, fillCase);
                    toast(
                        <CustomToast
                            title={`¡La notificación llegó al celular de ${dataB[0]
                                .nombre +
                                " " +
                                dataB[0].apellido}! ¡Caso creado!`}
                        />
                    );
                    setTimeout(() => {
                        this.updateRejectedCases(dataB);
                        this.notifExpired(dataB);
                    }, 10000);
                } else {
                    this.notifExpired(dataB);
                    console.log("Notificación expiró");
                }
            })
            .catch(err =>
                toast(
                    <CustomToast
                        title={`¡No se pudo enviar la notificación de ${dataB[0]
                            .nombre +
                            " " +
                            dataB[0].apellido}!`}
                    />
                )
            );
    }

    fillDB(firstN, lastN, lastN2, email, celular) {
        app.database()
            .ref("Users/" + email.split(".")[0])
            .update({
                nombre: firstN,
                apellido: lastN,
                segundoApellido: lastN2,
                Email: email,
                receivedNotif: 0,
                accepted: 0,
                rejected: 0,
                online: false,
                Latitud: 11.017866,
                selected: false,
                notif: false,
                ocupado: false,
                expired: false,
                celular: celular,
                Longitud: -74.851163,
                acceptRatio: 0
            });
    }
    uploadImage(image, email) {
        const uploadTask = app
            .storage()
            .ref(`images/${image.name}`)
            .put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progrss function ....
            },
            error => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                app.storage()
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        app.database()
                            .ref("Users/" + email.split(".")[0])
                            .update({
                                imagen: url
                            });
                    });
            }
        );
    }

    resetPassword(email) {
        return app.auth().sendPasswordResetEmail(email);
    }
}

export default new Firebase();
