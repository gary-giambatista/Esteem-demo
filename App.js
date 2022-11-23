import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as Random from "expo-random";
import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithCredential,
} from "firebase/auth";
import * as React from "react";
import { Button, SafeAreaView } from "react-native";

// Initialize Firebase
initializeApp({
	apiKey: "AIzaSyDZANOVUg4JQjwjmZL4E7Z2OrjF76jKmcA",
	authDomain: "esteem-demo.firebaseapp.com",
	projectId: "esteem-demo",
	storageBucket: "esteem-demo.appspot.com",
	messagingSenderId: "17324153528",
	appId: "1:17324153528:web:4b61e88102d5a70464b24d",
});

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId:
			"17324153528-t891pfpjvt932iopofhvntih9tdtpbd7.apps.googleusercontent.com",
	});

	React.useEffect(() => {
		if (response?.type === "success") {
			const { id_token } = response.params;
			const auth = getAuth();
			const credential = GoogleAuthProvider.credential(id_token);
			signInWithCredential(auth, credential);
		}
	}, [response]);

	return (
		<SafeAreaView>
			<Button
				style={{ flex: 1 }}
				disabled={!request}
				title="Login"
				onPress={() => {
					promptAsync();
				}}
			/>
		</SafeAreaView>
	);
}
