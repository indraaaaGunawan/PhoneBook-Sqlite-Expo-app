import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../Component/Button";

const ProfileScreen = () => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>Hello</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sign out" mb={8} onPress={handleSignOut} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
