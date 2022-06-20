import React, { useState, useEffect, useRef } from "react";
import * as axios from "axios";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-ratings";

const Item = ({ comments }: any) => (
  <View>
    <Card
      containerStyle={{ justifyContent: "center", backgroundColor: "#000" }}
    >
      <Card.Divider />
      <Card.Title style={{ color: "white" }}>{comments}</Card.Title>
      <AirbnbRating defaultRating={5} />
      <Card.Divider />
    </Card>
  </View>
);
const renderItem = ({ item }: any) => <Item comments={item} />;
const CommentScreen = () => {
  //const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const [recipes, setRecipes] = useState<Recipes[]>();
  const [comment, setcomment] = useState<string[]>();
  const [addcomment, setaddcomment] = useState<"">();

  const addaComment = async () => {
    const result = axios.default
      .get(`http://172.20.10.10:3000/recipes/${term}/1`)
      .then(({ data: recipesResults }) => {
        console.log("our test oject", result);
      })
      .catch((err) => console.log("error", err.message));

    await axios.default
      .put(`http://172.20.10.10:3000/recipes/${term}/id`, {
        ...recipes[0],
        comments: [...comment, addcomment],
      })
      .then((response) => console.log("resp updated", response))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://172.20.10.10:3000/recipes/${term}`),
    ]).then(([{ data: recipesResults }]) => {
      if (recipesResults) {
        setRecipes(recipesResults);
        const mycomments = recipesResults[0].comments;
        setcomment(mycomments);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ flex: 1 }}>
        {recipes?.map((card: Recipes) => (
          <Card
            containerStyle={{
              justifyContent: "center",
              backgroundColor: "#212121",
              borderRadius: 8,
              borderWidth: 0,
              height: 600,
            }}
          >
            <Card.Title
              style={{
                color: "white",
                fontSize: 24,
                fontFamily: "serif",
                fontWeight: "bold",
                bottom: 170,
                textAlign: "left",
              }}
            >
              {card.comments}
            </Card.Title>
          </Card>
        ))}
      </ScrollView> */}
      <Card containerStyle={{ backgroundColor: "#424242" }}>
        <FlatList
          data={comment}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </Card>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  id: number;
  name: string;
  image: string[];
  ingredientsList: string;
  rating: [];
  comments: [];
};

export default CommentScreen;
