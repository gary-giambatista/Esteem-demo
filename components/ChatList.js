import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const ChatList = () => {
	const { user } = useAuth();
	const [matches, setMatches] = useState(null);

	//fetch matches and store to state

	return (
		<View>
			<Text>ChatList</Text>
			<FlatList
			//returns <ChatRow />
			/>
		</View>
	);
};

export default ChatList;
