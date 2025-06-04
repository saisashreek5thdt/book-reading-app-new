// ./screens/Tabs.jsx
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookDetail from "../components/BookDetail";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";
import AppInfo from "./AppInfo";
import Bookmark from "./Bookmark";
import BookRead from "./BookRead";
import Categories from "./Categories";
import Home from "./Home";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
      <Stack.Screen name="BookRead" component={BookRead} />
    </Stack.Navigator>
  );
}

export function Tabs() {
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
        tabBarActiveTintColor:
          theme === "dark" ? currentTheme.tabActive : colors.PRIMARY,
        tabBarInactiveTintColor:
          theme === "dark" ? currentTheme.tabInActive : colors.tabDarkBG,
        tabBarLabelStyle: {
          fontFamily: "Quicksand-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
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
      <Tab.Screen
        name="Info"
        component={AppInfo}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
