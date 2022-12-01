import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { useAuth } from "../hooks/useAuth";

const ChatRow = ({ matchDetails }) => {
	const navigation = useNavigation();
	const { user } = useAuth();

	//in my case, the 2nd user in users[1] will always be the partner (and not the active user), so I can get(maybe query?) the users collection for that users photURL.
	return (
		<TouchableOpacity>
			<Text>testing</Text>
		</TouchableOpacity>
	);
};

export default ChatRow;
