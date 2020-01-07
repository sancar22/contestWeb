import React from 'react';
import Navigation from '../navigation/Navigation'
import app from 'firebase/app'
import 'firebase/auth'
import {withRouter} from 'react-router-dom'

function SignUp(props) {

        app.auth().onAuthStateChanged((user) => {
            if (!user) {
            props.history.push('/')
            }
        });

        return(
           <div>
               <Navigation/>
               <hr/>
               <h1>SignUp</h1>
           </div> 
        )
    

}

export default withRouter(SignUp)