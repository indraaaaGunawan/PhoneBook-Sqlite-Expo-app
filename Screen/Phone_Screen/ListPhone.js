import { useState, useEffect, useCallback } from "react";
import {
  Image,
  RefreshControl,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";

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

export default function ListContact() {
  const navigation = useNavigation();
  const [items, setItems] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const sendData = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from user where id = ?;`,
        [id],
        (_, { rows: { _array } }) =>
          navigation.navigate("EditPhone", { items: _array })
      );
    });
    // navigation.navigate("EditPhone");
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    db.transaction((tx) => {
      tx.executeSql(`select * from user;`, [], (_, { rows: { _array } }) =>
        setItems(_array)
      );
    });
  }, []);

  const del = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from user where id = ?;`, [id]);
      },
      null,
      onRefresh
    );
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists user (id integer primary key not null, value name, value2 text);"
      );
    });
  }, []);

  useEffect(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    db.transaction((tx) => {
      tx.executeSql(`select * from user;`, [], (_, { rows: { _array } }) =>
        setItems(_array)
      );
    });
  }, []);

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
        <>
          <ScrollView
            style={styles.listArea}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {items ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeading}>Contacts</Text>
                {items.map(({ id, value, value2 }) => (
                  <View style={styles.container}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
                        }}
                        style={styles.photo}
                      />
                      <View style={styles.container_text}>
                        <Text style={styles.title}>{value}</Text>
                        <Text style={styles.description}>{value2}</Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            del(id);
                          }}
                        >
                          <Image
                            source={{
                              uri: "https://cdn-icons-png.flaticon.com/512/3128/3128607.png",
                            }}
                            style={styles.photodelete}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            sendData(id);
                          }}
                        >
                          <Image
                            source={{
                              uri: "https://cdn-icons-png.flaticon.com/512/8111/8111042.png",
                            }}
                            style={styles.photodelete}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeading}>No Contact</Text>
              </View>
            )}
          </ScrollView>
          {/* <View style={styles.sectionContainer}> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("InputPhone");
            }}
            style={[styles.button, { marginTop: 15 }]}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          {/* </View> */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#BBDEFB",
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 36,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    height: 48,
    width: 50,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    bottom: 6,
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center",
  },
  description: {
    fontSize: 20,
    fontStyle: "italic",
  },
  photo: {
    justifyContent: "center",
    alignSelf: "center",
    height: 48,
    width: 48,
  },
  photodelete: {
    justifyContent: "center",
    alignSelf: "center",
    height: 30,
    width: 30,
  },
});
