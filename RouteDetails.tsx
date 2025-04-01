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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "RouteDetails">;

export default function RouteDetails() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("RoutesHis")}>
            <Image source={require("./assets/icons/back.png")} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Routes History</Text>
        </View>

        {/* เพิ่ม marginTop เพื่อเว้นระยะห่างจาก Header */}
        <View style={styles.detailCard}>
          <Text style={styles.date}>Date: 28 Oct, 2024</Text>
          <Text style={styles.title}>The Paseo Mall (Lat Krabang) ST.2</Text>
          <Text style={styles.location}>Lat Krabang, Lat Krabang, Bangkok</Text>
          <Text style={styles.subtitle}>Charger Station by EA Anywhere</Text>

          <Text style={styles.info}><Text style={styles.bold}>Start:</Text> 14.05 pm - 15.03 pm.</Text>
          <Text style={styles.info}><Text style={styles.bold}>Total Cost:</Text> 220 baht</Text>
          <Text style={styles.info}><Text style={styles.bold}>Charger Type:</Text> AC</Text>
          <Text style={styles.info}><Text style={styles.bold}>Estimate Time:</Text> 58 mins</Text>
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
  detailCard: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#2F3C79",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F3C79",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2F3C79",
    marginVertical: 5,
  },
  location: {
    fontSize: 14,
    color: "#2F3C79",
  },
  subtitle: {
    fontSize: 14,
    color: "#2F3C79",
    marginTop: 5,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#2F3C79",
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});