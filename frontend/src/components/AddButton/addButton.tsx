import React from "react";
import { TouchableOpacity, Text ,View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

const AddButton = ({ onPress }: Props) => {
  return (
      <TouchableOpacity
      onPress={onPress}
        style={[tw`absolute bottom-0 `, { alignSelf: "center" ,zIndex: 999  }]}
      >
        <View
          style={[tw`z-[999] w-16 h-16 rounded-full items-center justify-center`, {backgroundColor: "#f26d58", zIndex: 999 }]}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </View>
      </TouchableOpacity>
  );
};

export default AddButton;
