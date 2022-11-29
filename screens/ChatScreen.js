import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";

const ChatScreen = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView>
			<Header title="Messages" />
			<ChatList />
			<Text>ChatScreen</Text>
		</SafeAreaView>
	);
};

export default ChatScreen;
