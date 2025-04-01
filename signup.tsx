import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import API_BASE_URL from "./config";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signUp: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user?.id) {
          await AsyncStorage.setItem("userId", String(data.user.id));
          navigation.navigate("otp2");
        } else {
        }
      } else {
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 90,
        backgroundColor: "#F1F2EC",
        paddingHorizontal: 20,
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
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={{ fontSize: 18, color: "#313F7E" }}>←</Text>
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 16,
          backgroundColor: "#F1F2EC",
          marginTop: 55,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 130, height: 130, marginBottom: 12 }}
          />
          <Text style={{ fontSize: 22, fontWeight: "600", color: "#313F7E" }}>
            Welcome to PlugNPlan
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#313F7E",
            marginBottom: 16,
          }}
        >
          Sign Up
        </Text>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#313F7E",
              marginBottom: 5,
            }}
          >
            E-mail
          </Text>
          <TextInput
            placeholder="ex. xxxxxxxx@gmail.com"
            placeholderTextColor="#B0B3B8"
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 14,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            value={email}
            onChangeText={setEmail}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#313F7E",
              marginBottom: 5,
            }}
          >
            Password
          </Text>
          <TextInput
            placeholder="ex. xxxxxxx"
            secureTextEntry
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 14,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            value={password}
            onChangeText={setPassword}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#313F7E",
              marginBottom: 5,
            }}
          >
            Confirm Password
          </Text>
          <TextInput
            placeholder="ex. xxxxxxx"
            secureTextEntry
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 40,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={{
              width: "35%",
              padding: 12,
              backgroundColor: "#313F7E",
              borderRadius: 10,
              alignItems: "center",
              alignSelf: "flex-end",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
            onPress={handleSignUp}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default signUp;
