import React, { useEffect, useRef, useState } from "react";
import Navigation from "../navigation/Navigation";
import app from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import "./SignUp.css";



function SignUp(props) {
 
  const [fileB, setFileB] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [secondLast, setSecondLast] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const [windowWidth, setWindowWidth] = useState(null); //responsiveness
  const [windowHeight, setWindowHeight] = useState(null);
  app.auth().onAuthStateChanged(user => {
    if (!user) {
      props.history.push("/");
    }
  });

  useEffect(() => {
    // Responsiveness
    window.addEventListener("resize", () => {
      setWindowWidth(document.body.clientWidth);
    });
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(document.body.clientWidth);
      });
      window.removeEventListener("resize", () => {
        setWindowHeight(window.innerHeight);
      });
    }
  }, []);

  useEffect(() => {
    console.log(fileB);
  }, [fileB]);
   
  // For image processing
  const readFile = event => {
    setFileB(URL.createObjectURL(event.target.files[0]));
  };
  const handleClick = () => {
    upload.current.click();
  };

  const upload = useRef();
//

  const register = evt => {
    evt.preventDefault();
  
    try {
      if (email.length < 6) {
        alert("Please enter at least 6 characters");
        return;
      }else if (password !== confPass){
        alert("Passwords don't match")
        return;
      }
     app.auth().createUserWithEmailAndPassword(email.trim(), password); // Register user in firebase
     
    } catch (error) {
      console.log(error.toString());
    }
  
  };

  return (
    <div
      style={{ width: windowWidth, height: windowHeight, overflow: "hidden" }}
    >
      <Navigation />
     

      <form className="formDiv" onSubmit={register}>
        <div className="divRow">
          <img
            className="image"
            src={fileB !== null ? fileB : "image.jpg"}
            alt="profile_default"
            onClick={handleClick}
          />
        </div>
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

        <div className="twoContainer">
          <div className="inputCol">
            <div className="textDiv">Primer Nombre:</div>
            <input
              type="text"
              placeholder="Primer Nombre"
              className="inputSignUp"
              value={firstName}
              required
              onChange={evt => setFirstName(evt.target.value)}
            />
          </div>

          <div className="inputCol">
            <div className="textDiv">Primer Apellido:</div>
            <input
              type="text"
              placeholder="Primer Apellido"
              required
              className="inputSignUp"
              value={lastName}
              onChange={evt => setLastName(evt.target.value)}
            />
          </div>
        </div>

        <div className="twoContainer">
          <div className="inputCol">
            <div className="textDiv">Segundo Apellido:</div>
            <input
              type="text"
              placeholder="Segundo Apellido"
              className="inputSignUp"
              value={secondLast}
              required
              onChange={evt => setSecondLast(evt.target.value)}
            />
          </div>

          <div className="inputCol">
            <div className="textDiv">Correo Electrónico:</div>
            <input
              type="text"
              placeholder="Correo Electrónico"
              required
              className="inputSignUp"
              value={email}
              onChange={evt => setEmail(evt.target.value)}
            />
          </div>
        </div>

        <div className="twoContainer">
          <div className="inputCol">
            <div className="textDiv">Contraseña:</div>
            <input
              type="password"
              placeholder="******"
              className="inputSignUp"
              value={password}
              required
              onChange={evt => setPassword(evt.target.value)}
            />
          </div>

          <div className="inputCol">
            <div className="textDiv">Confirmar Contraseña:</div>
            <input
              type="password"
              placeholder="******"
              required
              className="inputSignUp"
              value={confPass}
              onChange={evt => setConfPass(evt.target.value)}
            />
          </div>
          
        </div>
        <input
        type="submit"
        name = ""
        value="Registrarse"
        className = "buttonSignUp"
        />
      </form>
      
    </div>
  );
}

export default withRouter(SignUp);
