import React from "react";
import { TextInput, View,StyleSheet } from "react-native";
import { Button } from "react-native-elements";



const CommentScreen = () =>{
<View>
<TextInput
        style={styles.input}
       // onChangeText={}
        //value={}
      />

      <View>
        // this view for showing the comments


      </View>

      <View>
            // this button should add the comments into the comment array in the json .
            <Button
            
           // onPress={()=> }
            title="Add"
            
            />


      </View>
      
</View>




}


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });


export default CommentScreen;