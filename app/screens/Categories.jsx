import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  "All",
  "Biography",
  "Children",
  "Fantasy",
  "Fiction",
  "Horror",
  "Mystery",
];

const mockStories = [
  {
    id: "1",
    title: "The Wizard's Tower",
    category: "Fantasy",
  },
  {
    id: "2",
    title: "Haunted Nights",
    category: "Horror",
  },
  {
    id: "3",
    title: "The Young Hero",
    category: "Children",
  },
  {
    id: "4",
    title: "Life of Tesla",
    category: "Biography",
  },
  {
    id: "5",
    title: "Fantasy World",
    category: "Fantasy",
  },
];

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredStories, setFilteredStories] = useState([]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStories(mockStories);
    } else {
      const filtered = mockStories.filter(
        (story) => story.category === selectedCategory
      );
      setFilteredStories(filtered);
    }
  }, [selectedCategory]);

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

  const renderStory = ({ item }) => (
    <View style={styles.storyCard}>
      <Text style={styles.storyTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategory(item)}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {filteredStories.length === 0 ? (
        <Text style={styles.noStoriesText}>
          No stories found for <Text style={{ fontWeight: "bold" }}>{selectedCategory}</Text>.
        </Text>
      ) : (
        <FlatList
          data={filteredStories}
          keyExtractor={(item) => item.id}
          renderItem={renderStory}
          contentContainerStyle={styles.storyList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  storyCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noStoriesText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 40,
  },
  storyList: {
    paddingBottom: 40,
  },
});
