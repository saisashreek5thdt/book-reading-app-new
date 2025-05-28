import { Image, StyleSheet, View } from "react-native";
import LoginForm from "../auth/LoginForm";
import { useTheme } from "../utils/theme";

export default function LoginScreen() {
  const { currentTheme } = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: currentTheme.background} ]}>
      <Image
        source={require("../../assets/images/book.jpg")}
        style={styles.image}
      />
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
