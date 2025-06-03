// ./screens/Tabs.jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";
import AppInfo from "./AppInfo";
import Bookmark from "./Bookmark";
import Categories from "./Categories";
import Home from "./Home";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

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

export default Tabs; // Ensure this line exists