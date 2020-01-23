import React from "react";
import "./CaseForm.css";

function ActiveCaseBlock({
    handleButtonClickCam,
    handleButtonClickExt,
    caso,
    ...props
}) {
    return (
        <div className="activeCaseLoop">
            <div style={{ textAlign: "center" }} className="texti">
                {caso.inicioFecha}
            </div>
            <br />
            <div className="texti">
                Nombre: {caso.nombre + " " + caso.apellido}
            </div>
            <div className="texti">Lugar: {caso.lugar}</div>

            <div className="texti">Código: {caso.codigo}</div>
            <div className="texti">Categoría: {caso.categoria}</div>

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
                            <button
                                id="camilla"
                                onClick={() => handleButtonClickCam(caso)}
                                disabled={caso.camillaCheck && true}
                                style={{
                                    backgroundColor:
                                        caso.camillaCheck && "green",
                                }}
                                className="buttonObj"
                            >
                                {caso.camillaCheck ? (
                                    <strike className="texti">Camilla</strike>
                                ) : (
                                    <div className="texti">Camilla</div>
                                )}
                            </button>
                        )}
                        {caso.extintor && (
                            <button
                                id="extintor"
                                onClick={() => handleButtonClickExt(caso)}
                                disabled={caso.extintorCheck && true}
                                style={{
                                    backgroundColor:
                                        caso.extintorCheck && "green",
                                }}
                                className="buttonObj"
                            >
                                {caso.extintorCheck ? (
                                    <strike className="texti">Extintor</strike>
                                ) : (
                                    <div className="texti">Extintor</div>
                                )}
                            </button>
                        )}
                        {caso.apoyo && (
                            <button className="buttonObj">Apoyo</button>
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
                </div>
            </div>
        </div>
    );
}

export default ActiveCaseBlock;
