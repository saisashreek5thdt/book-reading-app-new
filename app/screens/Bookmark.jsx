import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useBookmarks } from "../utils/BookMarkContext";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

const Bookmark = () => {
  const { currentTheme } = useTheme();
  const { bookmarks, removeBookmark, fetchBookmarks } = useBookmarks();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchBookmarks(); // Fetch fresh data
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.bookmarkContainer,
        { backgroundColor: currentTheme.background },
      ]}
    >
      {bookmarks.length === 0 ? (
        <Text style={styles.empty}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // Safely skip invalid items
            if (!item.book) return null;

            return (
              <TouchableOpacity
                style={styles.bookCard}
                onPress={() =>
                  navigation.navigate("Main", {
                    screen: "Home",
                    params: {
                      screen: "BookDetail",
                      params: { book: item.book },
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item.book.coverImage }}
                  style={styles.bookImage}
                />
                <View style={styles.info}>
                  <Text style={styles.title}>{item.book.title}</Text>
                  <Text style={styles.author}>by {item.book.author}</Text>
                  <Text style={styles.progress}>
                    Progress: {item.progress ?? 0}% read
                  </Text>
                  
                  <TouchableOpacity
                    onPress={() => removeBookmark(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.PRIMARY]} // Android only
              tintColor={colors.PRIMARY} // iOS only
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  bookmarkContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: colors.TEXT,
  },
  bookCard: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: colors.CARD,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.TEXT,
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
  progress: {
    marginTop: 6,
    fontSize: 13,
    color: colors.PRIMARY,
  },
  removeButton: {
    marginTop: 8,
  },
  removeText: {
    color: "red",
    fontSize: 12,
  },
});