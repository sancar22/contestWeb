import React, { useState } from "react";
import VirtualizedSelect from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./filterC.css";
import { options } from "./Options";
import { optionsPlace, optionsCategory } from "../caseForm/Options";
import { useSelector, useDispatch } from "react-redux";

const FilterC = ({ filterNow, ...props }) => {
  const filterOptions = createFilterOptions({ options });
  const brigadistas = useSelector(state => state.brigada);
  const [name, setName] = useState("");
  const [option, setOption] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const nameFilter = brigadistas.allBrigades.map((brigade, index) => {
    return {
      value: index.toString(),
      label: `${brigade.nombre + " " + brigade.apellido}`
    };
  });

  return (
    <div style={{ display: "flex", height: "15vh" }}>
      <div className="columnFilter">
        <div className="texto" style={{ position: "relative", top: "3vh" }}>
          Filtrar por:
        </div>
        <div className="virtualizedBox">
          <VirtualizedSelect
            name="opciones"
            value={option}
            options={options}
            filterOptions={filterOptions}
            onChange={val => setOption(val)}
          />
        </div>
      </div>
      {option && (
        <div className="columnFilter">
          <div className="texto" style={{ position: "relative", top: "3vh" }}>
            {option.label === "Nombre"
              ? "Nombre:"
              : option.label === "Lugar"
              ? "Lugar:"
              : option.label === "Fecha"
              ? "Fecha:"
              : option.label === "Tiempo"
              ? "Tiempo:"
              : "Categoría:"}
          </div>
          <div className="virtualizedBox">
            <VirtualizedSelect
              name="opcionesNombre"
              value={
                option.label === "Nombre"
                  ? name
                  : option.label === "Lugar"
                  ? place
                  : option.label === "Categoría" && category
              }
              options={
                option.label === "Nombre"
                  ? nameFilter
                  : option.label === "Lugar"
                  ? optionsPlace
                  : option.label === "Categoría" && optionsCategory
              }
              onChange={val =>
                option.label === "Nombre"
                  ? setName(val)
                  : option.label === "Lugar"
                  ? setPlace(val)
                  : option.label === "Categoría" && setCategory(val)
              }
            />
          </div>
        </div>
      )}

      <button
        className="butClass"
        onClick={() =>
          option &&
          filterNow(
            option.label === "Nombre"
              ? name
              : option.label === "Lugar"
              ? place
              : option.label === "Categoría" && category,
            option
          )
        }
        style={{ height: "7vh" }}
      >
        Filtrar
      </button>
    </div>
  );
};

export default FilterC;
