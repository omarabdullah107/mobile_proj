import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import CommentScreen from './screens/CommentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();


const App = () =>(
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        headerShown: false,  
      }} 
    />
    <Stack.Screen
    name="ListScreen"
    component={ListScreen}
    options={{
      headerShown:true,
      title:'Dishes',
      headerTitleAlign:'center'
    }}
    />
    <Stack.Screen
    name="CommentScreen"
    component={CommentScreen}
    options={{
      headerShown:true,
      title:'Comments',
      headerTitleAlign:'center'
    }}
    />
  </Stack.Navigator>
</NavigationContainer>
);




export default App;





  



  
  
    


  

