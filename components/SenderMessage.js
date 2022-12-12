import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SenderMessage = ({ messageBubble }) => {
	const side = messageBubble.side;

	return (
		<View
			style={[
				styles.messageContainer,
				side ? { backgroundColor: "green" } : { backgroundColor: "red" },
			]}
		>
			<Text style={{ color: "white" }}>{messageBubble.message}</Text>
		</View>
	);
};

export default SenderMessage;

const styles = StyleSheet.create({
	messageContainer: {
		alignSelf: "flex-start",
		marginLeft: "auto",
		padding: 10,
		margin: 10,
		flexDirection: "row",
		borderRadius: 10,
		borderTopRightRadius: 0,
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
