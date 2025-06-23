// ./screens/BookGridView.js
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BookCard from "../components/BookCard";
import colors from "../utils/colors";

export default function BookGridView({ route }) {
  const navigation = useNavigation();
  const { title = "Books", books = [] } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color={colors.BLACK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Grid Layout */}
      <ScrollView contentContainerStyle={styles.grid}>
        {books.map((book) => (
          <View style={styles.cardWrapper} key={book.id}>
            <BookCard
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              onPress={() => navigation.navigate("BookDetail", { book })}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
});