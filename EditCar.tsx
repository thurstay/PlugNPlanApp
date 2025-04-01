import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "EditCar">;

interface Car {
  id: number;
  name: string;
  model: string;
  image: any;
}

export default function EditCar() {
  const navigation = useNavigation<NavigationProp>();
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      name: "Car 1",
      model: "Tesla Model 3",
      image: require("./assets/car.png"),
    },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // เปิด/ปิดโหมดแก้ไข
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // แสดง Popup ยืนยันการลบ
  const confirmDelete = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteConfirm(true);
  };

  // ดำเนินการลบรถ
  const handleDelete = () => {
    if (selectedCar) {
      setCars(cars.filter((car) => car.id !== selectedCar.id));
      setIsDeleteConfirm(false);
      setSelectedCar(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
          <Image source={require("./assets/icons/back.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>My Car</Text>
        <TouchableOpacity onPress={toggleEditMode}>
          <Text style={styles.editText}>{isEditMode ? "Done" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
      {/* แสดงรายการรถ */}
      {cars.length > 0 ? (
        <View style={styles.card}>
          <View style={styles.cardDetails}>
            <Text style={styles.carName}>{cars[0].name}</Text>
            <Text style={styles.carModel}>{cars[0].model}</Text>
          </View>
        <View style={styles.imageContainer}>
            <Image source={cars[0].image} style={styles.carImage} />
        </View>
          {isEditMode && (
            <TouchableOpacity onPress={() => confirmDelete(cars[0])} style={styles.deleteIcon}>
              <Image source={require("./assets/icons/delete.png")} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>        
      ) : (
        <View style={styles.emptyCard}>
          <TouchableOpacity onPress={() => navigation.navigate("selectcar2")}>
            <Image source={require("./assets/icons/plus.png")} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      )}
      {/* ปุ่มเพิ่มรถ */}
      {cars.length > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate("selectcar2")} style={styles.addButton}>
                <Image source={require("./assets/icons/plus.png")} style={styles.addIcon} />
            </TouchableOpacity>
        )}
      {/* Popup ยืนยันการลบ */}
      <Modal visible={isDeleteConfirm} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>⚠ Warning</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete{" "}
              <Text style={styles.modalCarName}>{selectedCar?.name}?</Text>
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsDeleteConfirm(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 30 : 20,
    marginBottom: 20,
  },
  backIcon: {
    width: 31,
    height: 28,
  },
  header: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F3C79",
    textAlign: "left",
    marginLeft: 10,
  },
  editText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#2F3C79",
    width: 340,
    height: 151,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 20,
    position: "relative",
    alignSelf: "center",
  },
  cardDetails: {
    flex: 1, 
    marginLeft: 10,
    paddingTop: 8,
    alignItems: "flex-start",
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  carModel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#BCC2E2",
    marginTop: 10,
  },
  carImage: {
    width: 106,
    height: 100,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 13,
    elevation: 5,
    borderRadius: 10,
    position: "absolute",
    right: 20,
    bottom: 18,
  },
  deleteIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  icon: {
    width: 15,
    height: 15,
  },
  emptyCard: {
    backgroundColor: "#EDEDED",
    width: 340,
    height: 151,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 50,
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  addButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  addIcon: {
    width: 20,
    height: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  modalCarName: {
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
    marginTop: 15,
  },
  cancelText: {
    fontSize: 16,
    color: "#2F3C79",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
  },
});