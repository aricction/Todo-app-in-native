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

interface LoginRouteParams {
  setLoggedIn: (value: boolean) => void;
}

const Login = () => {
  const navigation = useNavigation();
  
  // Correctly typed route
  const route = useRoute<RouteProp<Record<string, LoginRouteParams>, string>>();
  const { setLoggedIn } = route.params;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      setLoggedIn(true);
      navigation.navigate("Tabs" as never);
    } else {
      alert("Please enter username and password");
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

      <View style={tw`mt-6`}>
        <Text style={tw`text-base font-semibold mb-2`}>E-mail</Text>
        <TextInput
          placeholder="Enter your email"
          value={username}
          onChangeText={setUsername}
          style={tw`bg-gray-100 p-5 rounded-lg mb-4`}
        />

        <Text style={tw`text-base font-semibold mb-2`}>Password</Text>

        <View style={tw`relative mb-6`}>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!show}
            style={tw`bg-gray-100 p-5 rounded-lg pr-12`}
          />

          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={tw`absolute right-4 top-5`}
          >
            <MaterialIcons
              name={show ? "visibility" : "visibility-off"}
              size={22}
              color="#F26d58"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[
            tw`p-4 rounded-lg items-center justify-center`,
            { backgroundColor: "#F26d58" },
          ]}
        >
          <Text style={tw`text-white font-bold text-lg`}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`mt-12 flex justify-center items-center`}>
        <Text style={tw`font-bold text-base`}>Or with</Text>
      </View>

      <View style={tw`flex-1 justify-end items-center mb-24`}>
        <Text style={tw`text-base`}>
          I don't have an account?{" "}
          <Text
            style={tw`text-blue-600 font-bold`}
            onPress={() => navigation.navigate("Register" as never)}
          >
            Signup
          </Text>
        </Text>
      </View>

    </SafeAreaView>
  );
};

export default Login;
