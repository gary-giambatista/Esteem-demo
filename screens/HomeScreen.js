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
					<Ionicons
						name="ios-chatbubble-ellipses-sharp"
						size={30}
						color="#FA423B"
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.pageTitleContainer}>
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
		paddingTop: 20,
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
	pageTitleContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 15,
		borderBottomWidth: 1,
		borderBottomColor: "grey",
	},
	pageTitle: {
		fontFamily: "quicksand-semi",
		fontSize: 30,
		marginBottom: 15,
		// backgroundColor: "#ffffff",
	},
	cardShadow: {
		shadowColor: "000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});
