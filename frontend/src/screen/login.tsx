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

interface Props {
  setLoggedIn: (value: boolean) => void;
}

const Login: React.FC<Props> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      setLoggedIn(true);
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-12 px-6`}>
      {/* Header */}
      <View style={tw`flex-row justify-start flex items-center mb-8 mt-3`}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={tw`text-2xl font-bold ml-40`}>Sign In</Text>
      </View>

   
      <View style={tw` mt-6`}>
        <Text style={tw`text-base font-semibold mb-2`}>E-mail</Text>
        <TextInput
          placeholder="Enter your email"
          value={username}
          onChangeText={setUsername}
          style={tw`bg-gray-100 p-5 rounded-lg mb-4`}
        />

        <Text style={tw`text-base font-semibold mb-2`}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tw`bg-gray-100 p-5 rounded-lg mb-6`}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={[
            tw`p-4 rounded-lg items-center justify-center`,
            { backgroundColor: "#F97316" },
          ]}
        >
          <Text style={tw`text-white font-bold text-lg`}>Sign In</Text>
        </TouchableOpacity>
      </View>
       
     <View style={tw`mt-12 flex justify-center items-center`}>
  <Text style={tw`font-bold text-base`}>Or with</Text>
</View>
    </SafeAreaView>
  );
};

export default Login;
