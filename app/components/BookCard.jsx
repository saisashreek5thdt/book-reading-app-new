import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useTheme } from "../utils/theme";

export default function BookCard({ title, author, coverImage, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.bookCardContainer} onPress={onPress}>
      <Image
        style={styles.bookCoverImg}
        // source={require("../../assets/images/book.jpg")}
        source={
          coverImage && typeof coverImage === "string"
            ? { uri: coverImage.trim() }
            : require("../../assets/images/book.jpg")
        }
        resizeMode="cover"
      />
      <Text
        style={[
          styles.bookCardTitle,
          { color: theme === "dark" ? colors.BLACK : colors.WHITE },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.bookCardAuthor,
          { color: theme === "dark" ? colors.BLACK : colors.WHITE },
        ]}
      >
        {author}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookCardContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
    width: 150,
    alignItems: "center",
  },
  bookCardTitle: {
    fontSize: 16,
    fontFamily: "Quicksand-Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  bookCardAuthor: {
    fontSize: 12,
    fontFamily: "Quicksand-Medium",
    fontWeight: "medium",
    textAlign: "center",
  },
  bookCoverImg: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    marginBottom: 10,
  },
});
