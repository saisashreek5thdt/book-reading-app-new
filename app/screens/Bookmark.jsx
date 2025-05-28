import { StyleSheet, Text, View } from 'react-native'

export default function Bookmark() {
  return (
    <View style={styles.container}>
      <Text>Bookmark</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
})