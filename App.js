import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
	return (
		<NavigationContainer>
			<AuthContextProvider>
				<StackNavigator />
			</AuthContextProvider>
		</NavigationContainer>
	);
}
