import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome({ navigation }) {
  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasSeenWelcome", "false");
    navigation.replace("Login");
  };

  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Image
        source={require("../../assets/images/book.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>Book Reading App</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleGetStarted}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F4F4F",
    marginBottom: 20,
    fontFamily: "Montserrat-Medium",
  },
  button: {
    backgroundColor: "#FFD1DC", // pastel rose
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#4F4F4F",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Quicksand-Bold",
  },
});
