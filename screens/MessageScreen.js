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
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";

const MessageScreen = () => {
	const navigation = useNavigation();
	const { user } = useAuth();
	const { params } = useRoute();

	return (
		<SafeAreaView>
			<Header title={params.matchDetails.questionTitle} goBack={true} />
			<Text>MessageScreen</Text>
		</SafeAreaView>
	);
};

export default MessageScreen;
