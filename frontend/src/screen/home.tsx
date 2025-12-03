import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import TodoInput from "../components/TodoInput/todoInput";
import Task from "../components/TodoItem/todoItem";
import { useTodoStore } from "../store/todostore";
import tw from "tailwind-react-native-classnames";
import AddButton from "../components/AddButton/addButton";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  userName: string;
}

export default function Home({ userName }: Props) {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const categories = useTodoStore((state) => state.categories);
  const getTaskCount = useTodoStore((state) => state.getTaskCount);

  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("Daily");
  const [deadline, setDeadline] = useState("Today");
  const [loading, setLoading] = useState(true);

  const handleAddTask = async () => {
    if (!task.trim()) return;

    await addTodo(task.trim(), description.trim(), priority, category, deadline);

    setTask("");
    setDescription("");
    setPriority("low");
    setCategory("Daily");
    setDeadline("Today");
    setModalVisible(false);
  };

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      await fetchTodos();
      setLoading(false);
    };
    loadTodos();
  }, []);

  const sortedlist = [...todos].sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-6 px-4`}>
      {/* Header */}
      <View style={tw`flex-row items-center`}>
        <View
          style={[
            tw`rounded-full border`,
            { width: 55, height: 55, backgroundColor: "#F26D58", marginRight: 12 },
          ]}
        />
        <View>
          <Text style={styles.header}>Hello, {userName} 👋</Text>
          <Text style={tw`text-gray-400 text-16px`}>
            Your daily adventure starts now
          </Text>
        </View>
      </View>

      {/* Categories */}
      <View style={tw`flex-row flex-wrap justify-between mt-8 mb-4`}>
        {categories.map((cat) => (
          <View
            key={cat.name}
            style={[tw`p-3 rounded-2xl mb-4`, { backgroundColor: cat.color, width: "48%" }]}
          >
            <View style={tw`flex-row items-center mb-2`}>
              <MaterialIcons
                name={cat.icon}
                size={28}
                color="white"
                style={[tw`rounded-full p-2`, { backgroundColor: "#00000038" }]}
              />
              <View>
                <Text style={tw`font-bold text-2xl text-black ml-2`}>{cat.name}</Text>
                <Text style={tw`text-black ml-2`}>{getTaskCount(cat.name)} Tasks</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View style={tw`flex-1 justify-center items-center mt-8`}>
          <ActivityIndicator size="large" color="#F26D58" />
        </View>
      ) : (
        <>
          {todos.length > 0 && <Text style={tw`text-xl font-bold mt-4`}>Recent Tasks</Text>}

          <ScrollView contentContainerStyle={tw`pb-24`} showsVerticalScrollIndicator={false}>
            <FlatList
              data={sortedlist}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Task
                  todo={item}
                  onToggle={() => toggleTodo(item.id)}
                  onDelete={() => removeTodo(item.id)}
                />
              )}
              scrollEnabled={false} // disable internal scroll
              style={tw`mt-4`}
            />
          </ScrollView>
        </>
      )}

      {/* Add Task Button */}
      <AddButton onPress={() => setModalVisible(true)} />

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={[tw`bg-white w-11/12 p-6 rounded-lg`, { height: 700 }]}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold`}>Create a New Task</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`bg-gray-300 px-4 py-4 rounded-full`}>
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
              <TouchableOpacity onPress={handleAddTask} style={tw`bg-black w-full h-12 rounded-xl items-center justify-center`}>
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
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
});
