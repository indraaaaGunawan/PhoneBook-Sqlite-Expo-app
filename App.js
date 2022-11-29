import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavStack from "./Navigation/NavStack";

export default function App() {
  return <NavStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
