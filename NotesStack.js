import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";

const InnerStack = createStackNavigator();

export default function NotesStack() {
    return (
        <InnerStack.Navigator>
            <InnerStack.Screen
                name="Notes"
                component={NotesScreen}
                options={{
                    headerTitle: "Notes App",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 30,
                        color: '#fff',
                    },
                    headerStyle: {
                        height: 120,
                        backgroundColor: "#673ab7",
                        borderBottomColor: "#ccc",
                        borderBottomWidth: 1,
                    },
                }}
            />
        </InnerStack.Navigator>
    );
}


