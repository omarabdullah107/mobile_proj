import React, { useState, useEffect, useRef } from "react";
import * as axios from "axios";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import CommentScreen from "./CommentScreen";
import { Rating, AirbnbRating } from "react-native-ratings";

const ListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const [recipes, setRecipes] = useState<Recipes[]>();
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.1.36:3000/recipes/${term}`),
    ]).then(([{ data: recipesResults }]) => {
      if (recipesResults) setRecipes(recipesResults);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItemContainer}>
        <Image
          style={styles.carouselItemImage}
          source={
            item ? { uri: item } : require("../assets/NoImageFound.jpg.png")
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {recipes?.map((card: Recipes) => (
          <Card
            containerStyle={{
              justifyContent: "center",
              backgroundColor: "#212121",
              borderRadius: 8,
              borderWidth: 0,
            }}
          >
            <Card.Title
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              {card.name}
            </Card.Title>
            <Card.Divider />
            <Carousel
              //removeClippedSubviews={false}
              //ref={isCarousel}
              layout="default"
              data={card.image}
              renderItem={renderItem}
              itemWidth={400}
              sliderWidth={300}
              onSnapToItem={(index) => setIndex(index)}
              useScrollView={true}
            />
            <AirbnbRating />
            <Pagination
              dotsLength={card.image.length}
              activeDotIndex={index}
              inactiveDotOpacity={1}
              dotStyle={{ backgroundColor: "purple" }}
            />
            <Card.Divider />
            <Card.Title style={{ color: "#c1c1c1" }}>
              {card.ingredientsList}
            </Card.Title>
            <Card.Divider />
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "red" : "purple",
                },
                styles.button,
              ]}
              onPress={() => navigation.navigate(CommentScreen as never)}
            >
              <Text style={styles.buttonText}>View Comments</Text>
            </Pressable>
          </Card>
        ))}
      </ScrollView>
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

  carouselItemImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
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

  carouselItemContainer: {
    height: 220,
    padding: 20,
    marginTop: 20,
    borderRadius: 4,
  },
});

type RouteParams = {
  term: string;
};

type RouteProps = {
  params: RouteParams;
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
