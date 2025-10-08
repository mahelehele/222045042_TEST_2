// screens/ProductListScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  image: { width: "100%", height: 200, resizeMode: "contain" },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  price: { fontSize: 14, color: "#444", marginTop: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
