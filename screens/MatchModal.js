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

const MatchModal = () => {
	const navigation = useNavigation();
	const { theme } = useAuth();

	return (
		<SafeAreaView
			style={[
				styles.mainContainer,
				theme === "dark" ? styles.darkModeMainContainer : null,
			]}
		>
			<Text style={styles.title}>
				{" "}
				Congratulations, you found a chat partner!
			</Text>
			<Text style={styles.title}>
				Now it's time to chat, and learn about why your partner disagrees.
				Remember to be nice, please!
			</Text>
			<TouchableOpacity
				style={styles.buttonGroup}
				onPress={() => navigation.navigate("Chat")}
			>
				<Text style={styles.button}> Chat now! </Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default MatchModal;

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
		textAlign: "center",
		fontSize: 20,
		padding: 20,
		paddingTop: 40,
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
