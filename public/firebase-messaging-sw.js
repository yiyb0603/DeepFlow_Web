/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

firebase.initializeApp({
	messagingSenderId: '401003357082',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	const { title, body, icon } = JSON.parse(payload.data.notification);
	const options = {
		body,
		icon,
	};
	
	return registration.showNotification(title, options);
});