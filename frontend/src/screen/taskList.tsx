import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useTodoStore } from "../store/todostore";
import { MaterialIcons } from "@expo/vector-icons";

const TaskList = ({ navigation }: any) => {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const categories = useTodoStore((state) => state.categories);

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
        renderItem={({ item }) => {
          const categoryColor =
            categories.find((c) => c.name === item.category)?.color || "#ccc";

          return (
            <View style={tw`bg-white p-4 rounded-lg border mt-6`}>
              {/* Top Row - Title + Checkbox */}
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
                    style={[
                      tw`text-white px-2 py-1 rounded bg-gray-100 text-xs w-16 text-center mr-2`,
                      {
                        backgroundColor: categoryColor,
                      },
                    ]}
                  >
                    {item.priority.toUpperCase()}
                  </Text>
                )}

                {item.deadline && (
                  <Text
                    style={[tw` text-white px-2 py-1 rounded text-xs w-18 text-center`,
                      {
                        backgroundColor: categoryColor,
                      }
                      
                    ]}
                  > 
                    {item.deadline}
                  </Text>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TaskList;
