import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes/Routes";
import './Navigation.css'

const Navigation = () => (
 <body>  
   <section>
      <header>
  <div className ="navBox">
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
  </div>
  </header>
    </section>
  </body> 
 
);
export default Navigation;
