import React from "react";

const HelpListItems = ({ fction, casoObj, objeto, caso, ...props }) => {
    return (
        <button
            id={objeto}
            onClick={() => fction(caso)}
            disabled={casoObj && true}
            style={{
                backgroundColor: casoObj && "green"
            }}
            className="buttonObj"
        >
            {casoObj ? (
                <strike className="texti">{objeto}</strike>
            ) : (
                <div className="texti">{objeto}</div>
            )}
        </button>
    );
};

export default HelpListItems;
