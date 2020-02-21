import React from "react";
import VirtualizedSelect from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./CaseForm.css";
import { helpBrigade } from "../../actions/index";
import { useDispatch } from "react-redux";
const HelpFormC = ({
    fillCase,
    filterOptions1,
    helpCaseFilter,
    checkFunctionHelp
}) => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <div className="bod">
                <br />

                <div
                    className="texto"
                    style={{ position: "relative", top: "3vh" }}
                >
                    Brigader to help:
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
                        value={fillCase.brigApoyado}
                        options={helpCaseFilter}
                        filterOptions={filterOptions1}
                        onChange={val => dispatch(helpBrigade(val))}
                    />
                </div>
                <button
                    className="but"
                    onClick={() => checkFunctionHelp(fillCase.brigApoyado)}
                    style={{ height: "7vh" }}
                >
                    Send Help
                </button>
            </div>
        </React.Fragment>
    );
};

export default HelpFormC;
