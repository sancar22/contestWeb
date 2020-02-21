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
    brigadistas,
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

    const brigadistasVinculados = brigadistas.brigadeListOnline
        .filter(item => item.apoyandoEmail === caso.Email)
        .map(item => {
            return (
                <div className="texti" style={{ textAlign: "center" }}>
                    {item.nombre + " " + item.apellido}
                </div>
            );
        });

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
                Name: {caso.nombre + " " + caso.apellido}
            </div>
            <div className="texti">Cellphone: {caso.celular}</div>
            <div className="texti">Place: {caso.lugar}</div>

            <div className="texti">Code: {caso.codigo}</div>
            <div className="texti">Category: {caso.categoria}</div>
            <div className="texti">Active Time: {toHHMMSS(timer)}</div>

            <br />
            <div className="requests">
                <div style={{ textAlign: "center" }} className="texti">
                    Requested Help
                </div>
                <div className="requestsContainer">
                    <div className="objects">
                        <div
                            className="texti"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            Objects
                        </div>
                        {caso.camilla && (
                            <HelpListItems
                                fction={handleButtonClickCam}
                                casoObj={caso.camillaCheck}
                                objeto="Stretcher"
                                caso={caso}
                            />
                        )}

                        {caso.apoyo && (
                            <HelpListItems
                                fction={handleButtonClickApoyo}
                                casoObj={caso.apoyoCheck}
                                objeto={` Help (${caso.apoyoReq})`}
                                caso={caso}
                            />
                        )}
                        {caso.ambulancia && (
                            <HelpListItems
                                fction={handleButtonClickAmb}
                                casoObj={caso.ambulanciaCheck}
                                objeto="Ambulance"
                                caso={caso}
                            />
                        )}
                        {caso.extintor && (
                            <HelpListItems
                                fction={handleButtonClickExt}
                                casoObj={caso.extintorCheck}
                                objeto="Extinguisher"
                                caso={caso}
                            />
                        )}
                        {caso.sillaRueda && (
                            <HelpListItems
                                fction={handleButtonClickSillaRueda}
                                casoObj={caso.sillaRuedaCheck}
                                objeto="Wheelchair"
                                caso={caso}
                            />
                        )}
                        {caso.dea && (
                            <HelpListItems
                                fction={handleButtonClickDEA}
                                casoObj={caso.deaCheck}
                                objeto="AED"
                                caso={caso}
                            />
                        )}

                        {caso.botiquin && (
                            <HelpListItems
                                fction={handleButtonClickBotiquin}
                                casoObj={caso.botiquinCheck}
                                objeto="Med Kit"
                                caso={caso}
                            />
                        )}
                    </div>

                    <div className="listApoyo">
                        <div
                            className="texti"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            Assistance
                        </div>
                        {caso.policia && (
                            <HelpListItems
                                fction={handleButtonClickPol}
                                casoObj={caso.policiaCheck}
                                objeto="Police"
                                caso={caso}
                            />
                        )}
                        {caso.bombero && (
                            <HelpListItems
                                fction={handleButtonClickBom}
                                casoObj={caso.bomberoCheck}
                                objeto="Firemen"
                                caso={caso}
                            />
                        )}

                        {caso.defcivil && (
                            <HelpListItems
                                fction={handleButtonClickDefCivil}
                                casoObj={caso.defcivilCheck}
                                objeto="Civil Defense"
                                caso={caso}
                            />
                        )}
                        {caso.cruzroja && (
                            <HelpListItems
                                fction={handleButtonClickCruzRoja}
                                casoObj={caso.cruzrojaCheck}
                                objeto="Red Cross"
                                caso={caso}
                            />
                        )}
                        {caso.mantenimiento && (
                            <HelpListItems
                                fction={handleButtonClickMant}
                                casoObj={caso.mantenimientoCheck}
                                objeto="Maintenance"
                                caso={caso}
                            />
                        )}

                        {caso.centromedico && (
                            <HelpListItems
                                fction={handleButtonClickCentroMed}
                                casoObj={caso.centromedicoCheck}
                                objeto="Medical Center"
                                caso={caso}
                            />
                        )}
                    </div>
                </div>

                <div style={{ textAlign: "center" }} className="texti">
                    Brigaders Helping
                </div>
                {caso.active === true
                    ? brigadistasVinculados.length > 0 && brigadistasVinculados
                    : caso.helpArray &&
                      caso.helpArray.map(item => (
                          <div lassName="texti" style={{ textAlign: "center" }}>
                              {item.nombre + " " + item.apellido}
                          </div>
                      ))}
            </div>
        </div>
    );
}

export default ActiveCaseBlock;
