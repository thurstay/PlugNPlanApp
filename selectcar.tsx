import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import API_BASE_URL from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const brands = ["Tesla", "NETA", "ChangAn", "BYD", "Volvo", "ORA"];
const models: { [key: string]: string[] } = {
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  NETA: ["V", "X", "V-II"],
  ChangAn: ["Deepal", "Lumin"],
  BYD: ["M6", "ATTO 3", "Seal", "Dolphin"],
  Volvo: ["EX30", "EC40", "EX40"],
  ORA: ["Good Cat", "07"],
};

const selectcar: React.FC = () => {
  const navigation = useNavigation();
  const [selectedBrand, setSelectedBrand] = useState("Tesla");
  const [selectedModel, setSelectedModel] = useState("Model Y");
  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [name, setName] = useState("");

  const handleSelectCar = async () => {
    const userId = await AsyncStorage.getItem("userId");

    try {
      const response = await fetch(`${API_BASE_URL}/user-car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          brand: selectedBrand,
          model: selectedModel,
          userId: userId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate("Home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add car.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
        backgroundColor: "#F1F2EC",
        paddingHorizontal: 0,
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 90,
          left: 30,
          width: 25,
          height: 25,
          borderWidth: 1.5,
          borderColor: "#313F7E",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("otp2")}
      >
        <Text style={{ fontSize: 18, color: "#313F7E" }}>←</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#313F7E",
          marginTop: 120,
        }}
      >
        Select your car
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#313F7E",
          marginTop: 10,
        }}
      >
        Enter car’s name:
      </Text>
      <TextInput
        placeholder="ex. Car 1"
        placeholderTextColor="#B0B3B8"
        style={{
          width: "65%",
          padding: 10,
          marginTop: 20,
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
        }}
        value={name}
        onChangeText={setName}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "#313F7E",
          marginTop: 50,
        }}
      >
        {selectedBrand} {selectedModel}
      </Text>
      <View
        style={{
          width: 320,
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 15,
          shadowOffset: { width: 5, height: 20 },
          elevation: 6,
        }}
      >
        <Image
          source={require("./assets/car.png")}
          style={{ width: 250, height: 140 }}
        />
      </View>

      <Text
        style={{
          fontSize: 17,
          fontWeight: "600",
          color: "#313F7E",
          marginTop: 5,
          alignSelf: "flex-start",
          marginLeft: 40,
        }}
      >
        Choose brand:
      </Text>
      <TouchableOpacity
        style={{
          width: "80%",
          padding: 12,
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
        }}
        onPress={() => setBrandModalVisible(true)}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#313F7E" }}>
          {selectedBrand}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 17,
          fontWeight: "600",
          color: "#313F7E",
          marginTop: 20,
          alignSelf: "flex-start",
          marginLeft: 40,
        }}
      >
        Choose model:
      </Text>
      <TouchableOpacity
        style={{
          width: "80%",
          padding: 12,
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
        }}
        onPress={() => setModelModalVisible(true)}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#313F7E" }}>
          {selectedModel}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "40%",
          padding: 12,
          backgroundColor: "#313F7E",
          borderRadius: 10,
          alignItems: "center",
          marginTop: 35,
        }}
        onPress={handleSelectCar}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Select
        </Text>
      </TouchableOpacity>

      {/* Brand Selection Modal */}
      <Modal visible={brandModalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <FlatList
              data={brands}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedBrand(item);
                    setSelectedModel(models[item][0]);
                    setBrandModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#313F7E",
                      fontSize: 18,
                      padding: 15,
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Model Selection Modal */}
      <Modal visible={modelModalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <FlatList
              data={models[selectedBrand]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedModel(item);
                    setModelModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#313F7E",
                      fontSize: 18,
                      padding: 15,
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default selectcar;
