import { StyleSheet, Text, View } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text>Categories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
