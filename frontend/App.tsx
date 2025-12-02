import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screen/home";
import TaskList from "./src/screen/taskList";
import Login from "./src/screen/login";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // auth state

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName: string = "home";
              if (route.name === "Home") iconName = "home";
              if (route.name === "Tasks") iconName = "list";
              return <MaterialIcons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#F97316",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Tasks" component={TaskList} />
        </Tab.Navigator>
      ) : (
        // Show login page if not logged in
        <Login setLoggedIn={setLoggedIn} />
      )}
    </NavigationContainer>
  );
}
