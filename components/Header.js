import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({ title, goBack }) => {
	const navigation = useNavigation();

	return (
		<View style={[styles.headerContainer, styles.cardShadow]}>
			<View style={styles.backAndTitleContainer}>
				<TouchableOpacity
					onPress={
						goBack
							? () => navigation.goBack()
							: () => navigation.navigate("Home")
					}
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
		backgroundColor: "white",
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
	cardShadow: {
		shadowColor: "000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});

export default Header;
