import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

const SearchingModalScreen = () => {
	const navigation = useNavigation();
	const { theme } = useAuth();

	return (
		<SafeAreaView
			style={[
				styles.mainContainer,
				theme === "dark" ? styles.darkModeMainContainer : null,
			]}
		>
			<Text
				style={[
					styles.title,
					theme === "dark" ? styles.darkModeTextColor : null,
				]}
			>
				Thank you for submitting your view!
			</Text>
			<ActivityIndicator size="large" />
			<Text
				style={[
					styles.title,
					theme === "dark" ? styles.darkModeTextColor : null,
				]}
			>
				Please wait while we find you{"\n"} a chat partner, hang tight!
			</Text>
			<TouchableOpacity
				style={styles.buttonGroup}
				onPress={() => navigation.navigate("Home")}
			>
				<Text style={styles.button}> Home </Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SearchingModalScreen;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignItems: "center",
	},
	darkModeMainContainer: {
		backgroundColor: "#2B3642",
	},
	darkModeTextColor: {
		color: "black",
	},
	title: {
		fontSize: 20,
		padding: 20,
		paddingTop: 40,
		textAlign: "center",
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 20,
	},
	button: {
		backgroundColor: "#6D6B8F",
		textAlign: "center",
		padding: 10,
		width: 130,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#0E1A28",
	},
});
