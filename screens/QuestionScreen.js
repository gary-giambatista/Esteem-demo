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

	const submitView = () => {
		console.log("Congrats! You submitted your view!");
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title={params.details.title} />
			<Text style={styles.title}>{params.details.title}</Text>
			<Text style={styles.description}>{params.details.description}</Text>
			<View style={styles.buttonGroup}>
				<TouchableOpacity style={[styles.buttons, styles.agreeButton]}>
					<Text style={styles.buttonText}>Agree</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.buttons, styles.disagreeButton]}>
					<Text style={styles.buttonText}>Disagree</Text>
				</TouchableOpacity>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"} //configure screen correctly on different device OS
				style={{ flex: 1 }}
				keyboardVerticalOffset={10}
			>
				<TextInput
					style={styles.input}
					placeholder="Write why you agree or disagree..."
					onChangeText={setView}
					onSubmitEditing={submitView} //makes cellphone return send message as well as button below
					value={view}
				/>
				<TouchableOpacity style={styles.submitButton} onPress={submitView}>
					<Text style={styles.submitText}>Submit</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
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
		padding: 10,
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
	buttonText: {
		fontSize: 20,
		textAlign: "center",
	},
	inputContainer: {
		padding: 10,
	},
	input: {
		flexDirection: "row",
		height: 40,
		fontSize: 14,
		backgroundColor: "#BFBFBF",
		borderRadius: 6,
	},
	submitButton: {
		backgroundColor: "blue",
		height: 40,
		width: 100,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	submitText: {
		fontSize: 14,
	},
});
