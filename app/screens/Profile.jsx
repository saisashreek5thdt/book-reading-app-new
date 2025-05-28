import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

export default function Profile() {
  const { theme, setTheme, currentTheme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
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
                  borderColor: theme === mode ? colors.BLACK : currentTheme.btnBG
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
    textTransform: 'capitalize'
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
});
