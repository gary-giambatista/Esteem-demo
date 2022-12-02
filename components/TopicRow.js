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
				<Text style={styles.rowDescription}>{questionDetails.description}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TopicRow;

const styles = StyleSheet.create({
	rowContainer: {
		padding: 10,
		borderBottomWidth: 1,
	},
	rowTitle: {
		fontSize: 20,
	},
});
