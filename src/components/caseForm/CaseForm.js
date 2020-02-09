import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createFilterOptions from "react-select-fast-filter-options";
import firebase from "../../routes/Config";
import {
    options,
    optionsPlace,
    optionsCod,
    optionsCategory1,
    optionsCategory2
} from "./Options";
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
import ActiveCaseBlock from "./ActiveCaseBlock";

function CaseForm() {
    const brigadistas = useSelector(state => state.brigada);
    const fillCase = useSelector(state => state.fillCase);
    const [optionsMenu, setOptionsMenu] = useState("InfoCaso");
    const dispatch = useDispatch();
    const selectedBrigade = brigadistas.selectedBrigade.map(
        (brigada, index) => (
            <li key={index} className="listele">
                {brigada.nombre + " " + brigada.apellido}
            </li>
        )
    );
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

    const handleButtonClickExt = caso => {
        firebase.changeSeenExt(caso);
        const objeto = "Extintor";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickCam = caso => {
        firebase.changeSeenCam(caso);
        const objeto = "Camilla";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickPol = caso => {
        firebase.changeSeenPol(caso);
        const objeto = "Policía";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickAmb = caso => {
        firebase.changeSeenAmb(caso);
        const objeto = "Ambulancia";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickBom = caso => {
        firebase.changeSeenBom(caso);
        const objeto = "Bombero";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickApoyo = caso => {
        firebase.changeSeenApoyo(caso);
        const objeto = "Apoyo";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };

    const handleButtonClickDefCivil = caso => {
        firebase.changeSeenDefCiv(caso);
        const objeto = "Defensa Civil";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };

    const handleButtonClickBotiquin = caso => {
        firebase.changeSeenBotiquin(caso);
        const objeto = "Botiquín";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };

    const handleButtonClickCentroMed = caso => {
        firebase.changeSeenCentroMed(caso);
        const objeto = "Centro Médico";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };

    const handleButtonClickCruzRoja = caso => {
        firebase.changeSeenCruzRoja(caso);
        const objeto = "Cruz Roja";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };

    const handleButtonClickMant = caso => {
        firebase.changeSeenMant(caso);
        const objeto = "Mantenimiento";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickSillaRueda = caso => {
        firebase.changeSeenSillaRueda(caso);
        const objeto = "Silla de ruedas";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleButtonClickDEA = caso => {
        firebase.changeSeenDEA(caso);
        const objeto = "DEA";
        firebase.miniPushNotification(caso.Expotoken, objeto);
    };
    const handleRedButton = caso => {
        firebase.handleRedB(caso);
    };
    const activeCases = brigadistas.activeCases.map(caso => (
        <ActiveCaseBlock
            caso={caso}
            handleButtonClickCam={handleButtonClickCam}
            handleButtonClickExt={handleButtonClickExt}
            handleButtonClickBom={handleButtonClickBom}
            handleButtonClickPol={handleButtonClickPol}
            handleButtonClickApoyo={handleButtonClickApoyo}
            handleButtonClickAmb={handleButtonClickAmb}
            handleButtonClickDefCivil={handleButtonClickDefCivil}
            handleButtonClickBotiquin={handleButtonClickBotiquin}
            handleButtonClickCentroMed={handleButtonClickCentroMed}
            handleButtonClickCruzRoja={handleButtonClickCruzRoja}
            handleButtonClickMant={handleButtonClickMant}
            handleButtonClickSillaRueda={handleButtonClickSillaRueda}
            handleButtonClickDEA={handleButtonClickDEA}
            handleRedButton={handleRedButton}
        />
    ));

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
            ? toast(
                  <CustomToast title="¡Seleccione a un brigadista de apoyo!" />
              )
            : brigadistas.selectedBrigade.length > 3
            ? toast(
                  <CustomToast title="¡Solo puede seleccionar a máximo 3 brigadistas de apoyo!" />
              )
            : sendHelp();
    };

    const sendHelp = () => {};

    function sendCase() {
        //Botón para enviar notificaciones

        firebase.pushNotification(brigadistas.selectedBrigade, fillCase);
        dispatch(fillPlace(null));
        dispatch(fillCode(null));
        dispatch(fillCategory(null));
        dispatch(fillDescription(""));

        firebase.resetSelected();
    }

    return (
        <div className="allCaseContainer">
            <div className="caseNav">
                <button
                    className="optionsCase"
                    style={{
                        backgroundColor:
                            optionsMenu === "InfoCaso" && "rgb(184, 184, 184)"
                    }}
                    onClick={() => setOptionsMenu("InfoCaso")}
                >
                    Info. Casos
                </button>
                <button
                    className="optionsCase"
                    style={{
                        backgroundColor:
                            optionsMenu === "Generar" && "rgb(184, 184, 184)"
                    }}
                    onClick={() => setOptionsMenu("Generar")}
                >
                    Generar Caso
                </button>
                <button
                    className="optionsCase"
                    style={{
                        backgroundColor:
                            optionsMenu === "Apoyo" && "rgb(184, 184, 184)"
                    }}
                    onClick={() => setOptionsMenu("Apoyo")}
                >
                    Apoyo
                </button>
            </div>
            {optionsMenu === "Generar" ? (
                <CaseFormC
                    selectedBrigade={selectedBrigade}
                    options={options}
                    optionsPlace={optionsPlace}
                    optionsCod={optionsCod}
                    optionsCategory1={optionsCategory1}
                    optionsCategory2={optionsCategory2}
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
                <HotActiveCase activeCases={activeCases} />
            )}
        </div>
    );
}

export default CaseForm;
