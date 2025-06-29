/* eslint-disable no-unused-vars */
import { useNavigation } from "@react-navigation/native"; // For navigation
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import colors from "../utils/colors";

const { USER_DATA } = Constants.expoConfig.extra;

export default function EditProfileScreen() {
  const { user, authToken, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Full name is required");
      return;
    }

    setLoading(true);

    try {
      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        navigation.replace("Login");
        return;
      }
      const response = await fetch(USER_DATA, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName, mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");

        // Update local context
        await updateUser({ ...user, fullName, mobile });

        navigation.replace("Main");
      } else {
        Alert.alert("Error", data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      Alert.alert("Network Error", "Could not save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Edit Profile</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TextInput
        placeholder="Phone Number"
        value={mobile}
        onChangeText={setMobile}
        style={styles.input}
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.headerText, { color: colors.WHITE }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#57C5B6",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerButton: {
    backgroundColor: "#FF4D4D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
