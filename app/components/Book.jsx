// import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BookCard from "./BookCard";

export default function Book({ books = [], navigation }) {
  // console.log("Books received:", books); // 👈 Add this
  // const navigation = useNavigation();

  if (books.length === 0) {
    return <Text style={{ marginLeft: 20 }}>No books to show</Text>;
  }
  return (
    <View style={styles.bookContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* <BookCard /> */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            coverImage={book.coverImage}
            onPress={() =>
              navigation.navigate("BookDetail", {
                book: book,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    margin: 8,
  },
});
