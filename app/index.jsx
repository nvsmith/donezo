import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { data } from "@/data/todos";

export default function Index() {
    const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
    const [text, setText] = useState("");

    // Create (CRUD): Add a new todo to the list with an ID of 1 more than the last todo.
    const addTodo = () => {
        if (text.trim()) {
            const newId = todos.length > 0 ? todos[0].id + 1 : 1;
            setTodos([{ id: newId, title: text, completed: false }, ...todos]);
            setText("");
        }
    };

    // Update (CRUD): Toggle the completed status of a todo
    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    // Delete (CRUD): Remove a todo from the list
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                />
                <Pressable onPress={addTodo} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    input: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
        minWidth: 0,
        color: "white",
    },
    addButton: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
    },
    addButtonText: {
        fontSize: 18,
        color: "black",
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        padding: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        color: "white",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
});
