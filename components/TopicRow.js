import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TopicRow = ({ questionDetails }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.rowContainer}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Questions", { questionDetails })}
			>
				<Text style={styles.rowTitle}>{questionDetails.title}</Text>
				<View style={styles.textContainer}>
					<Text style={styles.rowDescription}>
						{questionDetails.description}
					</Text>
					<Ionicons name="chevron-forward-outline" size={34} color="black" />
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
		borderBottomColor: "grey",
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
});
