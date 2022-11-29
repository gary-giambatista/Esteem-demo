import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
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
	const [view, setView] = useState("");
	const [side, setSide] = useState(null);

	const pickSide = (side) => {
		setSide(side);
	};
	const submitView = () => {
		addAnswer();
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
		//if (side === true) {create answerAgree collection using params.details.id to reference and create a subcollection under that question}
		const docRef = await addDoc(collection(db, "answers"), {
			timestamp: serverTimestamp(),
			user: user.uid,
			matched: false,
			side: side,
			desc: view,
			questionId: params.details.id,
		});
		console.log("Document written with ID: ", docRef.id);
	};
	//create a match here > Conversation collection
	//----
	//Option 0 -- see if quering with 3 constraints in possible
	//option .5 -- see if composite groups can allow for 3 way query (2 definitely)

	//Option #1 - use more calls if cannot (*difficult since 2 of the types are booleans)
	//make answer have a complex data type containing a map of {matched: false, side: side} ??? use an array of 0 and 1 (false and true), then sort for 1
	//isMatched function - DB call 1
	//getSide function - DB call 2

	//seems like the best option
	// Option #2 -cannot query mutliple filters, may need to make a sub-collection for unmatched side(agree) and unmatched side(disagree) (also, can take advantage of data hierarchy and only query answers under a specific question, elminating 1 of the query constaints)
	// use if statement to call a different create db function for each answer
	// ALSO** consider where the answers collection is, for #2 maybe:
	// questions > answersAgree && answersDisagree
	// each answer will hold a matched boolean, desc, and user id

	//query answers where: 3 constraints
	//  matched == false
	//  question == your question
	//  agree !== your agree

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

					<TouchableOpacity style={styles.submitButton} onPress={submitView}>
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
