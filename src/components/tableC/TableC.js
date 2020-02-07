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
          <div>Lugar: {item.lugar}</div>
          <div>Código: {item.codigo}</div>
          <div>Categoría: {item.categoria}</div>
          <div>Comienzo: {item.inicioFecha}</div>
          <div>Fin: {item.finalFecha}</div>
          <div>Tiempo Total: {item.formatTime}</div>
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
          {item.bombero && <div>Bombero</div>}
          {item.ambulancia && <div>Ambulancia</div>}
          {item.camilla && <div>Camilla</div>}
          {item.extintor && <div>Extintor</div>}
          {item.policia && <div>Policía</div>}
          {item.apoyo && <div>Apoyo</div>}
        </div>
      </td>
      <td>
        <div>No disponible por el momento.</div>
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
        <a href={item.image2 !== "image2" && item.image2} target="_blank">
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
