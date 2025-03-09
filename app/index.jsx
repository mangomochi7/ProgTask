import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get('window');

const taskScreen = () => {
  const tasks = [
    {
      typecolor: '#EFF3F8',
      name: 'Homework Problems',
      progress1: 3,
      progress2: 7,
      esimate: 8,
    },
    {
      typecolor: '#FFFFF4',
      name: 'Khan Academy',
      progress1: 2,
      progress2: 3,
      esimate: 14,
    },
    {
      typecolor: '#FFFFF4',
      name: 'Problem Set',
      progress1: 15,
      progress2: 40,
      esimate: 2,
    },
    {
      typecolor: '#F8F0EF',
      name: 'Chemistry Textbook',
      progress1: 410,
      progress2: 450,
      esimate: 5,
    },
    {
      typecolor: '#EFF3F8',
      name: 'Memorize Vocabulary',
      progress1: 12,
      progress2: 20,
      esimate: 3,
    }
  ]

  const taskCard = ({item}) => (
    <View>
    <Text style = {styles.text1}>{item.name}</Text>
    <View style = {[styles.task, {backgroundColor: item.typecolor}, {flexDirection: 'column'}]}>
      <Text style = {styles.text2}>{item.name}</Text>
      <Text style = {styles.text2}>{item.progress1} out of {item.progress2}</Text>
    </View>
    </View>
  )

  return (
    <View style = {styles.container}>

      <FlatList
        data={tasks}
        renderItem={taskCard}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE5F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  task: {
    width: width*0.9,
    height: height*0.15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    marginTop: width*0.01,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowColor: '#74839B',
    marginBottom: width*0.025,
  },
  text1: {
    fontSize: 20,
    marginTop: width*0.025,
  },
  text2: {
    fontSize: 20,
  }
})

export default taskScreen