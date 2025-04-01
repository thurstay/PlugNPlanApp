import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import API_BASE_URL from "./config";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const LogIn: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("Home");
      } else {
      }
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F2EC",
      }}
    >
      <View
        style={{
          width: "90%",
          maxWidth: 400,
          padding: 16,
          backgroundColor: "#F1F2EC",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 130, height: 130, marginBottom: 18 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#1E3A8A" }}>
            Welcome to PlugNPlan
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1E3A8A",
            marginBottom: 16,
          }}
        >
          Log In
        </Text>
        <View>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#313F7E" }}>
            E-mail
          </Text>
          <TextInput
            placeholder="ex. xxxxxxxx@gmail.com"
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 17,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#313F7E" }}>
            Password
          </Text>
          <TextInput
            placeholder="ex. xxxxxxx"
            secureTextEntry
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              backgroundColor: "#FFFFFF",
            }}
            value={password}
            onChangeText={setPassword}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{ fontSize: 13, fontWeight: "500", color: "#313F7E" }}
              >
                Forget Password
              </Text>
            </TouchableOpacity>
          </View>
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
            onPress={handleLogin}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            left: 110,
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 14, color: "#313F7E", fontWeight: "500" }}>
            New User?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text
              style={{
                color: "#313F7E",
                fontWeight: "700",
                textDecorationLine: "underline",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 24 }}
        >
          <View
            style={{ flexGrow: 1, borderTopWidth: 1, borderColor: "#313F7E" }}
          ></View>
          <Text
            style={{
              marginHorizontal: 8,
              fontSize: 14,
              color: "#313F7E",
              fontWeight: "500",
            }}
          >
            or log in with
          </Text>
          <View
            style={{ flexGrow: 1, borderTopWidth: 1, borderColor: "#313F7E" }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 16,
            gap: 16,
          }}
        >
          <TouchableOpacity style={{ padding: 8 }}>
            <Image
              source={require("./assets/facebook.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8 }}>
            <Image
              source={require("./assets/google.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8 }}>
            <Image
              source={require("./assets/apple.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LogIn;
