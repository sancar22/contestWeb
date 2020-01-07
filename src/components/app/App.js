import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignIn from '../signIn/SignIn'
import HomePage from '../homePage/HomePage'
import SignUp from '../signUp/SignUp'
import * as ROUTES from '../../routes/Routes'
//import {useSelector, useDispatch} from 'react-redux'
//import {logManager} from '../../actions/index'

import firebase from '../../routes/Config'
//import Navigation from '../navigation/Navigation'



function App () {
      //const isLogged = useSelector(state => state.isLogged)
      const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	    useEffect(() => {
		    firebase.isInitialized().then(val => {
			  setFirebaseInitialized(val)
		})
	})
    return firebaseInitialized !== false ? (
      <Router>
      <div>

        <Switch>
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        </Switch>
      </div>
    </Router>
    ) : <h1>Loading</h1>
}
    

 


export default App;
