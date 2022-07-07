import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import JournalView from "../journalComponents/journalView";
import JournalHome from "../journalComponents/journalHome";
import JournalEdit from "../journalComponents/journalEdit";
import JournalContexts from "../journalComponents/JournalContexts";
const Stack = createNativeStackNavigator();
const PlanScreen = () => {
  return (
    <JournalContexts>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Journals">
          <Stack.Screen
            name="Journals"
            component={JournalHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JournalView"
            component={JournalView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JournalEdit"
            component={JournalEdit}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </JournalContexts>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({});
