// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={{ backgroundColor: "#FF5864" }}>
// 				Open up App.js to start working on your app!
// 			</Text>
// 			<StatusBar style="auto" />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });

import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./StackNavigator";

export default function App() {
	return (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	);
}
