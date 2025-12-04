import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { registerUser } from "../api/auth.api";

const Register = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { setLoggedIn } = route.params as { setLoggedIn: (v: boolean) => void };
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name) {
      return alert("enter your name");
    }

    if (!email || !password || !retypePassword) {
      return alert("All fields are required");
    }

    if (password !== retypePassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await registerUser(name, email, password, retypePassword);
      if (res.token) {
        setLoggedIn(true);
        alert(`Welcome ${res.email}`);
        navigation.navigate("Tabs" as never, { userName: res.name });
      } else {
        alert(res.msg || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-12 px-6`}>
      <View style={tw`relative items-center mb-8 mt-3`}>
        <Text style={tw`text-2xl font-bold`}>Sign Up</Text>
        <TouchableOpacity style={tw`absolute left-0`}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={tw`mt-6`}>
        <Text style={tw`text-base font-semibold mb-2`}>Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={tw`bg-gray-100 p-5 rounded-lg mb-4`}
        />

        <Text style={tw`text-base font-semibold mb-2`}>E-mail</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={tw`bg-gray-100 p-5 rounded-lg mb-4`}
        />

        <Text style={tw`text-base font-semibold mb-2`}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={tw`bg-gray-100 p-5 rounded-lg mb-6`}
        />

        <Text style={tw`text-base font-semibold mb-2`}>Retype Password</Text>
        <View style={tw`relative mb-6`}>
          <TextInput
            placeholder="Retype your password"
            value={retypePassword} // fixed value
            onChangeText={setRetypePassword} // fixed onChange
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
              color="#F26D58"
            />
          </TouchableOpacity>
        </View>

        <View style={tw`mb-6`}>
          {loading ? (
            <View
              style={[
                tw`p-4 rounded-lg items-center justify-center`,
                { backgroundColor: "#F26d58" },
              ]}
            >
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleRegister}
              style={[
                tw`p-4 rounded-lg items-center justify-center`,
                { backgroundColor: "#F26d58" },
              ]}
            >
              <Text style={tw`text-white font-bold text-lg`}>Register</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={tw`mt-12 flex justify-center items-center`}>
        <Text style={tw`font-bold text-base`}>Or with</Text>
      </View>

      <View style={tw`flex-1 justify-end items-center mb-24`}>
        <Text style={tw`text-base`}>
          Already have an account?{" "}
          <Text
            style={tw`text-blue-600 font-bold`}
            onPress={() => navigation.navigate("Login" as never)}
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;
