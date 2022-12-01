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

const SearchingModalScreen = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1, alignItems: "center" }}>
			<Text style={styles.title}>
				{" "}
				Congratulations, you found a chat partner!
			</Text>
			<Text style={styles.title}>Thank you for submitting your view!</Text>
			<TouchableOpacity
				style={styles.buttonGroup}
				onPress={() => navigation.navigate("Chat")}
			>
				<Text style={styles.button}> Chat now! </Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SearchingModalScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		padding: 20,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 20,
	},
	button: {
		textAlign: "center",
		padding: 10,
		width: 130,
		borderRadius: 10,
		borderWidth: 1,
	},
});
