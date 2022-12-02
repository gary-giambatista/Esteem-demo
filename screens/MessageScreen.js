import { useNavigation, useRoute } from "@react-navigation/native";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
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
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Header from "../components/Header";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const MessageScreen = () => {
	const { user } = useAuth();
	const { params } = useRoute();
	//params.matchDetails (conversations db collection) props from ChatRow matchDetails
	//message is messages from fetch including initial message from creation in QuestionsScreen
	const navigation = useNavigation();

	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]); //array of objects
	//how to get the side state in message message[]?? does the flatlist remove the array, and leave a object? so ccan refference as message.side

	//FETCH MESSAGE
	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "conversations", params.matchDetails.id, "messages"),
					orderBy("timestamp", "desc")
				),
				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[params.matchDetails, db]
	);
	console.log(messages);

	//initial message WILl not have a photo url
	//fetch message > handle retreiving initial message (might need to use || since created messages will be slightly different from initial messages)
	//utilize >
	//initial photo
	// params.matchDetails.userIds[0] === user.uid
	// /? { uri: matchDetails?.user0PhotoURL }
	// : { uri: matchDetails?.user1PhotoURL }
	//initial username
	// params.matchDetails.userIds[0] === user.uid
	// /? { uri: matchDetails?.user0DisplayName }
	// : { uri: matchDetails?.user1DisplayName }
	//messages will be:
	// limit to no username, and only picture

	//message
	//timestamp
	//userId
	//initialDisplayName1 > from params(conversations collection)
	//initialDisplayName2 > from params(conversations collection)
	//displayName
	//initialPhotoURL1 > from params(conversation collection)
	//initialPhotoURL2 > from params(conversation collection)
	//photoURL
	//side

	//pass photos from params.matchDetails as props to sender/receiverMessage
	// then carry out the same ternary:
	// matchDetails.userIds[0] === user.uid
	// /? { uri: matchDetails?.user0PhotoURL }
	// : { uri: matchDetails?.user1PhotoURL }

	//add Message
	const sendMessage = () => {
		addDoc(
			collection(db, "conversations", params.matchDetails.id, "messages"),
			{
				timestamp: serverTimestamp(),
				userId: user.uid,
				message: input,
				side: side,
			}
		);

		setInput("");
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title={params.matchDetails.questionTitle} />
			<Text>MessageScreen</Text>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"} //configure screen correctly on different device OS
				style={{ flex: 1 }}
				keyboardVerticalOffset={10}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss} //when touched, hides the keyboard so the chat messages can be viewed
				>
					<FlatList
						inverted={-1} //make the chat come from top down
						style={{ paddingLeft: 10 }}
						data={messages}
						keyExtractor={(item) => item.id}
						renderItem={({ item: message }) =>
							message.userId === user.uid ? (
								<SenderMessage key={item.id} message={message} />
							) : (
								<ReceiverMessage
									key={item.id}
									message={message}
									matchDetails={params.matchDetails}
								/>
							)
						}
					/>
				</TouchableWithoutFeedback>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.messageInput}
						placeholder="Send Message..."
						onChangeText={setInput}
						onSubmitEditing={sendMessage}
						value={input}
					/>
					<Button onPress={sendMessage} title="Send" color="#FF5864" />
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default MessageScreen;

const styles = StyleSheet.create({
	inputContainer: {
		padding: 10,
		margin: 10,
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
