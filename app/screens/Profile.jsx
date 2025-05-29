import { useNavigation } from "@react-navigation/native"; // For navigation
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

export default function Profile() {
  const { theme, setTheme, currentTheme } = useTheme();
  const { logout } = useAuth(); // Get logout from context
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("https://book-reading-app-api-o9ts.vercel.app/api/auth/logout ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // "Logout successful"
        await logout(); // Clear token from context & SecureStore
        navigation.replace("Login"); // Navigate to Login screen
      } else {
        console.error("Logout failed:", data?.error || "Unknown error");
      }
    } catch (err) {
      console.error("Logout network error:", err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>
        Theme: {theme}
      </Text>

      <View style={styles.buttonGroup}>
        {["light", "dark", "system"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.button,
              {
                backgroundColor:
                  theme === mode ? colors.PRIMARY : currentTheme.background,
                borderColor: theme === mode ? colors.BLACK : currentTheme.btnBG,
              },
            ]}
            onPress={() => setTheme(mode)}
          >
            <Text
              style={{
                color: theme === mode ? colors.WHITE : currentTheme.text,
                fontFamily: "Montserrat-Bold",
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF4D4D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
});