import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  task: string;
  setTask: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  deadline: string;
  setDeadline: (value: string) => void;
}

const TodoInput: React.FC<Props> = ({
  task,
  setTask,
  description,
  setDescription,
  priority,
  setPriority,
  category,
  setCategory,
  deadline,
  setDeadline,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);

  return (
    <View style={tw`flex-1 p-4`}>

      {/* Deadline Section */}
      <View style={tw`flex-row justify-between mt-3 mb-4`}>
        {/* Today */}
        <TouchableOpacity
          onPress={() => setDeadline("Today")}
          style={[
            tw`flex-row items-center px-2 py-3 rounded-lg border`,
            {
              backgroundColor: deadline === "Today" ? "#000" : "#fff",
              borderColor: "#e5e5e5",
              width: "23%",
            },
          ]}
        >
          <Text style={{ color: deadline === "Today" ? "#fff" : "#6b7280", textAlign: "center", flex: 1, fontSize: 12 }}>
            Today
          </Text>
        </TouchableOpacity>

        {/* Tomorrow */}
        <TouchableOpacity
          onPress={() => setDeadline("Tomorrow")}
          style={[
            tw`flex-row items-center px-2 py-3 rounded-lg border`,
            {
              backgroundColor: deadline === "Tomorrow" ? "#000" : "#fff",
              borderColor: "#e5e5e5",
              width: "23%",
            },
          ]}
        >
          <Text style={{ color: deadline === "Tomorrow" ? "#fff" : "#6b7280", textAlign: "center", flex: 1, fontSize: 12 }}>
            Tomorrow
          </Text>
        </TouchableOpacity>

        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setDeadline("date")}
          style={[
            tw`flex-row items-center px-2 py-3 rounded-lg border justify-center`,
            {
              backgroundColor: deadline === "date" ? "#000" : "#fff",
              borderColor: "#e5e5e5",
              width: "23%",
            },
          ]}
        >
          <MaterialIcons name="calendar-month" size={16} color={deadline === "date" ? "#fff" : "#000"} />
        </TouchableOpacity>

        {/* Time Picker */}
        <TouchableOpacity
          onPress={() => setDeadline("time")}
          style={[
            tw`flex-row items-center px-2 py-3 rounded-lg border justify-center`,
            {
              backgroundColor: deadline === "time" ? "#000" : "#fff",
              borderColor: "#e5e5e5",
              width: "23%",
            },
          ]}
        >
          <MaterialIcons name="access-time" size={16} color={deadline === "time" ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>

      {/* Conditional DateTimePickers */}
      {deadline === "date" && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) {
              setSelectedDate(date);
              setDeadline(date.toDateString());
            }
          }}
          style={{ marginBottom: 10 }}
        />
      )}
      {deadline === "time" && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={(event, time) => {
            if (time) {
              setSelectedTime(time);
              setDeadline(time.toLocaleTimeString());
            }
          }}
          style={{ marginBottom: 10 }}
        />
      )}

      {/* Category Section */}
      <Text style={tw`text-base font-semibold mb-2`}>Category</Text>
      <View style={tw`flex-row flex-wrap justify-between mb-4`}>
        {["Daily", "Travel", "Health", "Social"].map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c)}
            style={[
              tw`px-4 py-5 rounded-lg border border-gray-400 mb-2`,
              {
                backgroundColor: category === c ? "#F97316" : "#fff",
                flexBasis: "48%",
              },
            ]}
          >
            <Text style={[tw`text-center`, category === c ? tw`text-white` : tw`text-black`]}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title */}
      <Text style={tw`text-base font-semibold mb-2`}>Title</Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Task title"
        style={tw`border border-gray-300 p-3 rounded-lg mb-3 bg-white`}
      />

      {/* Description */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description (optional)"
        style={tw`border border-gray-300 p-3 mt-2 rounded-lg bg-white`}
      />

      {/* Priority Section */}
      <Text style={tw`text-base font-semibold mt-4 mb-2`}>Priority</Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {["High", "Medium", "Low"].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            style={[
              tw`px-4 py-3 rounded-lg border border-gray-400 mb-2`,
              {
                backgroundColor: priority === p ? "#F97316" : "#fff",
                flexBasis: "30%",
              },
            ]}
          >
            <Text style={[tw`text-center`, priority === p ? tw`text-white` : tw`text-black`]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TodoInput;
