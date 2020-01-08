const functions = require('firebase-functions');
let fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.sendPushNotification = functions.database.ref('Casos/{id}').onCreate(event =>{
   const root = event.params.id
    let messages = []

   return root.child('/Users').once('value').then(snapshot =>{
        snapshot.forEach(childSnapshot => {
            let expoToken = childSnapshot.val().Expotoken
            if(expoToken){
                messages.push({
                    "to": expoToken,
                    "body": "New Note Added"
                })
            }
        })
        return Promise.all(messages)
    }).then(messages =>{
       return fetch('https://exp.host/--/api/v2/push/send',{
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messages)
        })
    })
})