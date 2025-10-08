// screens/CartScreen.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ref, onValue, remove } from "firebase/database";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch cart
  useEffect(() => {
    if (!user) return;

    const cartRef = ref(db, `carts/${user.uid}`);
    console.log("Listening to cart:", cartRef.path); // Debug
    const unsubscribe = onValue(cartRef, (snapshot) => {
      const data = snapshot.val() || {};
      console.log("Cart data:", data); // Debug - see the actual structure
      const items = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setCart(items);
    });

    return () => unsubscribe();
  }, [user]);

  // Remove item instantly - FIXED VERSION
  const handleRemove = async (itemId) => {
    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    console.log("Attempting to remove item ID:", itemId);
    console.log("User UID:", user.uid);

    try {
      const itemRef = ref(db, `carts/${user.uid}/${itemId}`);
      console.log("Full path to remove:", itemRef.toString());

      await remove(itemRef);
      console.log("Remove successful");

      // Update local UI immediately (optional - Firebase will update via onValue)
      // setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      
    } catch (err) {
      console.log("Remove failed:", err);
      Alert.alert("Error", "Failed to remove item: " + err.message);
    }
  };

  // Rest of your component remains the same...
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>
                  R{item.price} x {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total: R{total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Your styles remain the same...
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: { width: 60, height: 60, marginRight: 10, resizeMode: "contain" },
  title: { fontSize: 14, fontWeight: "bold", color: "#333" },
  price: { fontSize: 13, color: "#555" },
  removeButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  removeText: { color: "#fff", fontWeight: "600" },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#00aeff",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },
});