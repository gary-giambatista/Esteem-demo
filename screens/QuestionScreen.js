import { async } from "@firebase/util";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
// import {
// 	addDoc,
// 	collection,
// 	doc,
// 	getDoc,
// 	getDocs,
// 	limit,
// 	onSnapshot,
// 	orderBy,
// 	query,
// 	serverTimestamp,
// 	setDoc,
// 	updateDoc,
// 	where,
// } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	Button,
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Header from "../components/Header";
// import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const QuestionScreen = () => {
	const { user } = useAuth();
	const { params } = useRoute();
	const navigation = useNavigation();
	//state
	const [view, setView] = useState("");
	const [side, setSide] = useState(null);
	//const [submitted, setSubmitted] = useState(null);  use to enforce only 1 submit at a time
	//for settings the limit to 1, use setDoc instead of addDoc!

	//helper functions
	const goToSearchingModal = () => {
		addAnswer(false);
		console.log("there are no matches at the moment!");
		navigation.navigate("Searching");
	};
	const goToMatchModal = () => {
		addAnswer(true);
		console.log("conversation and messages created!");
		navigation.navigate("Match");
	};
	const pickSide = (side) => {
		setSide(side);
	};
	const submitView = async () => {
		findMatch();
		console.log("Congrats! You submitted your view!");
	};

	const addAnswer = async (didMatch) => {
		let docRef;
		//setSubmitted(true); remember to add submitted: submitted into the create below
		if (side === true) {
			const docRef = await firestore()
				.collection("questions")
				.doc(params.questionDetails.id)
				.collection("answerAgree")
				.add({
					timestamp: firestore.FieldValue.serverTimestamp(),
					userId: user.uid,
					matchedUsersPhoto: user.photoURL,
					matched: didMatch,
					questionTitle: params.questionDetails.title,
					desc: view,
					side: side,
				});
			const docID = docRef.id;
			console.log("Document written in answerAgree with ID: ", docID);
		} else {
			const docRef = firestore()
				.collection("questions")
				.doc(params.questionDetails.id)
				.collection("answerDisagree")
				.add({
					timestamp: firestore.FieldValue.serverTimestamp(),
					userId: user.uid,
					matchedUsersPhoto: user.photoURL,
					matched: didMatch,
					questionTitle: params.questionDetails.title,
					desc: view,
					side: side,
				});
			const docID = docRef.id;
			console.log("Document written in answerDisagree with ID: ", docRef);
		}
	};
	//1st function called
	const findMatch = async () => {
		let noMatch;
		let queryData;
		let queryAnswerId;
		if (side === true) {
			const disagreeQuery = await firestore()
				.collection("questions")
				.doc(params.questionDetails.id)
				.collection("answerDisagree")
				// Filter results
				.where("matched", "==", false)
				.orderBy("timestamp", "asc")
				.limit(1)
				.get()
				.then((querySnapshot) => {
					noMatch = querySnapshot.empty;
					console.log(noMatch);

					querySnapshot.forEach((documentSnapshot) => {
						(queryAnswerId = documentSnapshot.id),
							(queryData = documentSnapshot.data());
					});
				});

			if (noMatch) {
				return goToSearchingModal();
				//Looking for a match modal which redirects to home
			} else {
				// console.log("answerID:", queryAnswerId);
				// console.log("matchData:", queryData);

				//update matched
				await firestore()
					.collection("questions")
					.doc(params.questionDetails.id)
					.collection("answerDisagree")
					.doc(queryAnswerId)
					.update({
						matched: true,
					})
					.then(() => {
						console.log("answerDisagree updated!");
					});
				return createConversation(queryData);
			}
		} else if (side === false) {
			const agreeQuery = await firestore()
				.collection("questions")
				.doc(params.questionDetails.id)
				.collection("answerAgree")
				// Filter results
				.where("matched", "==", false)
				.orderBy("timestamp", "asc")
				.limit(1)
				.get()
				.then((querySnapshot) => {
					noMatch = querySnapshot.empty;
					console.log(noMatch);

					querySnapshot.forEach((documentSnapshot) => {
						(queryAnswerId = documentSnapshot.id),
							(queryData = documentSnapshot.data());
					});
				});

			if (noMatch) {
				return goToSearchingModal();
				//Looking for a match modal which redirects to home
			} else {
				// console.log("answerID:", queryAnswerId);
				// console.log("matchData:", queryData);

				//update matched
				await firestore()
					.collection("questions")
					.doc(params.questionDetails.id)
					.collection("answerAgree")
					.doc(queryAnswerId)
					.update({
						matched: true,
					})
					.then(() => {
						console.log("answerAgree updated!");
					});
				return createConversation(queryData);
			}
		}
	};

	const createConversation = async (queryData) => {
		if (queryData) {
			const matchRef = await firestore()
				.collection("conversations")
				.add({
					timestamp: firestore.FieldValue.serverTimestamp(),
					userIds: [user.uid, queryData.userId],
					user0PhotoURL: user.photoURL,
					user1PhotoURL: queryData.matchedUsersPhoto,
					questionTitle: queryData.questionTitle,
				});
			console.log("Document written in conversations with ID: ", matchRef.id);
			//create messages sub-collection
			if (matchRef) {
				const message1Ref = await firestore()
					.collection("conversations")
					.doc(matchRef.id)
					.collection("messages")
					.add({
						timestamp: firestore.FieldValue.serverTimestamp(),
						userId: user.uid,
						side: side,
						message: view,
					});
				console.log(
					"Document written in messages(m1) with ID: ",
					message1Ref.id
				);
				const message2Ref = await firestore()
					.collection("conversations")
					.doc(matchRef.id)
					.collection("messages")
					.add({
						timestamp: firestore.FieldValue.serverTimestamp(),
						userId: queryData.userId,
						side: queryData.side,
						message: queryData.desc,
					});
				console.log(
					"Document written in messages(m2) with ID: ",
					message2Ref.id
				);
			}
		}
		return goToMatchModal(); //matched screen function
	};

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			keyboardShouldPersistTaps="handled"
			style={{ flex: 1 }}
		>
			<Header title="More Topics" goBack={false} />
			<View style={[styles.questionContainer, styles.cardShadow]}>
				<Text style={styles.title}>{params.questionDetails.title}</Text>
				<Text style={styles.description}>
					{params.questionDetails.description}
				</Text>
			</View>
			<Text style={styles.callToAction}>
				What do you think?{"\n"} Pick and side and find a partner to discuss!
			</Text>
			<View style={styles.buttonGroup}>
				<TouchableOpacity
					style={
						side === true && !null
							? styles.selectedButtonAgree
							: [styles.buttons, styles.agreeButton]
					}
					onPress={() => pickSide(true)}
				>
					<Text style={styles.buttonText}>Agree</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						side === false && !null
							? styles.selectedButtonDisagree
							: [styles.buttons, styles.disagreeButton]
					}
					onPress={() => pickSide(false)}
				>
					<Text style={styles.buttonText}>Disagree</Text>
				</TouchableOpacity>
			</View>
			{side !== null ? (
				<KeyboardAvoidingView
					// behavior={Platform.OS === "ios" ? "padding" : "height"} //configure screen correctly on different device OS **DOESN't WORK for andriod**
					style={{ flex: 1 }}
					// keyboardVerticalOffset={10}
				>
					<TextInput
						multiline={true}
						numberOfLines={5}
						style={styles.input}
						placeholder={
							side === true && !null
								? "Write why you agree..."
								: "Write why you disagree..."
						}
						onChangeText={setView}
						onSubmitEditing={submitView} //makes cellphone return send message as well as button below
						value={view}
					/>

					<TouchableOpacity
						style={styles.submitButton}
						onPress={submitView}
						//disabled={submitted}
					>
						<Text style={styles.submitText}>Submit</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			) : null}
		</ScrollView>
	);
};

