import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTasks } from '../../context/TaskContext';

const { height, width } = Dimensions.get('window');

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const { addTask } = useTasks();
  const [taskName, setTaskName] = useState('');
  const [dailyTarget, setDailyTarget] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [unit, setUnit] = useState('');

  const handleCreate = () => {
    if (!taskName || !dailyTarget|| !totalAmount || dailyTarget <= 0 || totalAmount <= 0) return;

    addTask({
      name: taskName,
      dailyTarget: parseInt(dailyTarget),
      totalAmount: parseInt(totalAmount),
      unit: unit || '',
      totalProgress: 0,
      dailyProgress: 0,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerArea}>
        <Text style={styles.labelFont}>Task Name:</Text>
        <TextInput style={styles.input} value={taskName} onChangeText={setTaskName} placeholder="e.g. read textbook" />

        <Text style={styles.labelFont}>Daily Target:</Text>
        <TextInput style={styles.input} value={dailyTarget} onChangeText={setDailyTarget} keyboardType="numeric" placeholder="e.g. 5" />

        <Text style={styles.labelFont}>Total Amount:</Text>
        <TextInput style={styles.input} value={totalAmount} onChangeText={setTotalAmount} keyboardType="numeric" placeholder="e.g. 100" />

        <Text style={styles.labelFont}>Unit of Amount:</Text>
        <TextInput style={styles.input} value={unit} onChangeText={setUnit} placeholder="e.g. pages" />

        <View style={styles.buttonRow}>

          <Pressable style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create</Text>
          </Pressable>

          <Pressable style={styles.discardButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Discard</Text>
          </Pressable>
        
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE5F2',
    alignItems: 'center',
    paddingTop: 20,
  },
  containerArea: {
    backgroundColor: '#EFF3F8',
    padding: 20,
    borderRadius: 15,
    width: width * 0.85,
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: '#74839B',
  },
  labelFont: {
    fontSize: height * 0.02,
    marginTop: width * 0.025,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    color: '#38414F',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 5,
    marginTop: 5,
    height: height * 0.035,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  createButton: {
    backgroundColor: '#F7FFF8',
    padding: 10,
    borderRadius: 15,
    minWidth: width * 0.35,
    alignItems: 'center',
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: '#74839B',
  },
  discardButton: {
    backgroundColor: '#FFFAFA',
    padding: 10,
    borderRadius: 15,
    minWidth: width * 0.35,
    alignItems: 'center',
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowColor: '#74839B',
  },
  buttonText: {
    fontSize: height * 0.02,
    fontWeight: '500',
  },
});

export default AddTaskScreen;