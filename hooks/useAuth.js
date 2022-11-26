import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	getRedirectResult,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signInWithPopup,
	signInWithRedirect,
	signOut,
} from "firebase/auth";
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { auth } from "../firebaseConfig";

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

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [initialLoading, setinitialLoading] = useState(true);
	const [loading, setLoading] = useState(false);

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

	const googleSignIn = async () => {
		setLoading(true);
		await promptAsync();
		setLoading(false);
	};

	const logOut = () => {
		setLoading(true);
		signOut(auth);
		setLoading(false);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setinitialLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const memoedValue = useMemo(
		() => ({
			googleSignIn,
			logOut,
			user,
			initialLoading,
			loading,
		}),
		[user, initialLoading, loading]
	);

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
