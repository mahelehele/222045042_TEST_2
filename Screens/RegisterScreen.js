// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Login");
    } catch (err) {
      setError("⚠️ " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.brand}>ShopEZ{"\n"}</Text>
        <Text style={styles.subtitle}>Create an Account</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Register" onPress={handleRegister} color="#4CAF50" />
      <View style={{ height: 10 }} /> {/* Spacer */}
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
        color="#00aeff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { textAlign: "center", marginBottom: 30 },
  brand: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4CAF50", // green brand color
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
