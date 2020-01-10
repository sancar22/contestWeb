import React from "react";
import { useSelector } from "react-redux";
import './CaseForm.css'

function CaseForm() {
  const brigadistas = useSelector(state => state.brigada);
  const selectedBrigade = brigadistas.selectedBrigade.map(expo =>
  <li>{expo}</li>
  )
 
  return (
    <body className="bod">
    <div className="divi">
      <ul className ="list">
          {selectedBrigade}
      </ul>
    </div>
    </body>
  );
}

export default CaseForm;
