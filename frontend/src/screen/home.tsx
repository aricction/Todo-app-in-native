import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import TodoInput from "../components/TodoInput/todoInput";
import Task from "../components/TodoItem/todoItem";
import { useTodoStore } from "../store/todostore";
import tw from "tailwind-react-native-classnames";
import AddButton from "../components/AddButton/addButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const categories = useTodoStore((state) => state.categories);
  const getTaskCount = useTodoStore((state) => state.getTaskCount);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("Daily");
  const [task, setTask] = React.useState("");
const [deadline, setDeadline] = useState("Today"); // default
const [selectedDate, setSelectedDate] = useState(null);
const [selectedTime, setSelectedTime] = useState(null);

  const handleAddTask = () => {
    if (!task.trim()) return;
    addTodo(task.trim(), description.trim(), priority, category, deadline);
    setTitle("");
    setDescription("");
    setPriority("low");
    setCategory("Daily");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-12 px-4 pb-4`}>
      <View>
        <Text style={styles.header}>Hello, Govind 👋</Text>
        <Text style={tw`text-gray-400 text-16px`}>
          Your daily adventure starts now
        </Text>
      </View>
      <View style={tw`flex-1 mt-8`}>
        <View style={tw`flex-row flex-wrap justify-between mb-4`}>
          {categories.map((cat) => (
            <View
              key={cat}
              style={[
                tw`p-6 rounded-xl mb-4`,
                {
                  backgroundColor: "#F97316",
                  width: "48%",
                },
              ]}
            >
              <Text style={tw`text-white font-bold text-2xl text-black`}>{cat}</Text>
              <Text style={tw`text-white`}>{getTaskCount(cat)} Tasks</Text>
            </View>
          ))}
        </View>
      </View>
      
   {todos.length > 0 && (
  <Text style={tw`text-xl font-bold mt-4 `}>Recent Tasks</Text>
)}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            todo={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => removeTodo(item.id)}
          />
        )}
        style={{ marginTop: 20 }}
      />

      <AddButton onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View
            style={[tw`bg-white w-11/12  p-6 rounded-lg `, { height: 700 }]}
          >
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold`}>Create a New Task</Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`bg-gray-300 px-4 py-4 rounded-full`}
              >
                <MaterialIcons name="close" size={25} />
              </TouchableOpacity>
            </View>

            <TodoInput
              task={task}
              setTask={setTask}
              description={description}
              setDescription={setDescription}
              priority={priority}
              setPriority={setPriority}
              category={category}
              setCategory={setCategory}
            deadline={deadline}
            setDeadline={setDeadline}
            />

            <View style={tw`w-full mt-4`}>
              <TouchableOpacity
                onPress={handleAddTask}
                style={tw`bg-black w-full h-12 rounded-xl items-center justify-center`}
              >
                <Text style={tw`text-white text-lg font-semibold`}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
});
