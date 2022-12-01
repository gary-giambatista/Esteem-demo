import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useAuth } from "./hooks/useAuth";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import QuestionScreen from "./screens/QuestionScreen";
import SearchingModalScreen from "./screens/SearchingModalScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user ? (
				<>
					<Stack.Group>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Questions" component={QuestionScreen} />
						<Stack.Screen name="Chat" component={ChatScreen} />
					</Stack.Group>
					<Stack.Group screenOptions={{ presentation: "modal" }}>
						<Stack.Screen name="Searching" component={SearchingModalScreen} />
					</Stack.Group>
				</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
