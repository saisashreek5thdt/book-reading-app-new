import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookCard from "../components/BookCard";


export default function CategoryScreen() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();

  // Fetch books and categories from API
  useEffect(() => {
    fetch("https://book-reading-app-api-o9ts.vercel.app/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);

        // Extract unique category names
        const allCats = [
          "All",
          ...new Set(
            data.flatMap((book) =>
              book.categories.map((cat) => cat.name)
            )
          ),
        ];
        setCategories(allCats);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter books based on selected category
  const filteredBooks = selectedCategory === "All"
    ? books
    : books.filter((book) =>
      book.categories.some((cat) => cat.name === selectedCategory)
    );

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.selectedCategoryText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderBook = ({ item }) => (
    <BookCard
      title={item.title}
      author={item.author}
      coverImage={item.coverImage}
      onPress={() =>
        // navigation.navigate("BookDetail", {
        //   book: item,
        // })
        navigation.navigate("Home", {
          screen: "BookDetail",
           params: { book: item },
        })
      }

    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>

      {/* Categories List */}
      <FlatList
        data={categories}
        renderItem={({ item }) => renderCategory(item)}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <Text style={styles.noStoriesText}>
          No books found for{" "}
          <Text style={{ fontWeight: "bold" }}>{selectedCategory}</Text>.
        </Text>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.booksGrid}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6f8ff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 10,
    height: 40,
  },
  selectedCategoryButton: {
    backgroundColor: "#f97316",
  },
  categoryText: {
    color: "#000",
    fontWeight: "600",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  booksGrid: {
    paddingBottom: 20,
  },
  noStoriesText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 40,
  },
});