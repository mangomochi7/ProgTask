import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useStreaks } from '../../context/StreakContext';

const { height, width } = Dimensions.get('window');

const UpdateStreakTask = () => {
  const navigation = useNavigation();
  const { index } = useLocalSearchParams();
  const { streaks, updateStreakProgress } = useStreaks();
  const [unitsCompleted, setUnitsCompleted] = useState('');

  const task = streaks[parseInt(index)];

  const handleUpdate = () => {
    const value = parseInt(unitsCompleted);
    if (isNaN(value)) {
        Alert.alert("Invalid Input", "Please enter a valid number.");
        return;
    }
    if (value < 0) {
        Alert.alert("Invalid Value", "Please enter a number greater than 0.");
        return;
    }

    updateStreakProgress(parseInt(index), value);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <Text style={styles.topBarText}>Update Your Progress</Text>
        </View>
        
        <View style={styles.containerArea}>
            <Text style={styles.label}>{task.unit} completed:</Text>
            <TextInput
            style={styles.input}
            value={unitsCompleted}
            onChangeText={setUnitsCompleted}
            keyboardType="numeric"
            placeholder="e.g. 5"
            />

            <View style={styles.buttonRow}>
                <Pressable style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
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
  },
  label: {
    fontWeight: 'bold',
    fontSize: height * 0.022,
    marginTop: 10,
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
  updateButton: {
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
  backButton: {
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

export default UpdateStreakTask;