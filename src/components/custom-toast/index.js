import React from "react";
function CustomToast({ title, body, image, textStyle }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <img
                height={30}
                width={30}
                src={image || require("../../assets/alarm.png")}
            />
            <div>
                <h4 style={{ color: "red", ...textStyle }}>{title}</h4>
                <p style={{ color: "black", ...textStyle }}>{body}</p>
            </div>
        </div>
    );
}
export default CustomToast;
