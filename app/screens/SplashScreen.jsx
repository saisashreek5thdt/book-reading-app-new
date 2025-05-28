/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkAppState = async () => {
      const hasSeenWelcome = await AsyncStorage.getItem("hasSeenWelcome");
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn"); // Assuming this flag for login

      if (isLoggedIn === "true") {
        navigation.replace("Home");
      } else if (hasSeenWelcome === "false") {
        navigation.replace("Login");
      } else {
        navigation.replace("Welcome");
      }
    };

    checkAppState();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#333" />
    </View>
  );
}
