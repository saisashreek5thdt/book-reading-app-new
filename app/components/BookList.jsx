import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../utils/theme";
import Book from "./Book";

export default function BookList({ title, books }) {
  const { currentTheme } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: currentTheme.background }}>
      <View style={styles.bookListContainer}>
        <Text
          style={[styles.bookTextHead, { color: currentTheme.bookTitleHead }]}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Text
            style={[styles.bookTextBTN, { color: currentTheme.bookTitleBtn }]}
          >
            View More
          </Text>
        </TouchableOpacity>
      </View>
      <Book books={books} navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bookListContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  bookTextHead: {
    fontSize: 18,
    fontWeight: "medium",
    fontFamily: "Quicksand-Bold",
  },
  bookTextBTN: {
    fontSize: 14,
    fontWeight: "medium",
    fontFamily: "Quicksand-Medium",
  },
});
