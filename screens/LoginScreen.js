import React from "react";
import {
	Button,
	Image,
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
	const { onGoogleButtonPress, loading } = useAuth();

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				resizeMode="cover"
				style={{ flex: 1 }}
				source={{
					uri: "https://upload.wikimedia.org/wikipedia/commons/5/57/NASA-Apollo8-Dec24-Earthrise-b.jpg",
				}}
			>
				<View style={styles.loginContainer}>
					<View style={styles.logoContainer}>
						<Image
							style={styles.logo}
							source={require("../assets/EsteemLogo.png")}
						/>
						<Text style={styles.logoText}>Esteem</Text>
					</View>
					<TouchableOpacity
						style={styles.loginButton}
						onPress={onGoogleButtonPress}
					>
						<Text
							style={{
								textAlign: "center",
								fontFamily: "quicksand-body",
								letterSpacing: 1,
							}}
						>
							{" "}
							Login{" "}
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	loginContainer: {
		display: "flex",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 100,
		// backgroundColor: "black",
		// position: "absolute",
		// top: 200,
		// marginHorizontal: "18%",
	},
	logoContainer: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		// backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
		paddingRight: 10,
	},
	logo: {
		height: 80,
		width: 80,
		// marginBottom: 50, // positioning the logo
		// marginTop: 300, // positioning the logo
	},
	logoText: {
		fontFamily: "pacifico-logo",
		fontSize: 46,
		marginLeft: 10,
		color: "white",
	},
	loginButton: {
		marginTop: 30, // position the logo and text above
		padding: 10,
		width: 208,
		borderRadius: 8,
		backgroundColor: "white",
		// position: "absolute",
		// bottom: 200,
		// marginHorizontal: "25%",
	},
});
