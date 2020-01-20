importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
    messagingSenderId: "1062407524656",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    // Customize notification here
    const notificationTitle = "SOLICITUD BRIGADISTA";
    const notificationOptions = {
        body: payload.data.body,
        icon: `/${payload.data.objeto}.png`,
        click_action: "http://localhost:3000/home",
        requireInteraction: true,
        actions: [{ action: "go", title: "Asistirlo 👍" }],
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});
self.addEventListener("notificationclick", function(event) {
    event.waitUntil(
        (async function() {
            const allClients = await clients.matchAll({
                includeUncontrolled: true,
            });
            let chatClient;
            let appUrl = "http://localhost:3000/";
            for (const client of allClients) {
                //here appUrl is the application url, we are checking it application tab is open
                if (client["url"].indexOf(appUrl) >= 0) {
                    client.focus();
                    chatClient = client;
                    break;
                }
            }
            if (!chatClient) {
                chatClient = await clients.openWindow(appUrl);
            }
        })()
    );
});
