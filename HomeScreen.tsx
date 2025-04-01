import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import API_BASE_URL from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useRoute } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chargingStations, setChargingStations] = useState<any[]>([]);
  const [filteredStations, setFilteredStations] = useState<any[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedStationCoords, setSelectedStationCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [batteryPercentage, setBatteryPercentage] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedStationId, setSelectedStationId] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await fetch(`${API_BASE_URL}/user-cars/${userId}`);
        const result = await response.json();

        if (response.ok && result.data && Array.isArray(result.data)) {
          setCars(result.data);
        } else {
          console.error("Failed to fetch cars or invalid data:", result);
          setCars([]);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setCars([]);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const fetchChargingStations = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/charging-stations?search=${searchQuery}`
        );
        const result = await response.json();

        if (response.ok && result.data) {
          setChargingStations(result.data);
        } else {
          console.error("Failed to fetch charging stations:", result);
          setChargingStations([]);
        }
      } catch (error) {
        console.error("Error fetching charging stations:", error);
        setChargingStations([]);
      }
    };

    if (searchQuery) {
      fetchChargingStations();
    } else {
      setChargingStations([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = chargingStations.filter((station) =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredStations(filtered);

      const exactMatch = filtered.find(
        (station) => station.name.toLowerCase() === searchQuery.toLowerCase()
      );
      if (exactMatch) {
        setSelectedStation(exactMatch.name);
      } else {
        setSelectedStation(null);
      }
    } else {
      setFilteredStations([]);
      setSelectedStation(null);
    }
  }, [searchQuery, chargingStations]);

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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          selectedStationCoords
            ? {
                latitude: selectedStationCoords.latitude,
                longitude: selectedStationCoords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
            : {
                latitude: 13.736717, // Default region if no station is selected
                longitude: 100.523186,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }
        }
      >
        {locations.map((loc, index) => (
          <Marker key={index} coordinate={loc}>
            <Ionicons name="flash" size={32} color="red" />
          </Marker>
        ))}
        {selectedStationCoords && (
          <Marker coordinate={selectedStationCoords}>
            <Ionicons name="flash" size={32} color="green" />{" "}
          </Marker>
        )}
      </MapView>

      <View style={styles.searchCard}>
        <Text
          style={{
            marginTop: 2,
            fontSize: 15,
            fontWeight: "700",
            color: "white",
          }}
        >
          <Image
            source={require("./assets/icons/Pin.png")}
            style={[styles.icons, { width: 38, height: 24 }]}
          />
          Select location
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="ex. Soi Thonglor 20"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);

              if (text === "") {
                setSelectedStation(null);
              } else {
                const match = chargingStations.find((station) =>
                  station.name.toLowerCase().startsWith(text.toLowerCase())
                );
                if (match && text.length < match.name.length) {
                  setSelectedStation(null);
                }
              }
            }}
            onBlur={() => {
              const match = chargingStations.find(
                (station) =>
                  station.name.toLowerCase() === searchQuery.toLowerCase()
              );
              if (match) {
                setSelectedStation(match.name);
                setSearchQuery(match.name);
              }
            }}
          />
          <Ionicons name="search" size={20} color="gray" />
        </View>
        {filteredStations.length > 0 && (
          <View style={styles.suggestionContainer}>
            {filteredStations.map((station, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  // Clear the filtered list and set the search query to the selected station's name
                  setFilteredStations([]);
                  setSearchQuery(station.name);
                  setSelectedStation(station.name);

                  // Set the selected station's coordinates
                  setSelectedStationCoords({
                    latitude: station.latitude,
                    longitude: station.longitude,
                  });

                  // Set the selected station ID
                  setSelectedStationId(station.id); // Set the ID of the selected station
                }}
              >
                <Text style={styles.suggestionText}>{station.name}</Text>
                <Text style={styles.suggestionDescription}>
                  {station.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.rowContainer}>
          <View style={[styles.halfContainer, { alignItems: "flex-start" }]}>
            <Text
              style={{
                marginTop: 2,
                fontSize: 15,
                fontWeight: "700",
                color: "white",
              }}
            >
              Select car
            </Text>
            <SelectList
              data={cars.map((car, index) => ({
                key: (index + 1).toString(),
                value: car.name,
              }))}
              setSelected={(selectedKey: string) => {
                const selectedIndex = parseInt(selectedKey, 10) - 1;
                if (selectedIndex >= 0 && selectedIndex < cars.length) {
                  const selectedCar = cars[selectedIndex];
                  console.log("Selected Car:", selectedCar);

                  if (selectedCar) {
                    setSelectedVehicleId(selectedCar.car.id.toString());
                  }
                }
              }}
              boxStyles={{
                backgroundColor: "white",
                width: "95%",
                borderRadius: 8,
                padding: 4,
              }}
              dropdownStyles={{ backgroundColor: "white", width: "95%" }}
            />
          </View>

          <View style={styles.halfContainer}>
            <Text
              style={{
                marginTop: 2,
                fontSize: 15,
                fontWeight: "700",
                color: "white",
              }}
            >
              Current Battery (%)
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ex. 78"
                keyboardType="numeric"
                value={batteryPercentage}
                onChangeText={(text) => setBatteryPercentage(text)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() =>
            navigation.navigate("Page2", {
              batteryPercentage,
              selectedVehicleId,
              selectedStationId,
            })
          }
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        {/* Find EV Station Button */}
        <TouchableOpacity
          style={[styles.navItem, { opacity: route.name === "Home" ? 1 : 0.5 }]} // ใช้ opacity กับ TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./assets/icons/Marker.png")}
            style={[styles.icon, { tintColor: "white" }]} // ไอคอนเป็นสีขาวเสมอ
          />
          <Text style={[styles.navText, { color: "white" }]}>
            Find EV station
          </Text>
        </TouchableOpacity>

        {/* Plan Trip Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            { opacity: route.name === "Planned" ? 1 : 0.5 },
          ]}
          onPress={() => navigation.navigate("Planned")}
        >
          <Image
            source={require("./assets/icons/Planned.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Plan trip</Text>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            { opacity: route.name === "Setting" ? 1 : 0.5 },
          ]}
          onPress={() => navigation.navigate("Setting")}
        >
          <Image
            source={require("./assets/icons/Settings.png")}
            style={[styles.icon, { tintColor: "white" }]}
          />
          <Text style={[styles.navText, { color: "white" }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    width: "95%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    color: "#333", // Add padding for better spacing
  },
  searchButton: {
    backgroundColor: "#00FFCC",
    padding: 9,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    width: "40%",
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
  suggestionContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    width: "95%",
    alignSelf: "center",
    marginTop: 5,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  suggestionDescription: {
    fontSize: 12,
    color: "gray",
  },
});
