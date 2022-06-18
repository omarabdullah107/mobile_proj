import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View , TextInput, Button, Text} from 'react-native';
import React, { useEffect, useState } from 'react'
import NavOptions from '../components/NavOptions';


const HomeScreen = () => {
    const [search, setSearch] = useState('');
    return (
      <View style={styles.container}>
        <View style = {{alignItems: 'center'}}>
        <Image 
          style = {styles.image}
          source = {require('../assets/25224_294121_10150_image.jpg')}
        />
        </View>
        <Text>Search on the dish you want</Text>
      <StatusBar style="auto" />
      <View style = {{alignItems: 'center'}}>
          <TextInput
          style={styles.textinput}
          placeholder = 'Search The Web'
          onChangeText={(text: string) => setSearch(text)}
          value={search}
          autoCapitalize='none'
          />
      </View>
      <NavOptions term={search} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
   
    width: 200,
    height: 200,
    resizeMode: 'contain'
    

  },
  textinput: {

    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    margin: 20

  },

});

export default HomeScreen ;