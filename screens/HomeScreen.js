import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import TopicList from "../components/TopicList";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
	const navigation = useNavigation();
	const { logOut, loading, user } = useAuth();

	return (
		<SafeAreaView stlye={{ flex: 1 }}>
			<View style={styles.HeaderContainer}>
				<TouchableOpacity onPress={logOut}>
					<Image style={styles.profilePic} source={{ uri: user.photoURL }} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image
						style={styles.logo}
						source={require("../assets/EsteemLogo.png")}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("Chat")}>
					<Ionicons name="chatbubbles-sharp" size={30} color="#275473" />
				</TouchableOpacity>
			</View>
			<View style={styles.pageTitle}>
				<Text style={styles.pageTitle}>Discussion Topics</Text>
			</View>
			<TopicList />
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	profilePic: {
		height: 40,
		width: 40,
		borderRadius: 9999,
	},
	HeaderContainer: {
		paddingLeft: 15,
		paddingRight: 15,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	logo: {
		height: 40,
		width: 40,
		//#6acdf4
	},
	pageTitle: {
		alignItems: "center",
		justifyContent: "center",
		fontSize: 30,
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: "#275473",
		fontSize: 30,
	},
});
