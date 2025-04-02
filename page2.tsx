import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Linking, Alert } from "react-native";
import API_BASE_URL from "./config";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Page2">;
type RouteParams = RouteProp<RootStackParamList, "Page2">;

export default function page2() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();

  const { batteryPercentage, selectedVehicleId, selectedStationId } =
    route.params;
  const [chargingStation, setChargingStation] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [distance, setDistance] = useState("");
  const [estimateTime, setEstimateTime] = useState<string>(" ");
  const [costAc, setCostAc] = useState<string>(" ");
  const [costDc, setCostDc] = useState<string>(" ");

  const fetchChargingStation = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/charging-stations/${selectedStationId}`
      );
      const result = await response.json();
      if (result.message === "Charging station found") {
        setChargingStation(result.data);
        setDistance(result.distance); // Assuming the API returns distance in the response
      } else {
        Alert.alert("Error", "Charging station not found.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while fetching the data.");
    }
  };

  useEffect(() => {
    fetchChargingStation();
  }, [selectedStationId]);

  const fetchVehicle = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/car/${selectedVehicleId}`);
      const result = await response.json();

      if (result.message === "Car details fetched successfully") {
        setVehicle(result.data);
        if (result.data.batteryCapacity) {
          calculateEstimateTime(result.data.batteryCapacity);
          const { dcCharge, acCharge } = calculateChargingValues(
            batteryPercentage,
            result.data.batteryCapacity
          );

          setCostDc(dcCharge);
          setCostAc(acCharge);
        }
      } else {
        Alert.alert("Error", "Vehicle not found.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Something went wrong while fetching the vehicle data."
      );
    }
  };

  const calculateEstimateTime = (batteryCapacity: number) => {
    if (!batteryPercentage || !batteryCapacity) {
      setEstimateTime("N/A");
      return;
    }

    const batteryLevel = parseFloat(batteryPercentage);
    const chargingTime = ((100 - batteryLevel) * batteryCapacity) / 70;

    setEstimateTime(`${chargingTime.toFixed(2)} mins`);
  };

  const calculateChargingValues = (
    batteryPercentage: string,
    batteryCapacity: number
  ) => {
    const currentBattery = parseFloat(batteryPercentage);
    if (isNaN(currentBattery) || currentBattery < 0 || currentBattery > 100) {
      return { dcCharge: "Invalid", acCharge: "Invalid" };
    }
    const remainingCharge = ((100 - currentBattery) / 100) * batteryCapacity;
    const dcCharge = (remainingCharge * 7.29).toFixed(2);
    const acCharge = (remainingCharge * 4.293).toFixed(2);

    return { dcCharge, acCharge };
  };

  useEffect(() => {
    if (selectedVehicleId) {
      fetchVehicle();
    }
  }, [selectedVehicleId]);

  const openGoogleMaps = () => {
    const latitude = 13.664902676699251; // Replace with actual latitude
    const longitude = 100.437658919524; // Replace with actual longitude
    const url = `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=driving`;

    Linking.openURL(url).catch(() => {
      // If Google Maps app is not installed, open in browser
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      );
    });
  };

  const openEvoltApp = () => {
    const evoltURL = "evolt://"; // Replace this if a different deep link is required

    Linking.openURL(evoltURL).catch(() => {
      Alert.alert(
        "Evolt App Not Installed",
        "It looks like the Evolt Charging app is not installed on your device. Please install it from the App Store.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Go to App Store",
            onPress: () =>
              Linking.openURL(
                "https://apps.apple.com/th/app/evolt/id1471528625"
              ),
          }, // Replace with actual App Store link
        ]
      );
    });
  };

  // hide tab
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const locations = [
    { latitude: 13.736717, longitude: 100.523186 },
    { latitude: 13.745, longitude: 100.536 },
    { latitude: 13.728, longitude: 100.51 },
    { latitude: 13.74, longitude: 100.5 },
    { latitude: 13.75, longitude: 100.54 },
  ];

  return (
    //show map
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.736717,
          longitude: 100.523186,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {locations.map((loc, index) => (
          <Marker key={index} coordinate={loc}>
            <Ionicons name="flash" size={32} color="red" />
          </Marker>
        ))}
      </MapView>

      <View
        style={{
          position: "absolute",
          top: 70,
          left: 20,
          right: 20,
          backgroundColor: "#313F7E",
          padding: 16,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <Text
          style={{
            left: -20,
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {chargingStation ? chargingStation.name : "Loading..."}
        </Text>
        <Text
          style={{
            width: 300,
            left: 53,
            fontSize: 15,
            color: "white",
            textAlign: "left",
            marginBottom: 10,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {chargingStation ? chargingStation.description : "Loading..."}
        </Text>
        <Text
          style={{
            right: -100,
            fontSize: 15,
            color: "white",
            textAlign: "center",
            marginBottom: -5,
          }}
        >
          Distance: {distance ? distance : "Loading..."}
        </Text>
        <View
          style={{
            left: 3,
            width: 350,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            marginVertical: 20,
          }}
        />
        <Text
          style={{
            left: 15,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 7,
          }}
        >
          Cost:                           DC starts 7.7 - 8.7 baht
        </Text>
        
        <Text
          style={{
            left: 152,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 7,
          }}
        >
          AC starts 80 baht/hr.
        </Text>

        <Text
          style={{
            left: 15,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 7,
          }}
        >
          Charger Type:         DC/AC
        </Text>
        <Text
          style={{
            left: 15,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 7,
          }}
        >
          Current Battery:    {" "}
          {batteryPercentage ? batteryPercentage : "Loading..."}%
        </Text>
        <Text
          style={{
            left: 15,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 7,
          }}
        >
          Estimate Time:        {estimateTime}
        </Text>
        <Text
          style={{
            left: 15,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 7,
          }}
        >
          Estimate Cost:        DC: {costDc} baht
        </Text>
        <Text
          style={{
            left: 151,
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginBottom: 10,
          }}
        >
          AC: {costAc} baht
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={openEvoltApp}
          >
            <Image
              source={require("./assets/icons/Booking.png")}
              style={{ width: 80, height: 80, marginBottom: 5 }}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                textDecorationLine: "underline",
              }}
            >
              Booking Charger
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={openGoogleMaps}
          >
            <Image
              source={require("./assets/icons/Maps.png")}
              style={{ width: 80, height: 80, marginBottom: 5 }}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                textDecorationLine: "underline",
              }}
            >
              Navigate to station
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: "absolute",
              top: -329,
              left: 7,
              width: 25,
              height: 25,
              borderWidth: 1.5,
              borderColor: "white",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Home")} // Use goBack instead of navigate
          >
            <Text style={{ fontSize: 16, color: "white" }}>←</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNav}>
        {/* Find EV Station Button */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <View
            style={{
              alignItems: "center",
              opacity: route.name === "Home" ? 1 : 0.5,
            }}
          >
            <Image
              source={require("./assets/icons/Marker.png")}
              style={[styles.icon, { tintColor: "white" }]} // สีขาวเสมอ
            />
            <Text style={[styles.navText, { color: "white" }]}>
              Find EV station
            </Text>
          </View>
        </TouchableOpacity>

        {/* Plan Trip Button */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Planned")}
        >
          <View
            style={{
              alignItems: "center",
              opacity: route.name === "Planned" ? 1 : 0.5,
            }}
          >
            <Image
              source={require("./assets/icons/Planned.png")}
              style={[styles.icon, { tintColor: "white" }]}
            />
            <Text style={[styles.navText, { color: "white" }]}>Plan trip</Text>
          </View>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Setting")}
        >
          <View
            style={{
              alignItems: "center",
              opacity: route.name === "Setting" ? 1 : 0.5,
            }}
          >
            <Image
              source={require("./assets/icons/Settings.png")}
              style={[styles.icon, { tintColor: "white" }]}
            />
            <Text style={[styles.navText, { color: "white" }]}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchCard: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#313F7E",
    padding: 16,
    gap: 8,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  input: {
    flex: 1,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#00FFCC",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    width: "50%",
    alignSelf: "center",
  },
  searchButtonText: {
    color: "black",
    fontWeight: "bold",
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
