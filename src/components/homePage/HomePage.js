import React, { useState, useEffect } from "react";
import { selectMarker } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "firebase/messaging";
import Navigation from "../navigation/Navigation";
import SideDrawer from "../sideDrawer/SideDrawer";
import Backdrop from "../backdrop/Backdrop";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./HomePage.css";
import L from "leaflet";
import CaseForm from "../caseForm/CaseForm";
import firebase from "../../routes/Config";
import { messaging } from "../../init-fcm";

function HomePage(props) {
    const brigadistas = useSelector(state => state.brigada);
    const dispatch = useDispatch();
    const [windowWidth, setWindowWidth] = useState(null); //responsiveness
    const [windowHeight, setWindowHeight] = useState(null);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    };
    const permissionRequest = () => {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                firebase.getPushToken();
            } else {
                console.log("Unable to get permission to notify.");
            }
        });
    };

    const refreshListener = () => {
        app.messaging().onTokenRefresh(() => {
            firebase.getPushToken();
        });
    };

    useEffect(() => {
        dispatch(selectMarker(brigadistas.brigadeListOnline));
    }, [brigadistas.brigadeListOnline]);

    useEffect(() => {
        // Responsiveness

        window.addEventListener("resize", () => {
            setWindowWidth(document.body.clientWidth);
        });
        window.addEventListener("resize", () => {
            setWindowHeight(window.innerHeight);
        });

        if (app.auth().currentUser) {
            if (app.auth().currentUser.email === "admin@gmail.com") {
                permissionRequest();
                refreshListener();
                firebase.foregroundNotificationList();
            }
        }

        return () => {
            window.removeEventListener("resize", () => {
                setWindowWidth(document.body.clientWidth);
            });
            window.removeEventListener("resize", () => {
                setWindowHeight(window.innerHeight);
            });
        };
    }, []);

    app.auth().onAuthStateChanged(user => {
        // Para llevarlo a login window si no está conectado
        if (!user) {
            props.history.push("/");
        }
    });

    function onMarkerClickHandler(brigadista) {
        if (!brigadista.ocupado && !brigadista.helpOcupado) {
            app.database()
                .ref("/Users/" + brigadista.Email.split(".")[0])
                .update({
                    selected: !brigadista.selected
                });
        }
    }

    const messageIcon = brigad => {
        // Crea íconos

        if (brigad.ocupado === true) {
            return L.icon({
                iconUrl: "ocupado.jpg", // Decide colocar ícono dependiendo de estado
                iconSize: [30, 30]
            });
        } else if (brigad.helpOcupado === true) {
            return L.icon({
                iconUrl: "apoyando.png", // Decide colocar ícono dependiendo de estado
                iconSize: [30, 30]
            });
        } else {
            return L.icon({
                iconUrl: brigad.selected ? "icon1.png" : "icon2.png", // Decide colocar ícono dependiendo de estado
                iconSize: brigad.selected ? [30, 30] : [50, 50]
            });
        }
    };

    let Markers = brigadistas.brigadeListOnline.map((
        brigadista // Marcadores
    ) => (
        <Marker
            key={brigadista.UID}
            position={[brigadista.Latitud, brigadista.Longitud]}
            icon={messageIcon(brigadista)}
            onclick={() => onMarkerClickHandler(brigadista)}
            onMouseOver={e => {
                e.target.openPopup();
            }}
            onMouseOut={e => {
                e.target.closePopup();
            }}
        >
            <Popup>
                <div className="popupContainer">
                    <img src={brigadista.imagen} height="50" width="50" />
                    <br />
                    <div>{brigadista.nombre + " " + brigadista.apellido}</div>
                    <br />
                    <div>Casos Aceptados: {brigadista.accepted}</div>
                    <br />
                    <div>Casos Rechazados: {brigadista.rejected}</div>
                    <br />
                    <div>Casos Recibidos: {brigadista.receivedNotif}</div>
                </div>
            </Popup>
        </Marker>
    ));

    return (
        <div
            className="bodyTotal"
            style={{ width: windowWidth, height: windowHeight }}
        >
            <Navigation sideFunction={drawerToggleClickHandler} />
            {sideDrawerOpen && <Backdrop click={drawerToggleClickHandler} />}
            <SideDrawer
                shown={sideDrawerOpen}
                click={drawerToggleClickHandler}
            />
            <div className="dive">
                <CaseForm />
                <Map className="map" center={[11.018946, -74.850515]} zoom={18}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {Markers}
                </Map>
            </div>
        </div>
    );
}

export default withRouter(HomePage);
