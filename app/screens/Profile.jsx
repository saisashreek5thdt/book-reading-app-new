import { useNavigation } from "@react-navigation/native"; // For navigation
import Constants from "expo-constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

const { AUTH_LOGOUT } = Constants.expoConfig.extra;

export default function Profile() {
  const { theme, setTheme, currentTheme } = useTheme();
  const { logout, user } = useAuth(); // Get logout from context
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch(AUTH_LOGOUT,  {
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

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <Text style={{ color: currentTheme.text }}>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <InfoRow label="Full Name" value={user.fullName} currentTheme={currentTheme} />
      <InfoRow label="Email" value={user.email} currentTheme={currentTheme} />
      <InfoRow label="Mobile" value={user.mobile || "Not provided"} currentTheme={currentTheme} />
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

function InfoRow({ label, value, currentTheme }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: currentTheme.text }]}>{label}</Text>
      <Text style={[styles.value, { color: currentTheme.text }]}>{value}</Text>
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
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#FF4D4D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  title: {
    fontSize: 18,
    marginTop: 20,
  },
});