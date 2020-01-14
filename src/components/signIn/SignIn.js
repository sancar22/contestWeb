import React, {useState} from 'react';
import firebase from '../../routes/Config'
import app from 'firebase/app'
import 'firebase/auth'
import {withRouter} from 'react-router-dom'
import './SignIn.css'
import ClipLoader from 'react-spinners/ClipLoader';
import {css} from '@emotion/core'



function SignIn(props) {

    const [email, setEmail] = useState(''); 

    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 40vh;`;

    const handleUserChange = (evt) => {
      const currentEmail = evt.target.value
      setEmail(currentEmail)
    }

    const handleUserPassword = (evt) => { 
      const currentPassword = evt.target.value
      setPassword(currentPassword)
    }

    const login = async(evt) => {
      evt.preventDefault();
      setLoading(true)
      try{
        await firebase.login(email,password) // autenticación
        setLoading(false)
        props.history.replace('/home') //  login es exitoso ir a /home
      }catch(e){
        alert("Wrong email or password")
      }
    }
    
    app.auth().onAuthStateChanged((user) => { // Para que el usuario no se vaya a pantalla de login cuando esté adentro
      if (user) {
        props.history.push('/home')
      }
   });

    return (  
      <div>
      {loading ? 
         <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        loading={loading}
         /> : 
    <div className="bodyb">
    <div className="loginBox">
     <img src={require('./logoBrigada.jpg')} className="user" alt="icon_brigade"/>
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
    </div>
  
  }
  </div>
    
      )

    
    }


export default withRouter(SignIn)