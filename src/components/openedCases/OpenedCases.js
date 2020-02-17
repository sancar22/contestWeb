import React, { useEffect, useState, useRef } from "react";
import Navigation from "../navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./OpenedCases.css";
import ClipLoader from "react-spinners/ClipLoader";
import SideDrawer from "../sideDrawer/SideDrawer";
import Backdrop from "../backdrop/Backdrop";
import { css } from "@emotion/core";
import Timer from "../timer/Timer";
function OpenedCases(props) {
    const allCases = useSelector(state => state.casos);
    const brigadistas = useSelector(state => state.brigada);
    const counter = useRef(0);
    const [loading, setLoading] = useState(false);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    };

    const override = loading
        ? css`
              display: block;
              margin: 0 auto;
              border-color: red;
              margin-top: 30vh;
          `
        : css`
              display: none;
          `;
    app.auth().onAuthStateChanged(user => {
        // Para llevarlo a login window si no está conectado
        if (!user) {
            props.history.push("/");
        }
    });

    const photoLoader = () => {
        setLoading(true);
        counter.current += 1;
        if (
            counter.current >=
            allCases.filter(data => data.active === true).length * 2
        ) {
            setLoading(false);
        }
    };

    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
            <Navigation sideFunction={drawerToggleClickHandler} />
            {sideDrawerOpen && <Backdrop click={drawerToggleClickHandler} />}
            <SideDrawer
                shown={sideDrawerOpen}
                click={drawerToggleClickHandler}
            />
            <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={loading}
            />
            <div
                style={{
                    overflow: "auto",
                    width: "100%",
                    height: "87%",
                    display: loading ? "none" : "block"
                }}
            >
                <table className="tableClosed">
                    <tr>
                        <th>Brigadista</th>
                        <th>Detalles</th>
                        <th>Descripción</th>
                        <th>Apoyos</th>
                        <th>Otros Brigadistas</th>
                        <th>Proceder</th>
                        <th>Fotos</th>
                        <th>Tiempo</th>
                    </tr>
                    {allCases.length > 0 &&
                        allCases
                            .filter(data => data.active === true)
                            .map((item, index) => {
                                const brigadistasVinculados = brigadistas.brigadeListOnline
                                    .filter(
                                        item2 =>
                                            item2.apoyandoEmail === item.Email
                                    )
                                    .map(item => {
                                        return (
                                            <div
                                                className="texti"
                                                style={{ textAlign: "center" }}
                                            >
                                                {item.nombre +
                                                    " " +
                                                    item.apellido}
                                            </div>
                                        );
                                    });
                                return (
                                    <tr key={index}>
                                        <td>
                                            {item.nombre + " " + item.apellido}
                                        </td>

                                        <td>
                                            <div
                                                style={{
                                                    flexDirection: "column"
                                                }}
                                            >
                                                <div>Lugar: {item.lugar}</div>
                                                <div>Código: {item.codigo}</div>
                                                <div>
                                                    Categoría: {item.categoria}
                                                </div>
                                                <div>
                                                    Comienzo: {item.inicioFecha}
                                                </div>
                                                <div>
                                                    Fin: {item.finalFecha}
                                                </div>
                                                <div>
                                                    Tiempo Total:{" "}
                                                    {item.formatTime}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>{item.descripcion}</div>
                                        </td>
                                        <td>
                                            <div
                                                style={{
                                                    flexDirection: "column",
                                                    display: "flex"
                                                }}
                                            >
                                                {item.bombero && (
                                                    <div>Bombero</div>
                                                )}
                                                {item.ambulancia && (
                                                    <div>Ambulancia</div>
                                                )}
                                                {item.camilla && (
                                                    <div>Camilla</div>
                                                )}
                                                {item.extintor && (
                                                    <div>Extintor</div>
                                                )}
                                                {item.policia && (
                                                    <div>Policía</div>
                                                )}
                                                {item.apoyo && <div>Apoyo</div>}
                                                {item.cruzroja && (
                                                    <div>Cruz Roja</div>
                                                )}
                                                {item.dea && <div>DEA</div>}
                                                {item.defcivil && (
                                                    <div>Defensa Civil</div>
                                                )}
                                                {item.botiquin && (
                                                    <div>Botiquín</div>
                                                )}
                                                {item.centromedico && (
                                                    <div>Centro Médico</div>
                                                )}
                                                {item.mantenimiento && (
                                                    <div>Mantenimiento</div>
                                                )}
                                                {item.sillaRueda && (
                                                    <div>Silla de Ruedas</div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            {brigadistasVinculados.length > 0 &&
                                                brigadistasVinculados}
                                        </td>
                                        <td>{item.descBrigadista}</td>
                                        <td>
                                            <a
                                                href={
                                                    item.image1 !== "image1" &&
                                                    item.image1
                                                }
                                                target="_blank"
                                            >
                                                <img
                                                    onLoad={photoLoader}
                                                    src={
                                                        item.image1 === "image1"
                                                            ? require("../../assets/imageicon.png")
                                                            : item.image1
                                                    }
                                                    height="100"
                                                    width="100"
                                                    style={{ padding: "10px" }}
                                                />
                                            </a>
                                            <a
                                                href={
                                                    item.image2 !== "image2" &&
                                                    item.image2
                                                }
                                                target="_blank"
                                            >
                                                <img
                                                    onLoad={photoLoader}
                                                    src={
                                                        item.image2 === "image2"
                                                            ? require("../../assets/imageicon.png")
                                                            : item.image2
                                                    }
                                                    height="100"
                                                    width="100"
                                                    style={{ padding: "10px" }}
                                                />
                                            </a>
                                        </td>
                                        <td>
                                            <div className="texti">
                                                <Timer date={item.date} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                </table>
            </div>
        </div>
    );
}

export default OpenedCases;
