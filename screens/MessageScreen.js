import { useNavigation, useRoute } from "@react-navigation/native";
// import {
// 	addDoc,
// 	collection,
// 	onSnapshot,
// 	orderBy,
// 	query,
// 	serverTimestamp,
// 	where,
// } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	Button,
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	Touchable,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Header from "../components/Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const MessageScreen = () => {
	const navigation = useNavigation();
	const { user } = useAuth();
	const { params } = useRoute();

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]); //array of objects

	// FETCH MESSAGE
	// useEffect(
	// 	() =>
	// 		onSnapshot(
	// 			query(
	// 				collection(db, "conversations", params.matchDetails.id, "messages"),
	// 				orderBy("timestamp", "desc")
	// 			),
	// 			(snapshot) =>
	// 				setMessages(
	// 					snapshot.docs.map((doc) => ({
	// 						id: doc.id,
	// 						...doc.data(),
	// 					}))
	// 				)
	// 		),
	// 	[params.matchDetails, db]
	// );

	//my re-written function
	// useEffect(() => {
	// 	const fetchedMessages = firestore()
	// 		.collection("conversations")
	// 		.doc(params.matchDetails.id)
	// 		.collection("messages")
	// 		.orderBy("timestamp", "desc")
	// 		.onSnapshot((documentSnapshot) => {
	// 			setMessages(
	// 				documentSnapshot.docs.map((doc) => ({
	// 					id: doc.id,
	// 					...doc.data(),
	// 				}))
	// 			);
	// 		});
	// 	return () => fetchedMessages();
	// }, [params.matchDetails]);

	useEffect(() => {
		const unsubscribe = firestore()
			.collection("conversations")
			.doc(params.matchDetails.id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			});

		return unsubscribe;
	}, [params.matchDetails.id, firestore]);

	// Without adding some crazy logic or restructing DB, cannot pass side forwards
	//modify the ternary for messages.side in receiver/SenderMessage to just be 2 different colors
	//Flat list out and see if passing the matchDetails through to receiver message works to render the correct profile picture
	// const sendMessage = () => {
	// 	addDoc(
	// 		collection(db, "conversations", params.matchDetails.id, "messages"),
	// 		{
	// 			timestamp: serverTimestamp(),
	// 			userId: user.uid,
	// 			message: input,
	// 			side:
	// 				(messages[0].userId === user.uid && messages[0].side) ||
	// 				(messages[1].userId === user.uid && messages[1].side)
	// 					? true
	// 					: false,
	// 		}
	// 	);

	// 	setInput("");
	// };

	const sendMessage = () => {
		firestore()
			.collection("conversations")
			.doc(params.matchDetails.id)
			.collection("messages")
			.add({
				timestamp: serverTimestamp(),
				userId: user.uid,
				message: input,
				side:
					(messages[0].userId === user.uid && messages[0].side) ||
					(messages[1].userId === user.uid && messages[1].side)
						? true
						: false,
			})
			.then(() => {
				console.log("Message added!");
			});
		setInput("");
	};

	return (
		<View style={{ flex: 1 }}>
			<Header title={params.matchDetails.questionTitle} goBack={true} />
			{/* <Text>{JSON.stringify(messages)}</Text> */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"} //configure screen correctly on different device OS
				style={{ flex: 1 }}
				keyboardVerticalOffset={10}
			>
				<FlatList
					inverted={-1} //make the chat come from top down
					style={{ paddingLeft: 10 }}
					data={messages}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) =>
						item.userId === user.uid ? (
							<SenderMessage messageBubble={item} />
						) : (
							<ReceiverMessage
								messageBubble={item}
								matchDetails={params.matchDetails}
							/>
						)
					}
				/>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.messageInput}
						placeholder="Send Message..."
						onChangeText={setInput}
						onSubmitEditing={sendMessage}
						value={input}
					/>
					<Button onPress={sendMessage} title="Send" color="blue" />
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default MessageScreen;

const styles = StyleSheet.create({
	inputContainer: {
		padding: 10,
		margin: 10,
		marginBottom: 35,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "grey",
		backgroundColor: "White",
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
	messageInput: {
		lineHeight: 28,
		fontSize: 18,
		height: 40,
	},
});
