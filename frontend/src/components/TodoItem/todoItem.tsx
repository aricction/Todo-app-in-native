import React from "react";
import { View, Text } from "react-native";
import { Todo } from "../../types/todo.types";
import tw from "tailwind-react-native-classnames";
import { useTodoStore } from "../../store/todostore";

interface Props {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}



const TodoItem = ({ todo, onToggle, onDelete }: Props) => {

  const categories = useTodoStore((state)=> state.categories);
  if (!todo || !todo.title) return null;

  return (
    <View style={tw`bg-white p-4 border rounded-2xl my-2`}>
     {todo ? (
        <View>

         <View style={tw`flex-col `}>
          
       
        <Text
          style={tw.style(
            "text-black text-xl font-semibold",
            todo.completed && "line-through text-gray-500"
          )}
        >
          {todo.title}
        </Text>

        {todo.description ? (
          <Text style={tw`text-gray-700 mt-1`}>
            {todo.description}
          </Text>
        ) : null}

        {todo.priority ? (
          <Text
            style={[tw`mt-2 text-white px-2 py-1 rounded text-xs w-24 text-center`,
              {backgroundColor: categories.find((c) => c.name === todo.category)?.color
 }
            ]}
          >
            {todo.priority.toUpperCase()}
          </Text>
        ) : null}

     
      </View>

      </View>
     ) : (
                <Text style={tw`text-gray-500`}>Add a task</Text>

     )}
      

    </View>
  );
};

export default TodoItem;
