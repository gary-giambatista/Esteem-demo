import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Button,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
	const { logOut, loading, user } = useAuth();
	console.log("user", user);
	return (
		<SafeAreaView stlye={{ flex: 1 }}>
			<Image style={styles.profilePic} source={user.photoURL} />
			<Text> This is the Home Screen</Text>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	profilePic: {
		height: 30,
		width: 30,
		borderWidth: 3,
		borderColor: "#000000",
	},
});
