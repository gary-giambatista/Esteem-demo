import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen"; check into this
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { AuthContextProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
	let [fontsLoaded] = useFonts({
		"pacifico-logo": require("./assets/fonts/Pacifico-Regular.ttf"),
		"sanchez-body": require("./assets/fonts/Sanchez-Regular.ttf"),
		"quicksand-body": require("./assets/fonts/static/Quicksand-Regular.ttf"),
		"quicksand-bold": require("./assets/fonts/static/Quicksand-Bold.ttf"),
		"quicksand-semi": require("./assets/fonts/static/Quicksand-SemiBold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<AuthContextProvider>
				<StatusBar style="dark" />
				<StackNavigator />
			</AuthContextProvider>
		</NavigationContainer>
	);
}
