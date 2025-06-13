import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import { data as TODO_LIST } from "../data/todos";

export default function Index() {
  const [text, setText] = useState("");

  const separatorComp = <View style={styles.separator} />;

  function onChangeText(newText) {
    setText(newText);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.title}</Text>
        <Entypo name="trash" size={16} style={styles.trashIcon} />
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
        <Pressable
          style={styles.button}
          onPress={() => console.log("Added:", text)}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={TODO_LIST}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={separatorComp}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginRight: 8,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
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
    fontSize: 16,
  },
  trashIcon: {
    color: "black",
    backgroundColor: "red",
    padding: 8,
    borderRadius: 50,
  },
});
