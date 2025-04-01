import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "EditProfile">;

export default function EditProfile() {
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState("");
  const [showEditIcon, setShowEditIcon] = useState(false);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("./assets/icons/back.png")} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Profile</Text>
        </View>

        {/* Profile Image with Edit Icon */}
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={() => setShowEditIcon(!showEditIcon)}
        >
          <Image
            source={require("./assets/icons/profile-image.png")}
            style={styles.profileImage}
          />
           {showEditIcon && (
            <View style={styles.profileEditIconContainer}>
              <Image
                source={require("./assets/icons/pen-d.png")}
                style={styles.profileEditIcon}
              />
            </View>
          )}
        </TouchableOpacity>

        {/* Email (Read-Only) */}
        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput style={[styles.input, { color: "#A0A0A0" }]} value="plugnplan@gmail.com" editable={false} />
        </View>

        {/* Password (Editable) */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="********"
            placeholderTextColor="#A0A0A0"
          />
           <TouchableOpacity>
            <Image
              source={require("./assets/icons/pen.png")}
              style={styles.smallEditIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Social Media Connection */}
        <Text style={styles.socialLabel}>Connect Social Media</Text>
        <View style={styles.socialIcons}>
          <View style={styles.socialItem}>
            <Image source={require("./assets/facebook.png")} style={styles.socialIcon} />
            <Image source={require("./assets/icons/check.png")} style={styles.checkIcon} />
          </View>
          <View style={styles.socialItem}>
            <Image source={require("./assets/google.png")} style={styles.socialIcon} />
            <Image source={require("./assets/icons/check.png")} style={styles.checkIcon} />
          </View>
          <View style={styles.socialItem}>
            <Image source={require("./assets/apple.png")} style={styles.socialIcon} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F7F8F9",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 31,
    height: 28,
  },
  header: {
    fontSize: 24,
    color: "#313F7E",
    marginLeft: 10,
    fontWeight: "bold",
  },
  profileImageContainer: {
    marginTop: 40,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  label: {
    fontSize: 16,
    color: "#313F7E",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 50,
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 10,
    marginTop: 5,
    position: "relative",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1C2550",
  },
  penIcon: {
    width: 14,
    height: 14,
    position: "absolute",
    right: 10,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#D3D3D3",
    marginVertical: 40,
  },
  socialLabel: {
    fontSize: 16,
    color: "#313F7E",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 50,
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  socialItem: {
    alignItems: "center",
  },
  socialIcon: {
    width: 37,
    height: 37,
  },
  checkIcon: {
    width: 16,
    height: 16,
    marginTop: 15,
  },
  smallEditIcon: {
    width: 12,
    height: 15,
    tintColor: "#585858",
    marginRight: 10,
  },
  profileEditIconContainer: {
    position: "absolute",
    bottom: 25, // จัดให้ติดขอบล่างของรูปโปรไฟล์
    alignSelf: "center", // ทำให้ไอคอนอยู่ตรงกลางของรูปภาพ
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileEditIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
  },
});