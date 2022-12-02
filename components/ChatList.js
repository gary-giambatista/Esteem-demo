import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
	const { user } = useAuth();
	const [matches, setMatches] = useState([]);

	//fetch matches and store to state >> use onSnapShot for live updates
	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "conversations"),
					where("userIds", "array-contains", user.uid)
				),
				(snapshot) =>
					setMatches(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[user]
	);
	// console.log(matches);

	return matches.length > 0 ? (
		//map out the ChatRow's here for each match
		<FlatList
			style={{ height: "100%" }}
			data={matches}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <ChatRow matchDetails={item} />}
		/>
	) : (
		// <Text>{matches[0].id}</Text>
		<View>
			<Text style={{ textAlign: "center" }}>No matches at the moment</Text>
		</View>
	);
};

export default ChatList;
