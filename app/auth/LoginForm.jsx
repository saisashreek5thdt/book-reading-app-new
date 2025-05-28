import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../utils/theme";

export default function LoginForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { currentTheme } = useTheme();

  const handleLogin = () => {
    // Demo: basic hardcoded login check
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      setError("");
      navigation.navigate("Main");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.formBG }]}>
      <Text style={[styles.title, { color: currentTheme.formTitle }]}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={ currentTheme.formTitle }
        style={[styles.input, { backgroundColor: currentTheme.background }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: currentTheme.background },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={ currentTheme.formTitle }
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color={currentTheme.formTitle}
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>
          Don&apos;t have an account? Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Text style={styles.registerText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontFamily: "Montserrat-Medium",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
  button: {
    backgroundColor: "#57C5B6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat-Medium",
  },
  registerText: {
    color: "#1E90FF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Montserrat-Medium",
  },
});
