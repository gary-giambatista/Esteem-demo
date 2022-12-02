import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SenderMessage = ({ message }) => {
	return (
		<View style={styles.messageContainer}>
			<Text style={{ color: "white" }}>{message.message}</Text>
		</View>
	);
};

export default SenderMessage;

const styles = StyleSheet.create({
	messageContainer: {
		alignSelf: "flex-start",
		marginLeft: "auto",
		backgroundColor: message.side ? "green" : "red",
		padding: 10,
		margin: 10,
		flexDirection: "row",
		borderRadius: 10,
		borderTopRightRadius: "none",
	},
	photoURL: {
		height: 48,
		width: 48,
		borderRadius: 9999,
		position: "absolute",
		top: 0,
		left: -56,
	},
});
