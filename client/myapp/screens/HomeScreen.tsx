import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  TextInput,
  Pressable,
  Button,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavOptions from "../components/NavOptions";
import { useNavigation } from "@react-navigation/native";
import AllScreen from "./AllScreen";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={require("../assets/images.png")} />
      </View>
      <Text style={{ fontSize: 22, color: "purple", fontWeight: "bold" }}>
        Search For a Recipe
      </Text>
      <StatusBar style="auto" />
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.textinput}
          placeholder="Search..."
          onChangeText={(text: string) => setSearch(text)}
          value={search}
          autoCapitalize="sentences"
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "red" : "purple",
            },
            styles.button,
          ]}
          onPress={() => navigation.navigate("AllScreen" as never)}
        >
          <Text style={styles.buttonText}>View all the recipes</Text>
        </Pressable>
      </View>
      <NavOptions term={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80,
  },
  button: {
    color: "purple",
    borderRadius: 8,
    height: 60,
    width: 120,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    textAlign: "center",

    marginTop: 5,
  },
  textinput: {
    width: 300,
    height: 40,
    backgroundColor: "#424242",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    color: "white",
    margin: 20,
  },
});

export default HomeScreen;
