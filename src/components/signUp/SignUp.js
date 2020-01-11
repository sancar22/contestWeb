import React from "react";
import Navigation from "../navigation/Navigation";
import app from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import CaseForm from "../caseForm/CaseForm"


function SignUp(props) {

  app.auth().onAuthStateChanged(user => {
    if (!user) {
      props.history.push("/");
    }
  });

  return (
    <div>
      <Navigation />
    </div>
  );
}

export default withRouter(SignUp);
