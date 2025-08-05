import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { useStreaks } from '../../context/StreakContext';

const { height, width } = Dimensions.get('window');

const AddStreakTask = () => {
  const navigation = useNavigation();
  const { addStreak } = useStreaks();
  const [taskName, setTaskName] = useState('');
  const [dailyTarget, setDailyTarget] = useState('');
  const [unit, setUnit] = useState('');

  const handleCreate = () => {

    if (!taskName || taskName.trim() === '') {
        Alert.alert("Missing Streak Name", "Please enter a name for your streak.");
        return;
    }
    if (!dailyTarget) {
        Alert.alert("Missing Daily Target", "Please enter your daily target.");
        return;
    }
    if (parseInt(dailyTarget) <= 0) {
        Alert.alert("Invalid Value", "Daily target must be greater than 0.");
        return;
    }
    if (!unit || unit.trim() === '') {
        Alert.alert("Missing Unit", "Please enter a unit for your task.");
        return;
    }

    addStreak({
        name: taskName,
        dailyTarget: parseInt(dailyTarget),
        unit: unit.toLowerCase(),
        dailyProgress: 0,
        streak: 0,
        totalCompleted: 0,
        lastUpdated: new Date().toISOString(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <Text style={styles.topBarText}>Start a Streak</Text>
        </View>

        <View style={styles.containerArea}>
            <Text style={styles.labelFont}>Task Name:</Text>
            <TextInput style={styles.input} value={taskName} onChangeText={setTaskName} placeholder="e.g. read"/>

            <Text style={styles.labelFont}>Daily Target:</Text>
            <TextInput style={styles.input} value={dailyTarget} onChangeText={setDailyTarget} keyboardType="numeric" placeholder="e.g. 30"/>

            <Text style={styles.labelFont}>Unit of Amount:</Text>
            <TextInput style={styles.input} value={unit} onChangeText={setUnit} placeholder="e.g. minutes"/>

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
  topBar: {
    width: '100%',
    height: height*0.08,
    backgroundColor: '#BBC6D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height*0.02,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#74839B',
    elevation: 2,
  },
  topBarText: {
    color: '#000000',
    fontSize: height * 0.025,
    fontWeight: 500,
  },
});

export default AddStreakTask;