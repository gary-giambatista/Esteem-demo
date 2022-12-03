import { async } from "@firebase/util";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
	Button,
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Header from "../components/Header";
import { db } from "../firebaseConfig";
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

	//don't forget TIMESTAMPS*

	//create an answer
	// timestamp = timestamp
	// user = user.uid
	// set matched === false
	// side === side(true/false)
	// description = view
	// question(*REF) === params.questionDetails.id
	const addAnswer = async (didMatch) => {
		let docRef;
		//setSubmitted(true); remember to add submitted: submitted into the create below
		if (side === true) {
			const docRef = await addDoc(
				collection(db, "questions", params.questionDetails.id, "answerAgree"),
				{
					timestamp: serverTimestamp(),
					userId: user.uid,
					matchedUsersPhoto: user.photoURL,
					matched: didMatch,
					questionTitle: params.questionDetails.title,
					desc: view,
					side: side,
				}
			);
			console.log("Document written with ID: ", docRef.id);
		} else {
			const docRef = await addDoc(
				collection(
					db,
					"questions",
					params.questionDetails.id,
					"answerDisagree"
				),
				{
					timestamp: serverTimestamp(),
					userId: user.uid,
					matchedUsersPhoto: user.photoURL,
					matched: didMatch,
					questionTitle: params.questionDetails.title,
					desc: view,
					side: side,
				}
			);
			console.log("Document written with ID: ", docRef.id);
		}
	};

	//query answers where: 3 constraints
	//  matched == false
	//  question == your question
	//  agree !== your agree

	const findMatch = async () => {
		if (side === true) {
			const disagreeQuery = query(
				collection(
					db,
					"questions",
					params.questionDetails.id,
					"answerDisagree"
				),
				where("matched", "==", false),
				orderBy("timestamp", "asc"),
				limit(1)
			);
			const querySnapshot = await getDocs(disagreeQuery);

			if (querySnapshot.empty) {
				return goToSearchingModal();
				//Looking for a match modal which redirects to home
			} else {
				const queryData = querySnapshot.docs[0].data();
				const queryAnswerId = querySnapshot.docs[0].id;
				// console.log("answerID:", queryAnswerId);
				// console.log("matchData:", queryData);

				//update matched
				await updateDoc(
					doc(
						db,
						"questions",
						params.questionDetails.id,
						"answerDisagree",
						queryAnswerId
					),
					{
						matched: true,
					}
				);
				return createConversation(queryData);
			}
		} else if (side === false) {
			const agreeQuery = query(
				collection(db, "questions", params.questionDetails.id, "answerAgree"),
				where("matched", "==", false),
				orderBy("timestamp", "asc"),
				limit(1)
			);
			const querySnapshot = await getDocs(agreeQuery);
			if (querySnapshot.empty) {
				return goToSearchingModal();
				//Looking for a match modal which redirects to home
			} else {
				const queryData = querySnapshot.docs[0].data();
				const queryAnswerId = querySnapshot.docs[0].id;

				//update matched
				await updateDoc(
					doc(
						db,
						"questions",
						params.questionDetails.id,
						"answerAgree",
						queryAnswerId
					),
					{
						matched: true,
					}
				);
				return createConversation(queryData);
			}
		}
	};

	const createConversation = async (queryData) => {
		if (queryData) {
			const matchRef = await addDoc(collection(db, "conversations"), {
				timestamp: serverTimestamp(),
				userIds: [user.uid, queryData.userId],
				user0PhotoURL: user.photoURL,
				user1PhotoURL: queryData.matchedUsersPhoto,
				questionTitle: queryData.questionTitle,
			});
			console.log("Document written with ID: ", matchRef.id);
			//create messages sub-collection
			if (matchRef) {
				const message1Ref = await addDoc(
					collection(db, "conversations", matchRef.id, "messages"),
					{
						timestamp: serverTimestamp(),
						userId: user.uid,
						side: side,
						message: view,
					}
				);
				console.log("Document written with ID: ", message1Ref.id);
				const message2Ref = await addDoc(
					collection(db, "conversations", matchRef.id, "messages"),
					{
						timestamp: serverTimestamp(),
						userId: queryData.userId,
						side: queryData.side,
						message: queryData.desc,
					}
				);
				console.log("Document written with ID: ", message2Ref.id);
			}
		}
		return goToMatchModal(); //matched screen function
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title={params.questionDetails.title} goBack={false} />
			<Text style={styles.title}>{params.questionDetails.title}</Text>
			<Text style={styles.description}>
				{params.questionDetails.description}
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
					behavior={Platform.OS === "ios" ? "padding" : "height"} //configure screen correctly on different device OS
					style={{ flex: 1 }}
					keyboardVerticalOffset={10}
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
		</SafeAreaView>
	);
};

export default QuestionScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		padding: 10,
	},
	description: {
		fontSize: 15,
		padding: 10,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingTop: 20,
		paddingBottom: 20,
	},
	buttons: {
		padding: 10,
		width: 130,
		backgroundColor: "grey",
		borderRadius: 10,
	},
	agreeButton: {
		backgroundColor: "green",
	},
	disagreeButton: {
		backgroundColor: "#FF5864",
	},
	selectedButtonAgree: {
		padding: 10,
		width: 130,
		backgroundColor: "white",
		borderRadius: 10,
		borderColor: "green",
		borderWidth: 2,
	},
	selectedButtonDisagree: {
		padding: 10,
		width: 130,
		backgroundColor: "white",
		borderRadius: 10,
		borderColor: "#FF5864",
		borderWidth: 2,
	},
	buttonText: {
		fontSize: 20,
		textAlign: "center",
	},
	input: {
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
});
