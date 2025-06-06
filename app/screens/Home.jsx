// screens/Home.js or App.js
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BookList from "../components/BookList";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

import Constants from "expo-constants";
const { CATE_DATA } = Constants.expoConfig.extra;

export default function Home() {
  const { currentTheme } = useTheme();
  const [data, setData] = useState({
    trending: [],
    recommended: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CATE_DATA);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        // console.log("API Response:", result.trending);
        setData({
          trending: result.trending || [],
          recommended: result.recommended || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <BookList title="Trending" books={data.trending} />
      <BookList title="Recommended" books={data.recommended} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
