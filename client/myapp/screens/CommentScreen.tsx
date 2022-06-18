import React from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-elements";

const CommentScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textinput}
        placeholder="Add a Comment..."
        // onChangeText={}
        //value={}
      />

      <View></View>

      <View>
        {/*this button should add the comments into the comment array in the
        json . */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "red" : "purple",
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  button: {
    color: "purple",
    borderRadius: 8,
    height: 35,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
  textinput: {
    width: 350,
    height: 40,
    backgroundColor: "#424242",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    color: "white",
    margin: 20,
  },
});

export default CommentScreen;
