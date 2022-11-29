import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

const ChatRow = () => {
	const navigation = useNavigation();

	return (
		<View>
			<Text>ChatRow</Text>
		</View>
	);
};

export default ChatRow;
