import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const TopicRow = ({ questionDetails }) => {
	const navigation = useNavigation();
	const { theme } = useAuth();

	return (
		<View
			style={[
				styles.rowContainer,
				theme === "dark" ? styles.darkModeRowContainer : null,
				theme === "dark" ? styles.cardShadow : null,
			]}
		>
			<TouchableOpacity
				onPress={() => navigation.navigate("Questions", { questionDetails })}
			>
				<Text
					style={[
						styles.rowTitle,
						theme === "dark" ? styles.darkModeTitle : null,
					]}
				>
					{questionDetails.title}
				</Text>
				<View style={styles.textContainer}>
					<Text
						style={[
							styles.rowDescription,
							theme === "dark" ? styles.darkModeText : null,
						]}
					>
						{questionDetails.description}
					</Text>
					<Ionicons
						name="chevron-forward-outline"
						size={34}
						color={theme === "dark" ? "#6D6B8F" : "black"}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default TopicRow;

const styles = StyleSheet.create({
	rowContainer: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#8899A6",
	},
	darkModeRowContainer: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		backgroundColor: "#0E1A28",
		borderRadius: 10,
	},
	rowTitle: {
		fontSize: 22,
		fontFamily: "quicksand-semi",
		paddingBottom: 5,
	},
	textContainer: {
		flexDirection: "row",
		paddingRight: 20,
		alignItems: "center",
	},
	rowDescription: {
		fontSize: 16,
		fontFamily: "quicksand-body",
	},
	darkModeText: {
		// color: "#8899A6",
		// color: "#6D6B8F",
		color: "#4C5F75",
	},
	darkModeTitle: {
		// color: "#1D4675",
		// color: "#4C5F75",
		// color: "#447FC2",
		color: "#8899A6",
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
