import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/Routes";
import { withRouter } from "react-router-dom";
import firebase from "../../routes/Config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";
import "./Navigation.css";

function Navigation(props) {
  function logout() {
    firebase.logout();
    props.history.replace("/"); //Irse a página de login al hacer logout
  }

  return (
    <body className="bodyy">
      <section>
        <header>
          <div className="navBox">
            <ul>
              <a>
                <li>
                  <Link to={ROUTES.HOME}>Home</Link>
                </li>
              </a>
              <a>
                <li>
                  <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </li>
              </a>
              
            </ul>
            
            <input
              className="logout"
              type="image"
              src="logout1.png"
              onClick={logout}
            />
          
           
          </div>
        </header>
      </section>
    </body>
  );
}
export default withRouter(Navigation);
