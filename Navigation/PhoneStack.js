import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListPhone from "../Screen/Phone_Screen/ListPhone";
import EditPhone from "../Screen/Phone_Screen/EditPhone";
import InputPhone from "../Screen/Phone_Screen/InputPhone";

const Stack = createNativeStackNavigator();

const PhoneStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          title: "Phone Book",
          headerTitleAlign: "center",
        }}
        name="ListPhone"
        component={ListPhone}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InputPhone"
        component={InputPhone}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditPhone"
        component={EditPhone}
      />
    </Stack.Navigator>
  );
};

export default PhoneStack;
