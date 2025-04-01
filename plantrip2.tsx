import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;



const StationDropdown = () => {
  const navigation = useNavigation();  // ✅ Move useNavigation inside the component
  const [expanded, setExpanded] = useState(false);

  const stations = [
    {
      name: 'The Paseo Mall (Lat Krabang) ST.2',
      location: 'Lat Krabang, Lat Krabang, Bangkok',
      provider: 'EA Anywhere',
      providerIcon: require('./assets/ea.png'),
      distance: '0.24 km',
    },
    {
      name: 'The Paseo Mall (Lat Krabang) ST.1',
      location: 'Lat Krabang, Lat Krabang, Bangkok',
      provider: 'EA Anywhere',
      providerIcon: require('./assets/ea.png'),
      distance: '0.32 km',
    },
    {
      name: 'GWM Suvarnabhumi Ladkrabang',
      location: '580, Lat Krabang Road, Lat Krabang Subdistrict, Bangkok, Thailand, 10520',
      provider: 'GWM',
      providerIcon: require('./assets/icons/gwm.png'),
      distance: '0.35 km',
    },
  ];

  return (
    <View style={{ backgroundColor: '#313F7E', borderRadius: 20, padding: 15, margin: 20, marginTop: 20 }}>
      <View style={{ alignItems: 'flex-end', marginTop: -1, left: -6 }}>
        <Text style={{ color: 'lightgray', fontSize: 13, fontWeight: '600' }}>Recommend</Text>
      </View>
      
      {/* Clickable station name for navigation */}
      <View style={{ marginTop: 7, left: 14 }}>
        <TouchableOpacity onPress={() => navigation.navigate("plantrip3")}>  
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            {stations[0].name}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <Image source={stations[0].providerIcon} style={{ width: 24, height: 24, marginRight: 5 }} />
        <Text style={{ color: 'white', fontSize: 14 }}>{stations[0].provider}</Text>
        <Image source={require('./assets/icons/distance.png')} style={{ width: 20, height: 20, marginLeft: 20 }} />
        <Text style={{ color: 'white', fontSize: 14 }}> Distance: {stations[0].distance}</Text>
      </View>

      {expanded && (
        <View style={{ marginTop: 5 }}>
          {stations.slice(1).map((station, index) => (
            <View 
              key={index} 
              style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'lightgray', paddingTop: 10 }}
            >
              <View style={{ left: 14, marginTop: 5 }}>
                {/* Clickable station names for navigation */}
                <TouchableOpacity onPress={() => navigation.navigate("plantrip3")}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    {station.name}
                  </Text>
                </TouchableOpacity>

                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: 'lightgray', fontSize: 14 }}>{station.location}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <Image source={station.providerIcon} style={{ width: 24, height: 24 }} />
                  <View style={{ left: 5 }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>{station.provider}</Text>
                  </View>
                  <View style={{ left: 25 }}>
                    <Image source={require('./assets/icons/distance.png')} style={{ width: 20, height: 20 }} />
                  </View>
                  <View style={{ left: 25 }}>
                    <Text style={{ color: 'white', fontSize: 14 }}> Distance: {station.distance}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Expand / Collapse button */}
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginTop: 10 }}>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', textDecorationLine: 'underline' }}>
          {expanded ? 'Hide ▲' : 'Show all stations ▼'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

  
  export default function plantrip2() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
  
    // Hide tab header
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
      <>
        {/* Map */}
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
  
        {/* best route */}
        <View style={{
            backgroundColor: '#313F7E',
            borderRadius: 20,
            padding: 16,
            width: '90%',
            alignSelf: 'center',
            marginTop:80,
            }}>
            {/* Header Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <TouchableOpacity 
                style={{ 
                position: 'absolute', 
                top: 5, 
                left: 5, 
                width: 25, 
                height: 25, 
                borderWidth: 1.5, 
                borderColor: 'white', 
                borderRadius: 20, 
                alignItems: 'center', 
                justifyContent: 'center' 
                }} 
                onPress={() => navigation.navigate("Planned")} // Use goBack instead of navigate
            >
                <Text style={{ fontSize: 16, color: 'white' }}>←</Text>
            </TouchableOpacity>
                <Text style={{ left: 45,fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom:5,marginTop:8 }}>
                The Best Routes
                </Text>
            </View>

            {/* Stats Section */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>158</Text>
                <Text style={{ color: 'white', fontSize: 12 }}>Stations</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>35.46</Text>
                <Text style={{ color: 'white', fontSize: 12 }}>Distance (Km)</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>4h 23m</Text>
                <Text style={{ color: 'white', fontSize: 12 }}>Travel time</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>1</Text>
                <Text style={{ color: 'white', fontSize: 12 }}>Charge</Text>
                </View>
            </View>

            {/* Route Details */}
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Ionicons name="location" size={16} color="white" style={{ marginRight: 5 }} />
                <Text style={{ color: 'white', fontSize: 14 }}>Robinson LifeStyle Latkrabang</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="location" size={16} color="white" style={{ marginRight: 5 ,marginBottom: 7}} />
                <Text style={{ color: 'white', fontSize: 14 }}>
                    Siam Paragon991/1 Rama I Rd, Khwaeng Pathum...
                </Text>
                </View>
            </View>
            </View>
        {/* Station Dropdown */}
        <StationDropdown />
  
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
            <View style={{ alignItems: "center", opacity: route.name === "Home" ? 1 : 0.5 }}>
              <Image source={require("./assets/icons/Marker.png")} style={[styles.icon, { tintColor: "white" }]} />
              <Text style={[styles.navText, { color: "white" }]}>Find EV station</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Planned")}>
            <View style={{ alignItems: "center", opacity: route.name === "Planned" ? 1 : 0.5 }}>
              <Image source={require("./assets/icons/Planned.png")} style={[styles.icon, { tintColor: "white" }]} />
              <Text style={[styles.navText, { color: "white" }]}>Plan trip</Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Setting")}>
            <View style={{ alignItems: "center", opacity: route.name === "Setting" ? 1 : 0.5 }}>
              <Image source={require("./assets/icons/Settings.png")} style={[styles.icon, { tintColor: "white" }]} />
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
