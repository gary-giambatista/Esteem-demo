import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useAuth } from "./hooks/useAuth";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import QuestionScreen from "./screens/QuestionScreen";

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
					</Stack.Group>
				</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
