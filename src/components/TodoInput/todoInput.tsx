import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useTodoStore } from "../../store/todostore";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";

const TodoInput = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTask = () => {
    if (!task.trim()) return;

    addTodo(task.trim(), description.trim(), priority);
    setTask("");
    setDescription("");
    setPriority("low");
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Task title"
        style={tw`border border-gray-300 p-3 rounded-lg mb-3 bg-white`}
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description (optional)"
        style={tw`border border-gray-300 p-3 rounded-lg mb-3 bg-white`}
      />

      <TouchableOpacity
        onPress={handleAddTask}
        style={[tw`absolute bottom-4`, { alignSelf: "center" }]}
      >
        <View
          style={tw`bg-blue-600 w-16 h-16 rounded-full items-center justify-center`}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TodoInput;
