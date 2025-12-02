import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useTodoStore } from "../store/todostore";
import { MaterialIcons } from "@expo/vector-icons";

const TaskList = ({ navigation }: any) => {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    <View style={tw`flex-1 bg-white pt-12 px-4`}>
      <Text style={tw`text-2xl font-bold`}>Your Tasks</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={tw`text-gray-500 text-center text-2xl mt-10`}>
            No tasks added yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={tw`bg-gray-100 p-4 rounded-lg  mt-6`}>
            {/* Top row: Title and toggle */}
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => toggleTodo(item.id)}
                style={tw`w-6 h-6 rounded border border-gray-500 items-center justify-center`}
              >
                {item.completed && (
                  <MaterialIcons name="check" size={18} color="green" />
                )}
              </TouchableOpacity>
            </View>
     
 {/* Priority & Deadline Row */}
<View style={tw`flex-row mt-2`}>
  {item.priority && (
    <Text
      style={tw`bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs w-24 text-center mr-2`}
    >
      {item.priority.toUpperCase()}
    </Text>
  )}

  {item.deadline && (
    <Text
      style={tw`bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs w-24 text-center`}
    >
      {item.deadline}
    </Text>
  )}
</View>

          </View>
        )}
      />
    </View>
  );
};

export default TaskList;
