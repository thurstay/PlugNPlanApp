import React, { useEffect } from "react";
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
import { TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Planned">;

export default function fin() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  

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
    <><MapView
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

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 80 }}>
      <View style={{ width: '100%', maxWidth: 400, padding: 16, backgroundColor: '#313F7E', borderRadius: 30, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image 
          source={require('./assets/icons/Pin.png')} 
          style={{ width: 22, height: 22, tintColor: 'white', marginRight: 8 }} 
        />
        <Text style={{ marginBottom:-8,fontSize: 15, fontWeight: 'bold', color: 'white' }}>
          Plan trip
        </Text>
      </View>


        <View style={{ flexDirection: 'column', gap: 10, marginBottom: 15 }}>
          <View style={{ left:3,width: 350,flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 10 }}>
            // <Ionicons name="location" size={20} color="gray" />
              <TextInput placeholder="Select Current Location" placeholderTextColor="gray" style={{ flex: 1, padding: 12 }} />
            <Ionicons name="search" size={20} color="gray" />
          </View>
          <View style={{ left:3,width: 350,flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 10 }}>
            / <Ionicons name="location" size={20} color="gray" />
              <TextInput placeholder="Select Destination" placeholderTextColor="gray" style={{ flex: 1, padding: 12 }} />
            <Ionicons name="search" size={20} color="gray" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white', marginBottom: 6 }}
            >Select car:</Text>
            <SelectList 
              setSelected={() => {}} 
              data={[{ key: '1', value: 'Car 1' }, { key: '2', value: 'Car 2' }]} 
              boxStyles={{ left: 3,backgroundColor: 'white', borderRadius: 8 }} 
              dropdownStyles={{ backgroundColor: 'white', borderRadius: 8 }} 
            />

          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white', marginBottom: 6 }}
            >Current Battery:</Text>
            <TextInput placeholder="ex. 78" keyboardType="numeric" style={{left:4,width: 165, backgroundColor: 'white', padding: 12, borderRadius: 8 }} />
          </View>
        </View>

        <TouchableOpacity style={{ width: 150,backgroundColor: '#00FFCC', padding: 12, borderRadius: 8, alignItems: 'center', alignSelf:'center' }}
        onPress={() => navigation.navigate("plantrip2")}>
          <Text style={{ fontSize: 15,color: '#171931', fontWeight: 'bold', }}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.bottomNav}>
        {/* Find EV Station Button */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={{ alignItems: "center", opacity: route.name === "Home" ? 1 : 0.5 }}>
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
          <View style={{ alignItems: "center", opacity: route.name === "Planned" ? 1 : 0.5 }}>
            <Image
              source={require("./assets/icons/Planned.png")}
              style={[styles.icon, { tintColor: "white" }]} />
            <Text style={[styles.navText, { color: "white" }]}>
              Plan trip
            </Text>
          </View>
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Setting")}
        >
          <View style={{ alignItems: "center", opacity: route.name === "Setting" ? 1 : 0.5 }}>
            <Image
              source={require("./assets/icons/Settings.png")}
              style={[styles.icon, { tintColor: "white" }]} />
            <Text style={[styles.navText, { color: "white" }]}>
              Settings
            </Text>
          </View>
        </TouchableOpacity>
      </View></>
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
