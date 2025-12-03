import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { loginUser } from "../api/auth.api";

interface LoginRouteParams {
  setLoggedIn: (value: boolean) => void;
}

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, LoginRouteParams>, string>>();
  const { setLoggedIn } = route.params;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("All fields are required");

    try {
      const res = await loginUser(email, password);
      if (res.token) {
        setLoggedIn(true); 
        navigation.navigate("Tabs" as never, { userName: res.name }); // redirect to home
      } else {
        alert(res.msg || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-12 px-6`}>
      {/* Header */}
      <View style={tw`relative items-center mb-8 mt-3`}>
        <Text style={tw`text-2xl font-bold`}>Sign In</Text>
        <TouchableOpacity
          style={tw`absolute left-0`}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-base font-semibold mb-2`}>E-mail</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={tw`bg-gray-100 p-5 rounded-lg mb-4`}
        />

        <Text style={tw`text-base font-semibold mb-2`}>Password</Text>
        <View style={tw`relative mb-6`}>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={tw`bg-gray-100 p-5 rounded-lg pr-12`}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={tw`absolute right-4 top-5`}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#F26d58"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[tw`p-4 rounded-lg items-center justify-center`, { backgroundColor: "#F26d58" }]}
        >
          <Text style={tw`text-white font-bold text-lg`}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Alternative login */}
      <View style={tw`mt-12 flex justify-center items-center`}>
        <Text style={tw`font-bold text-base`}>Or with</Text>
      </View>

      {/* Footer */}
      <View style={tw`flex-1 justify-end items-center mb-24`}>
        <Text style={tw`text-base`}>
          I don't have an account?{" "}
          <Text
            style={tw`text-blue-600 font-bold`}
            onPress={() => navigation.navigate("Register" as never)}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
