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
		console.log("there are no matches at the moment!");
		navigation.navigate("Searching");
	};
	const pickSide = (side) => {
		setSide(side);
	};
	const submitView = async () => {
		// await addAnswer();
		//return false to symbolize no match
		findMatch();
		//return true to symbolize match
		//use true/false to trigger different modal

		console.log("Congrats! You submitted your view!");
	};

	//don't forget TIMESTAMPS*

	//create an answer
	// timestamp = timestamp
	// user = user.uid
	// set matched === false
	// side === side(true/false)
	// description = view
	// question(*REF) === params.details.id
	const addAnswer = async () => {
		let docRef;
		//setSubmitted(true); remember to add submitted: submitted into the create below
		if (side === true) {
			const docRef = await addDoc(
				collection(db, "questions", params.details.id, "answerAgree"),
				{
					timestamp: serverTimestamp(),
					user: user.uid,
					matched: false,
					desc: view,
					side: side,
				}
			);
			console.log("Document written with ID: ", docRef.id);
		} else {
			const docRef = await addDoc(
				collection(db, "questions", params.details.id, "answerDisagree"),
				{
					timestamp: serverTimestamp(),
					user: user.uid,
					matched: false,
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

	// matching logic
	// where to call the matching function? within the addAnswer function?

	const findMatch = async () => {
		if (side === true) {
			const disagreeQuery = query(
				collection(db, "questions", params.details.id, "answerDisagree"),
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
						params.details.id,
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
				collection(db, "questions", params.details.id, "answerAgree"),
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
					doc(db, "questions", params.details.id, "answerAgree", queryAnswerId),
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
				user1: user.uid,
				user2: queryData.user,
				user1Side: side,
				user2Side: queryData.side,
				answer1: view,
				answer2: queryData.desc,
			});
			console.log("Document written with ID: ", matchRef.id);
			//create messages sub-collection
			if (matchRef) {
				const message1Ref = await addDoc(
					collection(db, "conversations", matchRef.id, "messages"),
					{
						timestamp: serverTimestamp(),
						user: user.uid,
						side: side,
						message: view,
					}
				);
				console.log("Document written with ID: ", message1Ref.id);
				const message2Ref = await addDoc(
					collection(db, "conversations", matchRef.id, "messages"),
					{
						timestamp: serverTimestamp(),
						user: queryData.user,
						side: queryData.side,
						message: queryData.desc,
					}
				);
				console.log("Document written with ID: ", message2Ref.id);
			}
		}
		return console.log("conversation and messages created!");
	};
	//1 test if no-match if clause works on findMatch()
	//add modals for 2 outcomes below
	// add a modal screen onSubmit > modal checks if match exists > if so match screen which redirects to chat >  if not > different message which redirects to home

	// QUERY
	// if statement: if (side === true) {specific query}
	// check opposing side's question(params.details.id)>!answerSIDE>matched==false

	//CREATE conversation
	// user1 == user.uid (active user)
	// user2 == questions > answerAgree/answeDisagree userId
	// question >> should be part of the query using questionId
	// answer1 == view
	// answer2 == questions > answerAgree/answeDisagree desc
	// 2nd db call to create SUB collection: messages
	//

	// then
	// KEEP in mind, references probably need to be separate DB calls
	//^^ possible create initially in answer and store in a varaible to avoid multiple db calls for the same variable
	//create collection: conversations
	// user1 == user.uid (active user)
	// user2 == questions > answerAgree/answeDisagree userId
	// question == params.details.id
	// answer 1 == view
	// answer 2 == questions > answerAgree/answeDisagree desc
	// 2nd db call to create SUB collection: messages
	//messages hold
	// answer 1 **store here or in messages collection???
	// answer 2 **probably here...

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title={params.details.title} />
			<Text style={styles.title}>{params.details.title}</Text>
			<Text style={styles.description}>{params.details.description}</Text>
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
