import React, {useState} from 'react';
//import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
//import * as ROUTES from '../../routes/Routes'
//import HomePage from '../homePage/HomePage'
//import App from '../app/App'
//import {useSelector, useDispatch} from 'react-redux'
//import {logManager} from '../../actions/index'
import firebase from '../../routes/Config'
import app from 'firebase/app'
import 'firebase/auth'
import {withRouter} from 'react-router-dom'
import './SignIn.css'



function SignIn(props) {

    const [email, setEmail] = useState(''); // Email is actual state, setEmail is to set it as before

    const [password, setPassword] = useState('');

    const handleUserChange = (evt) => {
      const currentEmail = evt.target.value
      setEmail(currentEmail)
    }

    const handleUserPassword = (evt) => { 
      const currentPassword = evt.target.value
      setPassword(currentPassword)
    }
    
    app.auth().onAuthStateChanged((user) => { // Para que el usuario no se vaya a pantalla de login cuando esté adentro
      if (user) {
        props.history.push('/home')
      }
   });
   

    //const dispatch = useDispatch();
    return (  
        <div className="loginBox">
         <img src={require('./logoBrigada.jpg')} className="user"/>
         <h2>¡Bienvenido!</h2>
          <form onSubmit={login}>
            <p>Email</p>
            <input 
            type="text" 
            placeholder="Enter your email" 
            value={email} 
            onChange={handleUserChange}
            />
            <p>Password</p>
            <input 
            type="password" 
            placeholder="*********" 
            value={password} 
            onChange={handleUserPassword}
            />
            <input
            type="submit"
            name = ""
            value="Sign In"
            />
          </form>
        </div>
      )

      async function login (evt) {
        evt.preventDefault();
        try{
          await firebase.login(email,password) // autenticación
          props.history.replace('/home') // Si login es exitoso ir a /home
        }catch(e){
          alert("Wrong email or password")
        }
      }
    }


export default withRouter(SignIn)