import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({ title }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.headerContainer}>
			<View style={styles.backAndTitleContainer}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={{ padding: 5 }}
				>
					<Ionicons name="chevron-back-outline" size={34} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>{title}</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	headerContainer: {
		padding: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
	},
	backAndTitleContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: 10,
	},
});

export default Header;
