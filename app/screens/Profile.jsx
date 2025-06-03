import { useNavigation } from "@react-navigation/native"; // For navigation
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

export default function Profile() {
  const { theme, setTheme, currentTheme } = useTheme();
  const { logout, user } = useAuth(); // Get logout from context
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("https://book-reading-app-api-o9ts.vercel.app/api/auth/logout", {
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
      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
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
  editButton: {
    marginTop: 20,
    backgroundColor: "#57C5B6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
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


// import { useNavigation } from "@react-navigation/native";
// import * as SecureStore from "expo-secure-store";
// import { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useAuth } from "../context/AuthContext"; // ✅ Correct import

// export default function Profile() {
//   const { user, login } = useAuth(); // ✅ Using useAuth
//   const navigation = useNavigation();
//   const { logout } = useAuth();
//   const [fullName, setFullName] = useState(user?.fullName || "");
//   const [mobile, setMobile] = useState(user?.mobile || "");
//   const [loading, setLoading] = useState(false);

//   const handleSave = async () => {
//     if (!fullName.trim()) {
//       Alert.alert("Error", "Full name is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = await SecureStore.getItemAsync("authToken");

//       const response = await fetch("https://book-reading-app-api-o9ts.vercel.app/api/user",  {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ fullName, mobile }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "Profile updated successfully");

//         // Update local state + re-login to refresh context
//         const updatedUser = { ...user, fullName, mobile };
//         await login(token, updatedUser);

//         navigation.goBack();
//       } else {
//         Alert.alert("Error", data.message || "Failed to update profile.");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//       Alert.alert("Network error", "Could not save changes.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//      // ✅ Move inside function or pass from top
//     await logout();
//     navigation.replace("Login");
//   };

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text>No user found. Please log in again.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Full Name */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput
//           style={styles.input}
//           value={fullName}
//           onChangeText={setFullName}
//           placeholder="Enter full name"
//         />
//       </View>

//       {/* Mobile */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           value={mobile}
//           onChangeText={setMobile}
//           placeholder="Enter phone number"
//           keyboardType="phone-pad"
//         />
//       </View>

//       {/* Email (read-only) */}
//       <View style={styles.fieldContainer}>
//         <Text style={styles.label}>Email</Text>
//         <Text style={styles.readOnly}>{user.email}</Text>
//       </View>

//       {/* Save Button */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         )}
//       </TouchableOpacity>

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   fieldContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "500",
//     marginBottom: 5,
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//   },
//   readOnly: {
//     fontSize: 16,
//     color: "#555",
//     paddingVertical: 10,
//   },
//   saveButton: {
//     backgroundColor: "#FF6F61",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   logoutButton: {
//     backgroundColor: "#FF4D4D",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   logoutText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
