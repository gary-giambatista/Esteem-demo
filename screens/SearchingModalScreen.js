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
			<Text style={styles.title}>Thank you for submitting your view!</Text>
			<ActivityIndicator size="large" />
			<Text style={styles.title}>
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
		textAlign: "center",
		padding: 10,
		width: 130,
		borderRadius: 10,
		borderWidth: 1,
	},
});
