import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createFilterOptions from "react-select-fast-filter-options";
import firebase from "../../routes/Config";
import { options, optionsPlace, optionsCod, optionsCategory } from "./Options";
import {
  fillPlace,
  fillCode,
  fillCategory,
  fillDescription,
  helpBrigade
} from "../../actions/index";
import CaseFormC from "./CaseFormC";
import HelpFormC from "./HelpFormC";
import HotActiveCase from "./HotActiveCase";
import CustomToast from "../custom-toast";
import "./CaseForm.css";
import { toast } from "react-toastify";

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const fillCase = useSelector(state => state.fillCase);
  const [optionsMenu, setOptionsMenu] = useState("Generar");
  const dispatch = useDispatch();
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada, index) => (
    <li key={index} className="listele">
      {brigada.nombre + " " + brigada.apellido}
    </li>
  ));
  const helpCaseFilter = brigadistas.brigadeListOnline
    .filter(brigade => {
      return brigade.ocupado === true;
    })
    .map((brigade, index) => {
      return {
        value: index.toString(),
        label: `${brigade.nombre + " " + brigade.apellido}`
      };
    });

  const filterOptions1 = createFilterOptions({ options });
  const checkFunctionCase = (place, code, category, description) => {
    place === null
      ? toast(<CustomToast title="¡Seleccione Lugar!" />)
      : code === null
      ? toast(<CustomToast title="¡Seleccione Código!" />)
      : category === null
      ? toast(<CustomToast title="¡Seleccione Categoría!" />)
      : description === null || description === ""
      ? toast(<CustomToast title="¡Descripción es obligatoria!" />)
      : brigadistas.selectedBrigade.length > 1
      ? toast(<CustomToast title="¡No puede seleccionar a más de uno!" />)
      : brigadistas.selectedBrigade.length < 1
      ? toast(<CustomToast title="¡Seleccione a un brigadista!" />)
      : sendCase();
  };

  const checkFunctionHelp = brigApoyados => {
    brigApoyados === null
      ? toast(<CustomToast title="¡Seleccione brigadista a apoyar!" />)
      : brigadistas.selectedBrigade.length < 1
      ? toast(<CustomToast title="¡Seleccione a un brigadista de apoyo!" />)
      : brigadistas.selectedBrigade.length > 3
      ? toast(
          <CustomToast title="¡Solo puede seleccionar a máximo 3 brigadistas de apoyo!" />
        )
      : sendHelp();
  };

  const sendHelp = () => {};

  function sendCase() {
    //Botón para enviar notificaciones
    firebase.updateCaseBranch(brigadistas.selectedBrigade, fillCase);
    dispatch(fillPlace(null));
    dispatch(fillCode(null));
    dispatch(fillCategory(null));
    dispatch(fillDescription(""));
    setTimeout(() => notifExpired(), 10000);
    firebase.pushNotification(brigadistas.selectedBrigade);
    firebase.resetSelected();
  }

  function notifExpired() {
    firebase.notifExpired(brigadistas.selectedBrigade);
    firebase.updateRejectedCases(brigadistas.selectedBrigade);
  }

  return (
    <div className="allCaseContainer">
      <div className="caseNav">
        <button
          className="optionsCase"
          style={{
            backgroundColor: optionsMenu === "Generar" && "rgb(184, 184, 184)"
          }}
          onClick={() => setOptionsMenu("Generar")}
        >
          Generar Caso
        </button>
        <button
          className="optionsCase"
          style={{
            backgroundColor: optionsMenu === "Apoyo" && "rgb(184, 184, 184)"
          }}
          onClick={() => setOptionsMenu("Apoyo")}
        >
          Apoyo
        </button>
        <button
          className="optionsCase"
          style={{
            backgroundColor: optionsMenu === "InfoCaso" && "rgb(184, 184, 184)"
          }}
          onClick={() => setOptionsMenu("InfoCaso")}
        >
          Info. Casos
        </button>
      </div>
      {optionsMenu === "Generar" ? (
        <CaseFormC
          selectedBrigade={selectedBrigade}
          options={options}
          optionsPlace={optionsPlace}
          optionsCod={optionsCod}
          optionsCategory={optionsCategory}
          fillCase={fillCase}
          filterOptions1={filterOptions1}
          checkFunctionCase={checkFunctionCase}
        />
      ) : optionsMenu === "Apoyo" ? (
        <HelpFormC
          selectedBrigade={selectedBrigade}
          helpCaseFilter={helpCaseFilter}
          fillCase={fillCase}
          filterOptions1={filterOptions1}
          checkFunctionHelp={checkFunctionHelp}
        />
      ) : (
        <HotActiveCase />
      )}
    </div>
  );
}

export default CaseForm;
