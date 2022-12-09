import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ChatList from "../components/ChatList";
import Header from "../components/Header";

const ChatScreen = () => {
	const navigation = useNavigation();

	return (
		<View>
			<Header title="Messages" goBack={false} />
			<ChatList />
		</View>
	);
};

export default ChatScreen;
