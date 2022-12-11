import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { initializeApp } from "firebase/app";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Button } from "react-native";
import { app } from "../firebaseConfig";

const AuthContext = createContext();

// firebase.initializeApp({
// 	apiKey: "AIzaSyDZANOVUg4JQjwjmZL4E7Z2OrjF76jKmcA",
// 	authDomain: "esteem-demo.firebaseapp.com",
// 	projectId: "esteem-demo",
// 	storageBucket: "esteem-demo.appspot.com",
// 	messagingSenderId: "17324153528",
// 	appId: "1:17324153528:web:4b61e88102d5a70464b24d",
// });

export const AuthContextProvider = ({ children }) => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);

	GoogleSignin.configure({
		webClientId:
			"17324153528-t891pfpjvt932iopofhvntih9tdtpbd7.apps.googleusercontent.com",
	});

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	// if (initializing) return null;

	// function GoogleSignIn() {
	// 	return (
	// 		<Button
	// 			title="Google Sign-In"
	// 			onPress={() =>
	// 				onGoogleButtonPress().then(() =>
	// 					console.log("Signed in with Google!")
	// 				)
	// 			}
	// 		/>
	// 	);
	// }

	async function onGoogleButtonPress() {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	}

	const logOut = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await auth().signOut();
		} catch (error) {
			console.error(error);
		}
	};

	const memoedValue = useMemo(
		() => ({
			onGoogleButtonPress,
			logOut,
			user,
			initializing,
		}),
		[user, initializing]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initializing && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
