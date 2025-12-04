import { View, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";


const WelcomePage = ({navigation}: any) => {
    
  return (
    <View style={tw`flex-1 items-center justify-center p-6 mt-16`}>

      <Image
        source={require("../../assets/Vector.png")}
        style={{ width: 140, height: 140, resizeMode: "contain", marginBottom: 30 }}
      />

      <Text style={[tw`text-white text-3xl font-bold mb-10`, {color: "#F26D58"}]}>
        UpTodo
      </Text>

       <Text
            style={tw`text-black font-bold text-lg`}
            onPress={() => navigation.navigate("Login" as never)}
          >
        Get Started
      </Text>
       <View style={tw`flex-1 justify-end items-center mb-1`}>

      <Text style={tw``}>Built by govind </Text>
       </View>
    </View>
  );
};

export default WelcomePage;
