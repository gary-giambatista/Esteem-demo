import { useNavigation } from "@react-navigation/native";
// import {
// 	collection,
// 	limit,
// 	onSnapshot,
// 	orderBy,
// 	query,
// } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const ChatRow = ({ matchDetails }) => {
	const navigation = useNavigation();
	const { user } = useAuth();

	const [lastMessage, setLastMessage] = useState("");

	// useEffect(() => {
	// 	onSnapshot(
	// 		query(
	// 			collection(db, "conversations", matchDetails.id, "messages"),
	// 			orderBy("timestamp", "desc"),
	// 			limit(1)
	// 		),
	// 		(snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
	// 	);
	// }, [db, matchDetails]);

	useEffect(() => {
		firestore()
			.collection("conversations")
			.doc(matchDetails.id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.limit(1)
			.get()
			.then((querySnapshot) => {
				setLastMessage(querySnapshot.docs[0]?.data()?.message);
			});
	}, [matchDetails]);

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("Message", { matchDetails })}
			style={[styles.rowContainer, styles.cardShadow]}
		>
			<Image
				style={styles.photoURL}
				source={
					matchDetails.userIds[0] === user.uid
						? { uri: matchDetails?.user1PhotoURL }
						: { uri: matchDetails?.user0PhotoURL }
				}
			/>
			<View>
				<Text style={styles.questionTitle}>{matchDetails?.questionTitle}</Text>
				<Text>{lastMessage || "Say Hi!"}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ChatRow;

const styles = StyleSheet.create({
	rowContainer: {
		overflow: "hidden",
		padding: 10,
		paddingRight: 80,
		margin: 10,
		flexDirection: "row",
		backgroundColor: "white",
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
	photoURL: {
		borderRadius: 9999,
		height: 64,
		width: 64,
		marginRight: 16,
	},
	questionTitle: {
		lineHeight: 28,
		fontSize: 18,
		fontWeight: "bold",
	},
});
