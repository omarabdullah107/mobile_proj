import { View,  Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    id: 1,
    title: 'Search',
    screen: 'ListScreen',
  },

]

const NavOptions = (props: NavProps) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id} //   solving the error.
      horizontal
      renderItem={({ item }) => (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => props.term && navigation.navigate(item.screen as never, {term: props.term,} as never)}
            style={styles.button}>
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  button: {
    backgroundColor: "#c0c0c0",
    padding: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

type NavProps = {
  term: string;
}

export default NavOptions