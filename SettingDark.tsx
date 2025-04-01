import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useRoute } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Setting">;

export default function SettingDark() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

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
            <TouchableOpacity>
              <Text style={styles.editProfile}>
                Edit Profile{" "}
                <Image source={require("./assets/icons/pen.png")} style={styles.penIcon} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>My Car</Text>
            <Image source={require("./assets/icons/chevron-right-d.png")} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Routes History</Text>
            <Image source={require("./assets/icons/chevron-right-d.png")} style={styles.chevronIcon} />
          </TouchableOpacity>

          {/* Display Toggle */}
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Display</Text>
            <View style={styles.displayToggle}>
              <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                <Image
                  source={require("./assets/icons/sun.png")}
                  style={[styles.icon, { tintColor: "#6DFBCE" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("./assets/icons/moon.png")}
                  style={[styles.icon, { tintColor: "#6DFBCE" }]}
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
          <TouchableOpacity style={{ paddingVertical: 15 }}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomNav}>
              {/* Find EV Station Button */}
              <TouchableOpacity
                style={[styles.navItem, { opacity: route.name === "Home" ? 1 : 0.5 }]} // ใช้ opacity กับ TouchableOpacity
                onPress={() => navigation.navigate("Home")}
              >
                <Image
                  source={require("./assets/icons/Marker-d.png")}
                  style={[styles.icon, { tintColor: "#171931" }]}
                />
                <Text style={[styles.navText, { color: "#171931" }]}>
                  Find EV station
                </Text>
              </TouchableOpacity>
            
              {/* Plan Trip Button */}
              <TouchableOpacity
                style={[styles.navItem, { opacity: route.name === "Planned" ? 1 : 0.5 }]}
                onPress={() => navigation.navigate("Planned")}
              >
                <Image
                  source={require("./assets/icons/Planned-d.png")}
                  style={[styles.icon, { tintColor: "#171931" }]}
                />
                <Text style={[styles.navText, { color: "#171931" }]}>
                  Plan trip
                </Text>
              </TouchableOpacity>
            
              {/* Settings Button */}
              <TouchableOpacity
                style={[styles.navItem, { opacity: route.name === "Setting" ? 1 : 0.5 }]}
                onPress={() => navigation.navigate("Setting")}
              >
                <Image
                  source={require("./assets/icons/Settings-d.png")}
                  style={[styles.icon, { tintColor: "#171931" }]}
                />
                <Text style={[styles.navText, { color: "#171931" }]}>
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#171931",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#6DFBCE",
    fontFamily: "LexendDeca-Regular",
  },
  profileCard: {
    backgroundColor: "#6DFBCE",
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
    color: "#171931",
    fontSize: 16,
  },
  editProfile: {
    color: "#171931",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  penIcon: {
    width: 12,
    height: 12,
    tintColor: "#171931",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(109, 251, 206, 0.3)",
  },
  menuText: {
    fontSize: 16,
    color: "#6DFBCE",
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
  icon: {
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
    backgroundColor: "#6DFBCE",
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
});