import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useRoute } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Setting">;

export default function Setting() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate("LogIn");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Setting</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={require("./assets/icons/profile-image.png")} style={styles.profileImage} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.profileEmail}>plugnplan@gmail.com</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
              <Text style={styles.editProfile}>
                Edit Profile{" "}
                <Image source={require("./assets/icons/pen.png")} style={styles.penIcon} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.menuItem}
          onPress={() => navigation.navigate("EditCar")}>
            <Text style={styles.menuText}>My Car</Text>
            <Image source={require("./assets/icons/chevron-right.png")} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} 
          onPress={() => navigation.navigate("RoutesHis")}>
            <Text style={styles.menuText}>Routes History</Text>
            <Image source={require("./assets/icons/chevron-right.png")} style={styles.chevronIcon} />
          </TouchableOpacity>

          {/* Display Toggle */}
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Display</Text>
            <View style={styles.displayToggle}>
              <TouchableOpacity>
                <Image
                  source={require("./assets/icons/sun.png")}
                  style={[styles.icondisplay, { tintColor: "#313F7E" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SettingDark")}>
                <Image
                  source={require("./assets/icons/moon.png")}
                  style={[styles.icondisplay, { tintColor: "#313F7E" }]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Language Selector */}
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Languages</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={require("./assets/icons/uk-flag.png")} style={styles.flagIcon} />
              <Image source={require("./assets/icons/thai-flag.png")} style={[styles.flagIcon, { marginLeft: 10 }]} />
            </View>
          </View>

          {/* Other Options */}
          <TouchableOpacity style={{ paddingVertical: 15 }}>
            <Text style={styles.menuText}>Report new charging station</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingVertical: 15 }}>
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingVertical: 15 }}>
            <Text style={styles.menuText}>Bug report</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => setModalVisible(true)}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Popup Logout Confirmation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Logout Confirmation</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, { opacity: route.name === "Home" ? 1 : 0.5 }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/icons/Marker.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Find EV station</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, { opacity: route.name === "Planned" ? 1 : 0.5 }]}
          onPress={() => navigation.navigate("Planned")}
        >
          <Image
            source={require("./assets/icons/Planned.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Plan trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, { opacity: route.name === "Setting" ? 1 : 0.5 }]}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image
            source={require("./assets/icons/Settings.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EA4335",
  },
  modalMessage: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    gap: 80,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textDecorationLine: "underline",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EA4335",
    textDecorationLine: "underline",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#F7F8F9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1C2550",
    fontFamily: "LexendDeca-Regular",
  },
  profileCard: {
    backgroundColor: "#28357A",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileEmail: {
    color: "#fff",
    fontSize: 16,
  },
  editProfile: {
    color: "#fff",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  penIcon: {
    width: 10,
    height: 13,
    tintColor: "#fff",
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  menuText: {
    fontSize: 16,
    color: "#1C2550",
    fontFamily: "LexendDeca-Regular",
  },
  chevronIcon: {
    width: 15,
    height: 15,
  },
  displayToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 75,
  },
  icondisplay: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  flagIcon: {
    width: 35,
    height: 30,
  },
  logout: {
    fontSize: 16,
    color: "#EA4335",
  },
  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#313F7E",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 100,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
  },
  halfContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  icons: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
