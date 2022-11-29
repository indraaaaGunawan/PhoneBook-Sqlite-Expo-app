import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import Button from "../Component/Button";
import { TouchableOpacity } from "react-native-web";
//import { auth } from "../firebase";
// import HomeStack from "../navigation/HomeStack";

const HomeScreen = ({ navigation }) => {
  // const auth = {
  //   email: auth.currentUser?.email,
  // };

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  // };

  const handlePhone = () => {
    navigation.navigate("PhoneStack");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text style={styles.text}>Dashboard</Text>
        {/* <Text style={styles.text}>{auth.currentUser?.email}</Text> */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3771/3771518.png",
          }}
          style={{ margin: 10, width: 150, height: 150 }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Phone Book" onPress={handlePhone} />
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Sign out" mb={8} onPress={handleSignOut} />
      </View> */}
      {/* <HomeStack /> */}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    // paddingHorizontal: 40,
  },
  buttonContainer: {
    // width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    marginBottom: 350,
    fontSize: 38,
    textAlign: "center",
    fontWeight: "700",
    color: "white",
  },
});
