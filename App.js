import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");


function NotesScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote} style={styles.headerIcon}>
          <Entypo name="new-message" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  });

  function addNote() {
    console.log("Add Note");
  }


  return <View style={styles.container}></View>;
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            headerTitle: "Notes App",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              fontSize: 30,
            },
            headerStyle: {
              height: 120,
              backgroundColor: "#673ab7",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    marginRight: 10,
    color: "#fff"

  }
});


