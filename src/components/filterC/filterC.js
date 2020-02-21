import React, { useState } from "react";
import VirtualizedSelect from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./filterC.css";
import { options, bothCategories } from "./Options";
import { optionsPlace } from "../caseForm/Options";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
const FilterC = ({
    filterNow,
    dateOutput,
    handleCalendarHeight,
    secondHandler,
    ...props
}) => {
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

    const calendarHandle = val => {
        if (val !== null) {
            setOption(val);

            if (val.label === "Date") {
                handleCalendarHeight();
            } else {
                secondHandler();
            }
        }
    };

    const handleFilter = () => {
        if (option) {
            filterNow(
                option.label === "Name"
                    ? name
                    : option.label === "Date"
                    ? option
                    : option.label === "Place"
                    ? place
                    : option.label === "Category" && category,
                option
            );
        }
    };

    return (
        <div style={{ display: "flex", height: "15vh" }}>
            <div className="columnFilter">
                <div
                    className="texto"
                    style={{ position: "relative", top: "3vh" }}
                >
                    Filter By:
                </div>
                <div className="virtualizedBox">
                    <VirtualizedSelect
                        name="opciones"
                        value={option}
                        options={options}
                        filterOptions={filterOptions}
                        onChange={val => calendarHandle(val)}
                    />
                </div>
            </div>
            {option && (
                <div className="columnFilter">
                    <div
                        className="texto"
                        style={{ position: "relative", top: "3vh" }}
                    >
                        {option.label === "Name"
                            ? "Name:"
                            : option.label === "Place"
                            ? "Place:"
                            : option.label === "Date"
                            ? "Date:"
                            : "Category:"}
                    </div>
                    <div className="virtualizedBox">
                        {option.label !== "Fecha" && (
                            <VirtualizedSelect
                                name="opcionesNombre"
                                value={
                                    option.label === "Name"
                                        ? name
                                        : option.label === "Place"
                                        ? place
                                        : option.label === "Category" &&
                                          category
                                }
                                options={
                                    option.label === "Name"
                                        ? nameFilter
                                        : option.label === "Place"
                                        ? optionsPlace
                                        : option.label === "Category" &&
                                          bothCategories
                                }
                                onChange={val =>
                                    option.label === "Name"
                                        ? setName(val)
                                        : option.label === "Place"
                                        ? setPlace(val)
                                        : option.label === "Category" &&
                                          setCategory(val)
                                }
                            />
                        )}

                        {option.label === "Date" && (
                            <div style={{ display: "flex" }}>
                                <Calendar selectRange onChange={dateOutput} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <button
                className="butClass"
                onClick={() => handleFilter()}
                style={{ height: "7vh" }}
            >
                Filter
            </button>
        </div>
    );
};

export default FilterC;
