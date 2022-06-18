import React, {useState,useEffect, useRef} from "react";
import * as axios from 'axios';
import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { useRoute } from "@react-navigation/native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native'
import CommentScreen from "./CommentScreen";


const ListScreen = () => {
        const navigation = useNavigation();
        const route = useRoute<RouteProps>();
        const { term } = route.params;
        const [recipes, setRecipes] = useState<Recipes[]>();
        const [index, setIndex] = useState(0);
        const isCarousel = useRef(null);
        useEffect(() => {
          Promise.all([
            axios.default.get(`http://10.0.2.2:3000/recipes/${term}`)
          ])
            .then(([{ data: recipesResults }]) =>  {
              if (recipesResults) setRecipes(recipesResults);
            });
        }, []);
      
       const renderItem = ({item}) =>{
         return(
           <View
           style={styles.carouselItemContainer}
           >
           <Image
           style = {styles.carouselItemImage}
           source = {item ? {uri : item} : require('../assets/NoImageFound.jpg.png')}
           />
           </View>
           )}

        return (
         <View style={styles.container}>
              <ScrollView style={{flex:1}}>
                  { recipes?.map((card: Recipes) => (
                      <Card>
                      <Card.Title>{card.name}</Card.Title>
                      <Card.Divider/>
                      <Carousel
                        //removeClippedSubviews={false}
                        //ref={isCarousel}
                        layout="default"
                        data={card.image}
                        renderItem={renderItem}
                        itemWidth={400}
                        sliderWidth={300}
                        onSnapToItem = { index => setIndex(index) }
                        useScrollView ={true}
                      />
                      <Pagination
                        dotsLength={card.image.length}
                        activeDotIndex={index}
                        inactiveDotOpacity={1}
                        />
                        <Card.Divider />
                        <Card.Title>{card.ingredientsList}</Card.Title>
                      </Card>
                  ))
                }
                 <Button
                 onPress={() => navigation.navigate(CommentScreen as never)}
                 title="Comments"
                 //color="#841584"
                />
                </ScrollView>
          </View>
        )};

        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },

            carouselItemImage:{
              width:'100%',
              height:200,
              borderRadius:4
            },

            carouselItemContainer:{
              height:300,
              padding:20,
              marginTop:20,
              borderRadius: 4,
            }

          });


type RouteParams = {
  term: string;
};

type RouteProps = {
  params: RouteParams
  name: string;
  key: string;
};

type Recipes = {
  name: string;
  image: string[];
  ingredientsList: string;
  rating: [];
  comments: [];

  
};



export default ListScreen;