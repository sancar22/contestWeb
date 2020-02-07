import React from "react";
import "./SideDrawer.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../routes/Routes";
import firebase from "../../routes/Config";
import "firebase/auth";

const sideDrawer = props => {
  let classN = props.shown ? "side-drawer open" : "side-drawer";
  const logout = () => {
    firebase.logout();
    props.history.replace("/"); //Irse a página de login al hacer logout
  };
  return (
    <nav className={classN}>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>

        <li>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
        <li>
          <Link to={ROUTES.STATS}>Stats</Link>
        </li>
        <li>
          <Link to={ROUTES.CLOSED_CASES}>Closed Cases</Link>
        </li>
        <li>
          <Link to={ROUTES.OPENED_CASES}>Opened Cases</Link>
        </li>
        <input
          className="logout2"
          type="image"
          src="logout1.png"
          alt="logout_icon"
          onClick={logout}
        />
      </ul>
    </nav>
  );
};

export default withRouter(sideDrawer);
