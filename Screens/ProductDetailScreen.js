// screens/ProductDetailScreen.js
import React, { useContext } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { ref, set, push } from "firebase/database";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const { user } = useContext(AuthContext);

  const addToCart = async () => {
    const cartRef = ref(db, `carts/${user.uid}`);
    const newItemRef = push(cartRef);
    await set(newItemRef, {
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    alert("✅ Added to cart!");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>R{product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  image: { width: "100%", height: 300, resizeMode: "contain" },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  price: { fontSize: 18, color: "#444", marginBottom: 10 },
});
