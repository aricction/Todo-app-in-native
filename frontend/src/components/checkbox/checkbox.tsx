import { Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";


interface CheckboxProps {
    checked: Boolean;
    onToggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({checked, onToggle}) => {
   
    return (
          <Pressable onPress={onToggle}>
            {checked ? (
        <MaterialIcons name="check-box" size={28} color="#2563EB" />
      ) : (
        <MaterialIcons name="check-box-outline-blank" size={28} color="#9CA3AF" />
      )}
          </Pressable>
    );
};

export default Checkbox;