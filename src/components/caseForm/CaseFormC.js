import React, { useState } from "react";
import { useDispatch } from "react-redux";
import VirtualizedSelect from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./CaseForm.css";
import {
    fillPlace,
    fillCode,
    fillCategory,
    fillDescription
} from "../../actions/index";

const CaseFormC = ({
    selectedBrigade,
    options,
    optionsPlace,
    optionsCod,
    optionsCategory1,
    optionsCategory2,
    fillCase,
    filterOptions1,
    checkFunctionCase,
    ...props
}) => {
    const dispatch = useDispatch();
    const [categoryState, setCategoryState] = useState("");
    const handleCodeChange = val => {
        dispatch(fillCode(val));
        dispatch(fillCategory(null));
        if (val != null) {
            setCategoryState(
                val.label == "510"
                    ? optionsCategory1
                    : val.label == "533"
                    ? optionsCategory2
                    : ""
            );
        } else {
            setCategoryState("");
            dispatch(fillCategory(null));
        }
    };
    return (
        <React.Fragment>
            <div className="bod">
                <br />
                <div className="texto">Selected Helpers:</div>
                <ul className="list">{selectedBrigade}</ul>
                <div
                    className="texto"
                    style={{ position: "relative", top: "3vh" }}
                >
                    Place of emergency:
                </div>
                <div
                    style={{
                        width: "26.3vw",
                        marginLeft: "1.8vw",
                        position: "relative",
                        top: "3vh"
                    }}
                >
                    <VirtualizedSelect
                        name="lugar"
                        value={fillCase.lugarEmergencia}
                        options={optionsPlace}
                        filterOptions={filterOptions1}
                        onChange={val => dispatch(fillPlace(val))}
                    />
                </div>

                <div
                    className="div1"
                    style={{ top: "5vh", position: "relative" }}
                >
                    <div className="div2" style={{ width: "30%" }}>
                        <div className="texti" style={{ marginLeft: "2vw" }}>
                            Code:
                        </div>
                    </div>

                    <div className="div2" style={{ width: "70%" }}>
                        <div className="texti" style={{ marginLeft: "3.9vw" }}>
                            Category
                        </div>
                    </div>
                </div>

                <div className="div3">
                    <div
                        className="div2"
                        style={{ width: "30%", marginLeft: "1.8vw" }}
                    >
                        <VirtualizedSelect
                            name="lugar"
                            value={fillCase.codigo}
                            options={optionsCod}
                            onChange={val => handleCodeChange(val)}
                        />
                    </div>

                    <div
                        className="div2"
                        style={{ width: "50%", marginLeft: "2.3vw" }}
                    >
                        <VirtualizedSelect
                            name="lugar"
                            value={fillCase.categoria}
                            options={categoryState}
                            onChange={val => dispatch(fillCategory(val))}
                        />
                    </div>
                </div>
                <div style={{ top: "9vh", position: "relative" }}>
                    <div className="texti" style={{ marginLeft: "2.2vw" }}>
                        Additional Description:
                    </div>
                </div>
                <textarea
                    placeholder="Add important additional information..."
                    className="inputtext"
                    value={fillCase.descAdicional}
                    onChange={event =>
                        dispatch(fillDescription(event.target.value))
                    }
                />
                <button
                    className="but"
                    onClick={() =>
                        checkFunctionCase(
                            fillCase.lugarEmergencia,
                            fillCase.codigo,
                            fillCase.categoria,
                            fillCase.descAdicional
                        )
                    }
                >
                    Send Case
                </button>
            </div>
        </React.Fragment>
    );
};

export default CaseFormC;
