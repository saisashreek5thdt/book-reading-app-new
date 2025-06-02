import { StyleSheet, Text, View } from "react-native";

import Constants from "expo-constants";

export default function AppInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>App Name: {Constants.expoConfig.name}</Text>
      <Text style={styles.text}>Version: {Constants.expoConfig.version}</Text>
      <Text style={styles.text}>
        Build Number:{" "}
        {Constants.expoConfig.ios?.buildNumber ||
          Constants.expoConfig.android?.versionCode}
      </Text>
      <Text style={styles.text}>
        Build Type: {__DEV__ ? "Development" : "Production"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "flex-start",
    backgroundColor: "#E8F9FF",
  },
  text: { 
    fontFamily: "Quicksand-Bold",
    fontSize: 16, 
    marginBottom: 10,
    color: "#F26B0F"
  },
});
