import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
	const { googleSignIn, loading } = useAuth();

	return (
		<SafeAreaView>
			<Text>This is the Login Screen</Text>
			<Button title="Login" onPress={googleSignIn} />
		</SafeAreaView>
	);
};

export default LoginScreen;
