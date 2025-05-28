import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bookmark from "./screens/Bookmark";
import Categories from "./screens/Categories";
import ForgotScreen from "./screens/ForgotScreen";
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import Profile from "./screens/Profile";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import Welcome from "./screens/Welcome";

import colors from "./utils/colors";
import { useTheme } from "./utils/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {

   const { currentTheme, theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentTheme.tabBG,
          borderTopWidth: 1,
          borderTopColor: "#E8F9FF",
          height: 80,
          paddingTop: 4,
        },
        tabBarActiveTintColor: theme === "dark" ? currentTheme.tabActive : colors.PRIMARY,
        tabBarInactiveTintColor: theme === "dark" ? currentTheme.tabInActive : colors.tabDarkBG,
        tabBarLabelStyle: {
          fontFamily: "Quicksand-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="bookmark" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* Bottom Tabs */}
      <Stack.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
    </Stack.Navigator>
  );
}
