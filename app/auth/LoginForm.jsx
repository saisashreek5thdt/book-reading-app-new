/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../utils/theme";

const { AUTH_LOGIN } = Constants.expoConfig.extra;

export default function LoginForm() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const { currentTheme } = useTheme();

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      if (token && !isRedirecting) {
        setIsRedirecting(true);
        navigation.replace("Main");
      }
    } catch (err) {
      console.error("Auth check error:", err);
    }
  };

  const handleLogin = async () => {
    if (locked) {
      setError("Too many attempts. Try again after 30 seconds.");
      return;
    }

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(AUTH_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginAttempts((prev) => {
          const newCount = prev + 1;
          if (newCount >= 5) {
            setLocked(true);
            setTimeout(() => {
              setLocked(false);
              setLoginAttempts(0);
            }, 30000);
          }
          return newCount;
        });

        setError(data?.error || data?.message || "Login failed");
        setLoading(false);
        return;
      }

      const { token, user } = data;

      if (!token || !user) {
        setError("Login failed: no token or user data received");
        setLoading(false);
        return;
      }

      await login(token, user); // ✅ Handles both SecureStore and state
      navigation.replace("Main");

    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering form if already authenticated
  if (isRedirecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#57C5B6" />
        <Text style={{ marginTop: 10, color: "#57C5B6" }}>Redirecting...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.formBG }]}>
      <Text style={[styles.title, { color: currentTheme.formTitle }]}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={currentTheme.formTitle}
        style={[styles.input, { backgroundColor: currentTheme.background }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={[styles.passwordContainer, { backgroundColor: currentTheme.background }]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={currentTheme.formTitle}
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Don&apos;t have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Text style={styles.registerText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});