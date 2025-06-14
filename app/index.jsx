import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Appearance,
} from "react-native";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";

import { data } from "../data/todos";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const styles = createStyles(theme);

  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));

  const [text, setText] = useState("");

  const separatorComp = <View style={styles.separator} />;

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos((prevTodos) => [
        { id: newId, title: text.trim(), completed: false },
        ...prevTodos,
      ]);
      setText("");
    }
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  function onChangeText(newText) {
    setText(newText);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.todoItem}>
        <Pressable onPress={() => toggleTodo(item.id)}>
          <Text style={[styles.todoText, item.completed && styles.completed]}>
            {item.title}
          </Text>
        </Pressable>
        <Pressable onPress={() => removeTodo(item.id)}>
          <Entypo name="trash" size={16} style={styles.trashIcon} />
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Add a new todo"
          keyboardType="default"
        />
        <Pressable style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={separatorComp}
      />
    </SafeAreaView>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: theme.background,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      margin: 16,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.inputBorder,
      borderRadius: 4,
      padding: 10,
      marginRight: 8,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.buttonBackground,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: "bold",
    },
    separator: {
      height: 1,
      backgroundColor: theme.separator,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    todoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 16,
      paddingVertical: 12,
      borderColor: "#eee",
    },
    todoText: {
      color: theme.text,
      fontSize: 16,
    },
    trashIcon: {
      color: theme.trashIcon,
      backgroundColor: "red", // or add a theme.trashBg if needed
      padding: 8,
      borderRadius: 50,
    },
    completed: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
}
