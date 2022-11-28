import { useNavigation, useRoute } from "@react-navigation/native";
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

const QuestionScreen = () => {
	const { params } = useRoute();
	const [view, setView] = useState("");
	const [side, setSide] = useState(null);

	const pickSide = (side) => {
		setSide(side);
	};
	const submitView = () => {
		console.log("Congrats! You submitted your view!");
	};
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
