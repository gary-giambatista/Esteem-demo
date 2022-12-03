import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ReceiverMessage = ({ message, matchDetails }) => {
	return (
		<View style={styles.messageContainer}>
			<Image
				stlye={styles.photoURL}
				source={
					matchDetails.userIds[0] === user.uid
						? { uri: matchDetails?.user0PhotoURL }
						: { uri: matchDetails?.user1PhotoURL }
				}
			/>
			<Text style={{ color: "white" }}>{message.message}</Text>
		</View>
	);
};

export default ReceiverMessage;

const styles = StyleSheet.create({
	messageContainer: {
		alignSelf: "flex-start",
		backgroundColor: message.side ? "green" : "red",
		padding: 10,
		margin: 10,
		flexDirection: "row",
		borderRadius: 10,
		borderTopLeftRadius: "none",
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
