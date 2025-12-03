import React, { useState } from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screen/home";
import TaskList from "./src/screen/taskList";
import Login from "./src/screen/login";
import Register from "./src/screen/Register";
import { MaterialIcons } from "@expo/vector-icons";
import WelcomePage from "./src/screen/welcome";

type RootStackParamList = {
   WelcomePage: undefined;
  Login: { setLoggedIn: (v: boolean) => void };
  Register: { setLoggedIn: (v: boolean) => void };
  Tabs: { userName: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabs({ route }: { route: RouteProp<RootStackParamList, "Tabs"> }) {
  const userName = route?.params?.userName || "User";

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
      <Tab.Screen name="Home">
        {() => <Home userName={userName} />}
      </Tab.Screen>
      <Tab.Screen name="Tasks" component={TaskList} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name= "WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Login" initialParams={{ setLoggedIn }} component={Login} />
        <Stack.Screen name="Register" initialParams={{ setLoggedIn }} component={Register} />
        <Stack.Screen name="Tabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
