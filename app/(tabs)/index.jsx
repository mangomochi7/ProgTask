import { View, Text, StyleSheet, FlatList, Image, Dimensions, Pressable, Button, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Progress from 'react-native-progress'
import { Link } from 'expo-router'
import React from 'react'

const { height, width } = Dimensions.get('window');

const taskScreen = () => {
  const tasks = [
    {
      typecolor: '#EFF3F8',
      name: 'Homework Problems',
      progress1: 1,
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
    <Text style = {styles.text1}>{item.progress1} out of {item.progress2} done</Text>
    <View style = {[styles.task, {backgroundColor: item.typecolor}, {flexDirection: 'column'}]}>
      <Text style = {styles.text2}>{item.name}</Text>
      
      <View style={styles.progressWrapper}>
      
        <Progress.Bar 
          progress={item.progress1/item.progress2} 
          width={width*0.7} 
          height={height*0.025} 
          borderRadius={30}
          color='#B2C1D7'
          borderColor='#556987'
          borderWidth={2}
        />
        <Text style={[styles.progressText, { left: `${item.progress1/item.progress2 * 100 - 8}%` }]}>
          {Math.round(item.progress1/item.progress2*100)}%
        </Text>
        
      </View>

      <Text style = {styles.text3}>{item.progress2 - item.progress1} remaining for today</Text>
    </View>
    </View>
  )

  return (
    <View style = {styles.container}>

      <FlatList
        data={tasks}
        renderItem={taskCard}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={styles.footerSpace} />}
      />

      <View style ={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE5F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  task: {
    padding: width*0.05,
    width: width*0.8,
    height: height*0.2,
    //alignItems: 'center',
    //justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    marginTop: width*0.015,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowColor: '#74839B',
    marginBottom: width*0.015,
  },
  text1: {
    fontSize: 17,
    marginTop: width*0.025,
    fontWeight: 500,
  },
  text2: {
    fontSize: 20,
    fontWeight: 600,
  },
  text3: {
    fontSize: 20,
  },
  progressWrapper: {
    position: 'relative',
    width: width*0.7,
  },
  progressText: {
    position: 'absolute',
    top: 0, 
    left: '50%', 
    transform: [{ translateX: -15 }],
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  buttonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#FFFFFF',
    margin: width*0.05,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1.5,

    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: '#74839B',

  },
  buttonText: {
    fontSize: 30,
    margin: width*0.03,
    fontWeight: 500,
    marginHorizontal: width*0.08,
  },
  footerSpace: {
    height: height*0.12,
  }
})

export default taskScreen