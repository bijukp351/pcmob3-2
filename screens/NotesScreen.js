import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity, Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";


const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({ navigation, route }) {
    const [notes, setNotes] = useState([]);


    function refreshNotes() {
        console.log("called refresh");
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM notes",
                null,
                (txObj, { rows: { _array } }) => setNotes(_array),
                (txObj, error) => console.log(`Error: ${error}`)
            );
        });
    }







    useEffect(() => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS notes
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT,
              done INT)
            `
                );
            },
            null,
            refreshNotes
        );
    }, []);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={addNote}>
                    <Entypo
                        name="new-message"
                        size={24}
                        color="white"
                        style={{ marginRight: 20 }}
                    />
                </TouchableOpacity>
            ),
        });
    });

    useEffect(() => {
        if (route.params?.text) {
            db.transaction(
                (tx) => {
                    tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
                        route.params.text,
                    ]);
                },
                null,
                refreshNotes
            );
        }
    }, [route.params?.text]);







    function addNote() {
        navigation.navigate("Add Note");
    }
    function deleteNote(id) {
        console.log("Deleting " + id);


        Alert.alert(
            "Confirm Delete",
            "Do you really want to delete this note?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        db.transaction(
                            (tx) => {
                                tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
                            },
                            null,
                            refreshNotes
                        );
                    }
                }
            ]
        )



    }
    function renderItem({ item }) {
        return (
            <View
                style={{
                    // padding: 10,
                    paddingBottom: 20,
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ textAlign: "left", alignSelf: 'flex-start', justifyContent: 'center', paddingTop: 30, marginLeft: 20, fontSize: 16 }}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Entypo name="circle-with-minus" size={25} style={{ marginRight: 20, paddingTop: 30, alignSelf: 'flex-end', color: 'red' }} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: "100%" }}
                data={notes}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffc",
        alignItems: "center",
        justifyContent: "center",
    },
});





