import React, { useEffect, useRef, useState } from "react";
import Navigation from "../navigation/Navigation";
import app from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import "./SignUp.css";
import FormInput from "../form/Form";
import firebase from "../../routes/Config";
import FormInputE from "../form/FormE";
import { toast } from "react-toastify";
import SideDrawer from "../sideDrawer/SideDrawer";
import Backdrop from "../backdrop/Backdrop";

import CustomToast from "../custom-toast";

function SignUp(props) {
    const [fileB, setFileB] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [secondLast, setSecondLast] = useState("");
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [fileFB, setFileFB] = useState(null);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    };

    const [windowWidth, setWindowWidth] = useState(null);
    const [windowHeight, setWindowHeight] = useState(null);

    app.auth().onAuthStateChanged(user => {
        if (!user) {
            props.history.push("/");
        }
    });

    useEffect(() => {
        // Responsiveness
        window.addEventListener("resize", () => {
            setWindowWidth(document.body.clientWidth);
        });
        window.addEventListener("resize", () => {
            setWindowHeight(window.innerHeight);
        });
        return () => {
            window.removeEventListener("resize", () => {
                setWindowWidth(document.body.clientWidth);
            });
            window.removeEventListener("resize", () => {
                setWindowHeight(window.innerHeight);
            });
        };
    }, []);

    // For image processing
    const readFile = event => {
        setFileB(URL.createObjectURL(event.target.files[0]));
        setFileFB(event.target.files[0]);
    };
    const cellPhonePut = evt => {
        console.log(evt.target.value);
        if (cellPhone.length < 10) {
            setCellPhone(evt.target.value);
        }
        if (cellPhone.length == 10) {
            evt.target.value.length < 10 && setCellPhone(evt.target.value);
        }
    };

    const handleClick = () => {
        upload.current.click();
    };

    const upload = useRef();
    //

    const register = evt => {
        evt.preventDefault();

        try {
            if (email.length < 6) {
                toast(
                    <CustomToast title="Correo debe tener por lo menos 6 caracteres" />
                );
                return;
            } else if (password !== confPass) {
                toast(<CustomToast title="Contraseñas no coinciden" />);
                return;
            } else if (fileB === null) {
                toast(<CustomToast title="Insertar Imagen" />);
                return;
            } else if (cellPhone.length != 10) {
                toast(
                    <CustomToast title="Digite un número de celular válido" />
                );
                return;
            }

            app.auth()
                .createUserWithEmailAndPassword(email.trim(), password)
                .then(() => {
                    firebase.fillDB(
                        firstName,
                        lastName,
                        secondLast,
                        email,
                        cellPhone
                    );
                    firebase.uploadImage(fileFB, email);
                    firebase.resetPassword(email);
                    setFileB(null);
                    setFirstName("");
                    setLastName("");
                    setSecondLast("");
                    setEmail("");
                    setPassword("");
                    setConfPass("");
                    setCellPhone("");
                    toast(<CustomToast title="¡Registro exitoso!" />);
                })
                .catch(error =>
                    toast(
                        <CustomToast title="No es un correo válido o ya está registrado" />
                    )
                );
        } catch (error) {
            console.log(error.toString());
        }
    };

    return (
        <div
            style={{
                width: windowWidth,
                height: windowHeight,
                overflow: "hidden"
            }}
        >
            <Navigation sideFunction={drawerToggleClickHandler} />
            {sideDrawerOpen && <Backdrop click={drawerToggleClickHandler} />}
            <SideDrawer
                shown={sideDrawerOpen}
                click={drawerToggleClickHandler}
            />

            <form className="formDiv" onSubmit={register}>
                <div className="divRow">
                    <img
                        className="image"
                        src={fileB !== null ? fileB : "image.jpg"}
                        alt="profile_default"
                        onClick={handleClick}
                    />
                </div>
                <input
                    id="upload"
                    ref={upload}
                    type="file"
                    accept="image/*"
                    onInput={readFile}
                    onClick={event => {
                        event.target.value = null;
                    }}
                    style={{ display: "none" }}
                />
                <div className="twoContainer" style={{ paddingBottom: 0 }}>
                    <div className="inputCol">
                        <div className="textDiv">Celular:</div>
                        <FormInput
                            name="Cell Phone"
                            type="text"
                            placeholder="Celular"
                            className="inputSignUp"
                            value={cellPhone}
                            required
                            onChange={evt => cellPhonePut(evt)}
                        />
                    </div>
                </div>

                <div className="twoContainer">
                    <div className="inputCol">
                        <div className="textDiv">Primer Nombre:</div>
                        <FormInput
                            name="First Name"
                            type="text"
                            placeholder="Primer Nombre"
                            className="inputSignUp"
                            value={firstName}
                            required
                            onChange={evt => setFirstName(evt.target.value)}
                        />
                    </div>

                    <div className="inputCol">
                        <div className="textDiv">Primer Apellido:</div>
                        <FormInput
                            name="Last Name"
                            type="text"
                            placeholder="Primer Apellido"
                            className="inputSignUp"
                            value={lastName}
                            required
                            onChange={evt => setLastName(evt.target.value)}
                        />
                    </div>
                </div>

                <div className="twoContainer">
                    <div className="inputCol">
                        <div className="textDiv">Segundo Apellido:</div>
                        <FormInput
                            name="Second Last"
                            type="text"
                            placeholder="Segundo Apellido"
                            className="inputSignUp"
                            value={secondLast}
                            required
                            onChange={evt => setSecondLast(evt.target.value)}
                        />
                    </div>

                    <div className="inputCol">
                        <div className="textDiv">Correo Electrónico:</div>
                        <FormInputE
                            name="Email"
                            type="text"
                            placeholder="Correo Electrónico"
                            className="inputSignUp"
                            value={email}
                            required
                            onChange={evt => setEmail(evt.target.value)}
                        />
                    </div>
                </div>

                <div className="twoContainer">
                    <div className="inputCol">
                        <div className="textDiv">Contraseña:</div>
                        <FormInput
                            name="Pass"
                            type="password"
                            placeholder="******"
                            className="inputSignUp"
                            value={password}
                            required
                            onChange={evt => setPassword(evt.target.value)}
                        />
                    </div>

                    <div className="inputCol">
                        <div className="textDiv">Confirmar Contraseña:</div>
                        <FormInput
                            name="PassConf"
                            type="password"
                            placeholder="*******"
                            className="inputSignUp"
                            value={confPass}
                            required
                            onChange={evt => setConfPass(evt.target.value)}
                        />
                    </div>
                </div>
                <FormInput
                    name=""
                    type="submit"
                    className="buttonSignUp"
                    value="Registrarse"
                    onClick={register}
                />
            </form>
        </div>
    );
}

export default withRouter(SignUp);
