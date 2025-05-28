import { ScrollView, StyleSheet, View } from "react-native";
import BookCard from "./BookCard";

export default function Book() {
  return (
    <View style={styles.bookContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BookCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    margin: 8,
  },
});
