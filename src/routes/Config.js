import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-database'
import { getDefaultWatermarks } from 'istanbul-lib-report';
import React from 'react'


const config = {
    apiKey: "AIzaSyBXFpz69eQZ_N1SHO37O1e7mMmAlkWIikc",
    authDomain: "brigadaun.firebaseapp.com",
    databaseURL: "https://brigadaun.firebaseio.com",
    projectId: "brigadaun",
    storageBucket: "brigadaun.appspot.com",
    messagingSenderId: "715436806531",
    appId: "1:715436806531:web:f74cf02bc7bf4e628566b6"
  };
  // Initialize Firebase
  

  class Firebase {
      constructor(){
          app.initializeApp(config)
          this.auth = app.auth()
          this.db = app.database();
      }

      login(email,password){
          return this.auth.signInWithEmailAndPassword(email,password)
      }

      logout(){
          return this.auth.signOut()
      }
      
      getDataAllUsers() {
        return this.db.ref('/Users').on('value', snapshot =>{
            const firebaseData = snapshot.val()
         })
     }
      getDataOnlineUsers(){
       return this.db.ref('/Users').orderByChild('online').equalTo(true).on('value',snapshot=>{
           const firebaseData = snapshot.val()
          
       })
    }

      async register(email, password){
          await this.auth.createUserWithEmailAndPassword(email,password)
      }

      isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
        })

        
        
    }
    


  }

  export default new Firebase()