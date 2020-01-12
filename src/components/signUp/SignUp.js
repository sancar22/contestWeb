import React, { useEffect, useRef, useState } from "react";
import Navigation from "../navigation/Navigation";
import app from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import CaseForm from "../caseForm/CaseForm";
import './SignUp.css'

function SignUp(props) {
  const [fileB, setFileB] = useState(null);
  app.auth().onAuthStateChanged(user => {
    if (!user) {
      props.history.push("/");
    }
  });

  useEffect(() => {
    console.log(fileB);
  }, [fileB]);

  const readFile = event => {
    setFileB(URL.createObjectURL(event.target.files[0]));
  };
  const handleClick = () => {
    upload.current.click();
  };

  const upload = useRef();

  return (
    <div>
      <Navigation />

      <img
        className = "image"
        src={fileB !== null ? fileB : "image.jpg"}
        onClick={handleClick}
      />

      <input
        id="upload"
        ref={upload}
        type="file"
        accept="image/*"
        onInput={readFile}
        onClick={event => {
          event.target.value = null;
        }}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default withRouter(SignUp);
