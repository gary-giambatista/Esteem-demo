import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const ReceiverMessage = ({ messageBubble, matchDetails }) => {
	const { user } = useAuth();
	const side = messageBubble.side;

	// console.log(matchDetails.user0PhotoURL);
	return (
		<View style={{ flexDirection: "row" }}>
			<Image
				style={styles.what}
				source={
					matchDetails.userIds[0] === user.uid
						? { uri: matchDetails?.user1PhotoURL }
						: { uri: matchDetails?.user0PhotoURL }
				}
				// source={require("../assets/favicon.png")}
			/>
			<View
				style={[
					styles.messageContainer,
					side ? { backgroundColor: "green" } : { backgroundColor: "red" },
				]}
			>
				<Text style={{ color: "white" }}>{messageBubble.message}</Text>
			</View>
		</View>
	);
};
export default ReceiverMessage;

const styles = StyleSheet.create({
	messageContainer: {
		alignSelf: "flex-start",
		backgroundColor: "green",
		padding: 10,
		margin: 10,
		flexDirection: "row",
		borderRadius: 10,
		borderTopLeftRadius: 0,
	},
	what: {
		height: 48,
		width: 48,
		borderRadius: 9999,
		backgroundColor: "black",
		// position: "absolute",
		// top: 0,
		// left: -56,
	},
});
