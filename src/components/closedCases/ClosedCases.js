import React, { useEffect, useState, useRef } from "react";
import Navigation from "../navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./ClosedCases.css";
import ClipLoader from "react-spinners/ClipLoader";
import SideDrawer from "../sideDrawer/SideDrawer";
import Backdrop from "../backdrop/Backdrop";
import TableC from "../tableC/TableC";
import { css } from "@emotion/core";
import FilterC from "../filterC/filterC";

function ClosedCases(props) {
    const allCases = useSelector(state => state.casos);
    const counter = useRef(0);
    const [loading, setLoading] = useState(true);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const [filterName, setFilterName] = useState("");
    const [showName, setShowName] = useState(false);
    const [filterPlace, setFilterPlace] = useState("");
    const [showPlace, setShowPlace] = useState(false);
    const [filterCategory, setFilterCategory] = useState("");
    const [showCategory, setShowCategory] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [filterDate, setFilterDate] = useState("");
    const [lowerDateRange, setLowerDateRange] = useState(0);
    const [upperDateRange, setUpperDateRange] = useState(0);
    const [heightHandler, setHeightHandler] = useState(false);

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    };
    const override = loading
        ? css`
              display: block;
              margin: 0 auto;
              border-color: red;
              margin-top: 30vh;
          `
        : css`
              display: none;
          `;
    app.auth().onAuthStateChanged(user => {
        // Para llevarlo a login window si no está conectado
        if (!user) {
            props.history.push("/");
        }
    });
    const photoLoader = length => {
        counter.current += 1;

        if (counter.current >= length * 2) {
            setLoading(false);
        }
    };

    const handleCalendarHeight = () => {
        setHeightHandler(true);
    };
    const secondHandler = () => {
        setHeightHandler(false);
    };

    const dateOutput = date => {
        console.log(date);
        setLowerDateRange(new Date(date[0]).getTime());
        setUpperDateRange(new Date(date[1]).getTime());
    };

    const filterNow = (field, option) => {
        if (option.label === "Name") {
            setShowPlace(false);
            setShowCategory(false);
            setShowName(true);
            setShowDate(false);
            setFilterName(
                allCases
                    .filter(
                        data =>
                            data.active === false &&
                            data.nombre + " " + data.apellido === field.label
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                data.nombre + " " + data.apellido ===
                                    field.label
                        ).length;
                        return (
                            <TableC
                                index={index}
                                photoLoader={photoLoader}
                                item={item}
                                length={length}
                            />
                        );
                    })
            );
        } else if (option.label === "Place") {
            setShowPlace(true);
            setShowCategory(false);
            setShowName(false);
            setShowDate(false);
            setFilterPlace(
                allCases
                    .filter(
                        data =>
                            data.active === false && data.lugar === field.label
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                data.lugar === field.label
                        ).length;
                        return (
                            <TableC
                                index={index}
                                photoLoader={photoLoader}
                                item={item}
                                length={length}
                            />
                        );
                    })
            );
        } else if (option.label === "Category") {
            setShowPlace(false); // Acuerda de agregar nuevas cosas y cambiar estados
            setShowCategory(true);
            setShowName(false);
            setShowDate(false);
            setFilterCategory(
                allCases
                    .filter(
                        data =>
                            data.active === false &&
                            data.categoria === field.label
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                data.categoria === field.label
                        ).length;
                        return (
                            <TableC
                                index={index}
                                photoLoader={photoLoader}
                                item={item}
                                length={length}
                            />
                        );
                    })
            );
        } else if (option.label === "Date") {
            setShowPlace(false);
            setShowCategory(false);
            setShowName(false);
            setShowDate(true);
            console.log();
            setFilterDate(
                allCases
                    .filter(
                        data =>
                            data.active === false &&
                            lowerDateRange <=
                                new Date(
                                    data.inicioFecha.split(" ", 1)
                                ).getTime() &&
                            upperDateRange >=
                                new Date(
                                    data.inicioFecha.split(" ", 1)
                                ).getTime()
                    )
                    .map((item, index) => {
                        const length = allCases.filter(
                            data =>
                                data.active === false &&
                                lowerDateRange <=
                                    new Date(
                                        data.inicioFecha.split(" ", 1)
                                    ).getTime() &&
                                upperDateRange >=
                                    new Date(
                                        data.inicioFecha.split(" ", 1)
                                    ).getTime()
                        ).length;
                        return (
                            <TableC
                                index={index}
                                photoLoader={photoLoader}
                                item={item}
                                length={length}
                            />
                        );
                    })
            );
        }
    };

    let showArray =
        allCases.length > 0 &&
        allCases
            .filter(data => data.active === false)
            .map((item, index) => {
                const length = allCases.filter(data => data.active === false)
                    .length;

                return (
                    <TableC
                        index={index}
                        photoLoader={photoLoader}
                        item={item}
                        length={length}
                    />
                );
            });
    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
            <Navigation sideFunction={drawerToggleClickHandler} />
            {sideDrawerOpen && <Backdrop click={drawerToggleClickHandler} />}
            <SideDrawer
                shown={sideDrawerOpen}
                click={drawerToggleClickHandler}
            />
            <ClipLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={loading}
            />

            <div
                style={{
                    overflow: "auto",
                    width: "100%",
                    height: "87%",
                    display: loading ? "none" : "block"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: heightHandler ? "60%" : "20%"
                    }}
                >
                    <FilterC
                        filterNow={filterNow}
                        dateOutput={dateOutput}
                        handleCalendarHeight={handleCalendarHeight}
                        secondHandler={secondHandler}
                    />
                </div>
                <table className="tableClosed">
                    <tr>
                        <th>Brigader</th>
                        <th>Details</th>
                        <th>Description</th>
                        <th>Help</th>
                        <th>Other Brigaders</th>
                        <th>Procedure</th>
                        <th>Photos</th>
                    </tr>
                    {allCases.length > 0 && showName === true
                        ? filterName
                        : showCategory === true
                        ? filterCategory
                        : showPlace === true
                        ? filterPlace
                        : showDate === true
                        ? filterDate
                        : showArray}
                </table>
            </div>
        </div>
    );
}

export default ClosedCases;
