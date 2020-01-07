import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/Routes";

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
    </ul>
  </div>
);
export default Navigation;
