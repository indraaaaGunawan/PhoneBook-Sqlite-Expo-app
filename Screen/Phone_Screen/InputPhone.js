import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as SQLite from "expo-sqlite";
import { useState } from "react";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  const db = SQLite.openDatabase("contact.db");
  return db;
}

const db = openDatabase();

const InputPhone = () => {
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);

  const add = (name, number) => {
    // is text empty?
    if (name === null || name === "") {
      return false;
    }
    if (number === null || number === "") {
      return false;
    }

    db.transaction((tx) => {
      tx.executeSql("insert into user (value, value2) values (?, ?)", [
        name,
        number,
      ]);
      tx.executeSql("select * from user", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    }, null);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.heading}>
            Expo SQlite is not supported on web!
          </Text>
        </View>
      ) : (
        <View
          style={{ backgroundColor: "f2f2f2", width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Add Contact</Text>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
              }}
              style={{ margin: 10, width: 150, height: 150 }}
            />
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text) => setName(text)}
                placeholder="Input Name"
                style={styles.input}
                value={name}
              />
              <TextInput
                onChangeText={(text) => setNumber(text)}
                placeholder="Input Number"
                style={styles.input}
                value={number}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  add(name, number);
                  setName(null);
                  setNumber(null);
                  console.log(name);
                  console.log(number);
                }}
                style={[styles.button, { width: 100, marginTop: 20 }]}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default InputPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonimage: {
    backgroundColor: "#0782F9",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 38,
    textAlign: "center",
    fontWeight: "700",
    color: "white",
  },
});
