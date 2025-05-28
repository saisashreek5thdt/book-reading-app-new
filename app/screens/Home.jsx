import { ScrollView, StyleSheet, View } from "react-native";
import BookList from "../components/BookList";
import { useTheme } from "../utils/theme";

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <View style={{ marginTop: 20 }}>
        <ScrollView>
          <BookList title={`History`} />
          <BookList title={`Trending`} />
          <BookList title={`Recommended`} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
