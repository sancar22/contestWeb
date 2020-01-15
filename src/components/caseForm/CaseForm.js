import React from "react";
import { useSelector, useDispatch } from "react-redux";
import createFilterOptions from "react-select-fast-filter-options";
import firebase from "../../routes/Config";
import { options, optionsPlace, optionsCod, optionsCategory } from "./Options";
import {
  fillPlace,
  fillCode,
  fillCategory,
  fillDescription,
} from "../../actions/index";
import CaseFormC from "./CaseFormC";

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const fillCase = useSelector(state => state.fillCase);
  const dispatch = useDispatch();
  const selectedBrigade = brigadistas.selectedBrigade.map((brigada, index) => (
    <li key={index} className="listele">
      {brigada.Email}
    </li>
  ));

  const filterOptions1 = createFilterOptions({ options });

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
    <CaseFormC
      selectedBrigade={selectedBrigade}
      options={options}
      optionsPlace={optionsPlace}
      optionsCod={optionsCod}
      optionsCategory={optionsCategory}
      fillCase={fillCase}
      filterOptions1={filterOptions1}
      sendCase={sendCase}
    />
  );
}

export default CaseForm;