export default QuestionScreen;

const styles = StyleSheet.create({
	questionContainer: {
		margin: 10,
		backgroundColor: "white",
	},
	title: {
		padding: 20,
		paddingTop: 30,
		paddingBottom: 0,
		fontSize: 25,
		fontFamily: "quicksand-semi",
		// borderWidth: 1,
		// borderBottomColor: "grey",
	},
	description: {
		padding: 20,
		fontSize: 18,
		fontFamily: "quicksand-body",
	},
	callToAction: {
		padding: 20,
		paddingTop: 10,
		fontSize: 14,
		fontFamily: "quicksand-body",
		textAlign: "center",
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 20,
	},
	buttons: {
		padding: 10,
		width: 150,
		backgroundColor: "grey",
		borderRadius: 200,
	},
	agreeButton: {
		backgroundColor: "#039E43",
	},
	disagreeButton: {
		backgroundColor: "#FF5D52",
	},
	selectedButtonAgree: {
		padding: 10,
		width: 150,
		backgroundColor: "white",
		borderRadius: 200,
		borderColor: "#039E43",
		borderWidth: 2,
	},
	selectedButtonDisagree: {
		padding: 10,
		width: 150,
		backgroundColor: "white",
		borderRadius: 200,
		borderColor: "#FF5D52",
		borderWidth: 2,
	},
	buttonText: {
		fontSize: 20,
		textAlign: "center",
		fontFamily: "quicksand-body",
	},
	input: {
		textAlignVertical: "top",
		padding: 10,
		paddingTop: 10,
		marginBottom: 10,
		marginTop: 10,
		flexDirection: "row",
		height: 100,
		fontSize: 14,
		borderColor: "#BFBFBF",
		borderWidth: 1,
		borderRadius: 6,
		marginRight: 10,
		marginLeft: 10,
	},
	submitButton: {
		margin: 10,
		marginLeft: "auto",
		backgroundColor: "#212121",
		height: 40,
		width: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	submitText: {
		color: "white",
		fontSize: 16,
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
