import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/screen/home";
import TaskList from "./src/screen/taskList";
import Login from "./src/screen/login";
import Register from "./src/screen/Register";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Home") iconName = "home";
          if (route.name === "Tasks") iconName = "list";
          return <MaterialIcons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F26d58",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tasks" component={TaskList} />
    </Tab.Navigator>
  );
}

export default function App() {
   const [loggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Auth Screens */}
        <Stack.Screen name="Login" initialParams={{ setLoggedIn }} component={Login} />
        <Stack.Screen name="Register" component={Register}  initialParams={{ setLoggedIn }} />

        {/* App Tabs */}
        <Stack.Screen name="Tabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
