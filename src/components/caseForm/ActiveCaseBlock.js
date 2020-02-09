import React, { useEffect, useState } from "react";
import "./CaseForm.css";
import HelpListItems from "./HelpListItems.js";

function ActiveCaseBlock({
    handleButtonClickCam,
    handleButtonClickExt,
    handleButtonClickPol,
    handleButtonClickAmb,
    handleButtonClickApoyo,
    handleButtonClickBom,
    handleButtonClickDefCivil,
    handleButtonClickBotiquin,
    handleButtonClickCentroMed,
    handleButtonClickCruzRoja,
    handleButtonClickMant,
    handleButtonClickSillaRueda,
    handleButtonClickDEA,
    handleRedButton,
    caso,
    ...props
}) {
    const [timer, setTimer] = useState(0);
    let toHHMMSS = secs => {
        let sec_num = parseInt(secs, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor(sec_num / 60) % 60;
        let seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map(v => (v < 10 ? "0" + v : v))
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    };

    useEffect(() => {
        let b = caso.date;

        const timer = setInterval(() => {
            if (!caso.active) {
                clearInterval(timer);
                setTimer(Math.round((caso.calcFin - b) / 1000)); // it stays static when case is closed
            } else {
                let a = new Date();

                setTimer(Math.round((a - b) / 1000));
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [caso.active]);
    return (
        <div className="activeCaseLoop">
            <a
                onClick={() => handleRedButton(caso)}
                className="close-icon"
                style={{ display: caso.active && "none" }}
            ></a>
            <div style={{ textAlign: "center" }} className="texti">
                {caso.inicioFecha}
            </div>
            <br />
            <div className="texti">
                Nombre: {caso.nombre + " " + caso.apellido}
            </div>
            <div className="texti">Celular: {caso.celular}</div>
            <div className="texti">Lugar: {caso.lugar}</div>

            <div className="texti">Código: {caso.codigo}</div>
            <div className="texti">Categoría: {caso.categoria}</div>
            <div className="texti">Tiempo activo: {toHHMMSS(timer)}</div>

            <br />
            <div className="requests">
                <div style={{ textAlign: "center" }} className="texti">
                    Apoyos solicitados
                </div>
                <div className="requestsContainer">
                    <div className="objects">
                        <div
                            className="texti"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            Objetos
                        </div>
                        {caso.camilla && (
                            <HelpListItems
                                fction={handleButtonClickCam}
                                casoObj={caso.camillaCheck}
                                objeto="Camilla"
                                caso={caso}
                            />
                        )}

                        {caso.apoyo && (
                            <HelpListItems
                                fction={handleButtonClickApoyo}
                                casoObj={caso.apoyoCheck}
                                objeto="Apoyo"
                                caso={caso}
                            />
                        )}
                        {caso.ambulancia && (
                            <HelpListItems
                                fction={handleButtonClickAmb}
                                casoObj={caso.ambulanciaCheck}
                                objeto="Ambulancia"
                                caso={caso}
                            />
                        )}
                        {caso.extintor && (
                            <HelpListItems
                                fction={handleButtonClickExt}
                                casoObj={caso.extintorCheck}
                                objeto="Extintor"
                                caso={caso}
                            />
                        )}
                        {caso.sillaRueda && (
                            <HelpListItems
                                fction={handleButtonClickSillaRueda}
                                casoObj={caso.sillaRuedaCheck}
                                objeto="Silla de ruedas"
                                caso={caso}
                            />
                        )}
                        {caso.dea && (
                            <HelpListItems
                                fction={handleButtonClickDEA}
                                casoObj={caso.deaCheck}
                                objeto="DEA"
                                caso={caso}
                            />
                        )}

                        {caso.botiquin && (
                            <HelpListItems
                                fction={handleButtonClickBotiquin}
                                casoObj={caso.botiquinCheck}
                                objeto="Botiquín"
                                caso={caso}
                            />
                        )}
                    </div>
                    <div className="listApoyo">
                        <div
                            className="texti"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            Brigadistas
                        </div>
                    </div>
                    <div className="listApoyo">
                        <div
                            className="texti"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            Apoyos
                        </div>
                        {caso.policia && (
                            <HelpListItems
                                fction={handleButtonClickPol}
                                casoObj={caso.policiaCheck}
                                objeto="Policía"
                                caso={caso}
                            />
                        )}
                        {caso.bombero && (
                            <HelpListItems
                                fction={handleButtonClickBom}
                                casoObj={caso.bomberoCheck}
                                objeto="Bombero"
                                caso={caso}
                            />
                        )}

                        {caso.defcivil && (
                            <HelpListItems
                                fction={handleButtonClickDefCivil}
                                casoObj={caso.defcivilCheck}
                                objeto="Defensa Civil"
                                caso={caso}
                            />
                        )}
                        {caso.cruzroja && (
                            <HelpListItems
                                fction={handleButtonClickCruzRoja}
                                casoObj={caso.cruzrojaCheck}
                                objeto="Cruz Roja"
                                caso={caso}
                            />
                        )}
                        {caso.mantenimiento && (
                            <HelpListItems
                                fction={handleButtonClickMant}
                                casoObj={caso.mantenimientoCheck}
                                objeto="Mantenimiento"
                                caso={caso}
                            />
                        )}

                        {caso.centromedico && (
                            <HelpListItems
                                fction={handleButtonClickCentroMed}
                                casoObj={caso.centromedicoCheck}
                                objeto="Centro Médico"
                                caso={caso}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveCaseBlock;
