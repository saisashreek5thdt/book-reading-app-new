import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

// Import Screens
import ForgotScreen from "./screens/ForgotScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import { Tabs } from "./screens/Tabs"; // Make sure this exports correctly
import Welcome from "./screens/Welcome";

// Context
import { useAuth } from "./context/AuthContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { authToken, checkingAuth } = useAuth();

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={authToken ? "Main" : "Splash"} // Dynamic route name
      screenOptions={{ headerShown: false }}
    >
      {/* Always render all screens */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}