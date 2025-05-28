import { Feather } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NoInternetScreen() {
  return (
    <View style={styles.container}>
      <Feather name="wifi-off" size={80} color="#666" />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please enable Wi-Fi or Mobile Data to continue.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openSettings()}
      >
        <Text style={styles.buttonText}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
    fontFamily: "Montserrat-Medium",
  },
  button: {
    backgroundColor: "#57C5B6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
});
