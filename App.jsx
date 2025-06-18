import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "./app/context/AuthContext";
import RootNavigator from "./app/RootNavigator";
import NoInternetScreen from "./app/screens/NoInternet";
import { BookmarkProvider } from "./app/utils/BookMarkContext";
import { ThemeProvider } from "./app/utils/theme";

import Constants from "expo-constants";

const { AUTH_LOGIN, AUTH_REGISTER, CATE_DATA, AUTH_LOGOUT, USER_DATA } =
  Constants.expoConfig.extra;

console.log("AUTH_LOGIN:", AUTH_LOGIN);
console.log("AUTH_REGISTER:", AUTH_REGISTER);
console.log("CATE_DATA:", CATE_DATA);
console.log("AUTH_LOGOUT:", AUTH_LOGOUT);
console.log("USER_DATA:", USER_DATA);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer>
              <StatusBar style="auto" />
              {isConnected ? <RootNavigator /> : <NoInternetScreen />}
            </NavigationContainer>
          </View>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
  },
});
