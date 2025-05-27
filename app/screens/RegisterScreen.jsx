import { Image, StyleSheet, View } from "react-native";
import RegisterForm from "../auth/RegisterForm";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/book.jpg")}
        style={styles.image}
      />
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A1E3F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 30,
    borderRadius: 12,
  },
});
