import { useNavigation, useRoute } from "@react-navigation/native";
import * as axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { AirbnbRating, Button, Card } from "react-native-elements";
import Carousel, { Pagination } from "react-native-snap-carousel";
import NavOptions from "../components/NavOptions";
import CommentScreen from "./CommentScreen";

const AllScreen = () => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  useEffect(() => {
    Promise.all([axios.default.get(`http://172.20.10.10:3000/recipes`)]).then(
      ([{ data: recipesResults }]) => {
        if (recipesResults) {
          const r = Object.values(recipesResults);
          setRecipes(r.map((item) => item[0]));
        }
      }
    );
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
        {recipes.map((card: Recipes) => (
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
            <Pagination
              dotsLength={card.image.length}
              activeDotIndex={index}
              inactiveDotOpacity={1}
              dotStyle={{ backgroundColor: "purple" }}
            />
            <Card.Divider />
            <Pressable></Pressable>
            <Card.Title style={{ color: "#c1c1c1" }}>
              {card.ingredientsList}
            </Card.Title>
            <Card.Divider />
          </Card>
        ))}
      </ScrollView>
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
  carouselItemImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
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

export default AllScreen;
