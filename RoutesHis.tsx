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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "RoutesHis">;

export default function RoutesHis() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
            <Image source={require("./assets/icons/back.png")} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Route History</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.date}>28 Oct, 2024</Text>
          <Text style={styles.title}>The Paseo Mall (Lat Krabang) ST.2</Text>
          <Text style={styles.location}>Lat Krabang, Lat Krabang, Bangkok</Text>

          {/* Row สำหรับ EA Anywhere และปุ่ม More */}
          <View style={styles.footerRow}>
            <View style={styles.row}>
              <Image source={require("./assets/ea.png")} style={styles.icon} />
              <Text style={styles.provider}>EA Anywhere</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("RouteDetails")}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    width: 31,
    height: 28,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F3C79",
  },
  card: {
    backgroundColor: "#2F3C79",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  date: {
    color: "#BCC2E2",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  location: {
    color: "#BCC2E2",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 20,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  provider: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  moreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});