import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/Routes";
import { withRouter } from "react-router-dom";
import firebase from "../../routes/Config";
import "firebase/auth";
import "./Navigation.css";

function Navigation(props) {
    const logout = () => {
        firebase.logout();
        props.history.replace("/"); //Irse a página de login al hacer logout
    };

    return (
        <div className="bodyy">
            <section>
                <header>
                    <div className="navBox">
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
                                <Link to={ROUTES.CLOSED_CASES}>
                                    Closed Cases
                                </Link>
                            </li>
                        </ul>

                        <input
                            className="logout"
                            type="image"
                            src="logout1.png"
                            alt="logout_icon"
                            onClick={logout}
                        />
                    </div>
                </header>
            </section>
        </div>
    );
}
export default withRouter(Navigation);
