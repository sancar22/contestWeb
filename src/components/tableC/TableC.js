import React from "react";

function TableC({ index, item, photoLoader, length, ...props }) {
    return (
        <tr key={index}>
            <td>{item.nombre + " " + item.apellido}</td>

            <td>
                <div
                    style={{
                        flexDirection: "column"
                    }}
                >
                    <div>Place: {item.lugar}</div>
                    <div>Code: {item.codigo}</div>
                    <div>Category: {item.categoria}</div>
                    <div>Start: {item.inicioFecha}</div>
                    <div>End: {item.finalFecha}</div>
                    <div>Total Time: {item.formatTime}</div>
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
                    {item.bombero && <div>Firefighters</div>}
                    {item.ambulancia && <div>Ambulance</div>}
                    {item.camilla && <div>Stretcher</div>}
                    {item.extintor && <div>Extinguisher</div>}
                    {item.policia && <div>Police</div>}
                    {item.apoyo && <div>Help</div>}
                    {item.cruzroja && <div>Red Cross</div>}
                    {item.dea && <div>AED</div>}
                    {item.defcivil && <div>Civil Defense</div>}
                    {item.botiquin && <div>Med Kit</div>}
                    {item.centromedico && <div>Medical Center</div>}
                    {item.mantenimiento && <div>Maintenance</div>}
                    {item.sillaRueda && <div>Wheelchair</div>}
                </div>
            </td>
            <td>
                {item.helpArray &&
                    item.helpArray.map(item => (
                        <div>{item.nombre + " " + item.apellido}</div>
                    ))}
            </td>
            <td>{item.descBrigadista}</td>
            <td>
                <a href={item.image1 !== "image1" && item.image1} target="none">
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
                    href={item.image2 !== "image2" && item.image2}
                    target="_blank"
                >
                    <img
                        onLoad={() => photoLoader(length)}
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
        </tr>
    );
}

export default TableC;
