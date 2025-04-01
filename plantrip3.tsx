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
import { Linking, Alert } from 'react-native';



type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function plantrip3() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  
  const openGoogleMaps = () => {
    const latitude = 13.721780648667423; // Replace with actual latitude
    const longitude = 100.72759714048168; // Replace with actual longitude
    const url = `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=driving`;
  
    Linking.openURL(url).catch(() => {
      // If Google Maps app is not installed, open in browser
      Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
    });
  };

  const openEAApp = () => {
    const eaURL = 'ea://'; // Replace this if a different deep link is required
  
    Linking.openURL(eaURL).catch(() => {
      Alert.alert(
        'EA Anywhere App Not Installed',
        'It looks like the EA Anywhere Charging app is not installed on your device. Please install it from the App Store.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to App Store', onPress: () => Linking.openURL('https://apps.apple.com/th/app/ea-anywhere/id1240656004?l=th') } // Replace with actual App Store link
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
        
    <View style={{ position: 'absolute', top:70, left: 20, right: 20, backgroundColor: '#313F7E', padding: 16, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}>
    

        <Text style={{ left: -57,fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom:10 }}
        >The Paseo Mall {"\n"}       (Lat Krabang) St.2</Text>
        <Text style={{ left: 53,fontSize: 15, color: 'white', textAlign: 'left', marginBottom: 10 }}numberOfLines={2} ellipsizeMode='tail'
        >Lat Krabang, Lat Krabang, Bangkok</Text>
        <Text style={{ right:-100,fontSize: 15, color: 'white', textAlign: 'center', marginBottom: -5 }}
        >Distance: 0.24 km.</Text>
        <View style={{ left:3,width: 350,borderBottomWidth: 1, borderBottomColor: 'white', marginVertical: 20 }} 
        />
        <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white', marginBottom: 7 }}
        >Cost:                                         DC start 7.7 - 8.7 baht</Text>
        <Text style={{ left:192,fontSize: 15, fontWeight: 'bold', color: 'white' , marginBottom: 7}}
        >AC 80 baht/hr.</Text>
        
        <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white', marginBottom: 7 }}
        >Charger Type:                       DC/AC</Text>
        <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white' , marginBottom: 7}}
        >Current Battery:                   60%</Text>
        <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white' , marginBottom: 7}}
        >Estimate Time:                      20 mins</Text>
        <Text style={{ left:4,fontSize: 15, fontWeight: 'bold', color: 'white', marginBottom: 7}}
        >Estimate Cost:                      DC: xx baht</Text>
        <Text style={{ left:192,fontSize: 15, fontWeight: 'bold', color: 'white', marginBottom: 10 }}
        >AC: xx baht</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity style={{ alignItems: 'center' }}onPress={openEAApp}>
            <Image source={require('./assets/ea.png')} style={{ width: 75, height: 75, marginBottom: 11 }} />
            <Text style={{ fontSize: 14, fontWeight: 'bold',color: 'white', textDecorationLine: 'underline' }}>Booking Charger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={openGoogleMaps}>
            <Image source={require('./assets/icons/Maps.png')} style={{ width: 80, height: 80, marginBottom: 5 }} />
            <Text style={{ fontSize: 14, fontWeight: 'bold',color: 'white', textDecorationLine: 'underline' }}>Navigate to station</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ 
                position: 'absolute', 
                top: -334, 
                left: 7, 
                width: 25, 
                height: 25, 
                borderWidth: 1.5, 
                borderColor: 'white', 
                borderRadius: 20, 
                alignItems: 'center', 
                justifyContent: 'center' 
                }}
                onPress={() => navigation.navigate("plantrip2")}>

                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  ←
                  </Text>
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
