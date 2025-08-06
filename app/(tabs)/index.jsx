import { Alert, View, Text, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import * as Progress from 'react-native-progress';
import React from 'react';
import { useTasks } from '../../context/TaskContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import pluralize from 'pluralize';

const { height, width } = Dimensions.get('window');

const TaskScreen = () => {
  const navigation = useNavigation();
  const { tasks, removeTask } = useTasks();

  const taskCard = ({ item, index }) => {
    const dailyRatio = item.dailyProgress / item.dailyTarget;
    const totalDone = item.totalProgress >= item.totalAmount;

    const words = item.unit.split(' ');
    words[words.length - 1] = pluralize(words[words.length - 1]);
    pluralUnit = words.join(' ');

    let backgroundColor = '#EFF3F8';
    if (totalDone) {
      backgroundColor = '#F1F8EF';
    } else if (item.dailyProgress === 0) {
      backgroundColor = '#F8F0EF';
    } else if (dailyRatio < 1) {
      backgroundColor = '#FFFFF4';
    }

    return (
      <View style={styles.cardContainer}>

        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderFont}>
            {item.totalProgress}/{item.totalAmount} done
          </Text>

          <Text style={styles.cardHeaderFont}>
            est. {Math.ceil((item.totalAmount - item.totalProgress) / (item.dailyTarget))} days left
          </Text>
        </View>

        <View style={[styles.taskCard, { backgroundColor }]}>
          <View style={styles.nameRow}>

            <Text style={styles.nameFont}>{item.name}</Text>

            <Pressable onPress={() => {
              Alert.alert(
                "Delete Task",
                `Are you sure you want to delete "${item.name}"?`,
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Yes", style: "destructive", onPress: () => removeTask(index) }
                ]
              );
            }}>
              <Text style={styles.deleteButton}>X</Text>
            </Pressable>

          </View>

          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={item.totalProgress / item.totalAmount}
              width={width * 0.7}
              height={height * 0.025}
              borderRadius={30}
              color="#B2C1D7"
              borderColor="#556987"
              borderWidth={2}
            />
            <Text
              style={[
                styles.progressFont,
                {
                  left: `${Math.min(80, Math.max(3, (item.totalProgress / item.totalAmount) * 100 - 15))}%`,
                },
              ]}
            >
              {Math.round(Math.min(100, (item.totalProgress / item.totalAmount) * 100))}%
            </Text>
          </View>

          <View style={styles.dottedLine} />

          <Text style={styles.dailyFont}>
            {item.dailyTarget - item.dailyProgress} {pluralUnit} remaining today
          </Text>

          <View style={styles.dailyProgressRow}>
            <View style={styles.progressContainer}>
              <Progress.Bar
                progress={item.dailyProgress / item.dailyTarget}
                width={width * 0.6}
                height={height * 0.025}
                borderRadius={30}
                color="#DDE8F7"
                borderColor="#556987"
                borderWidth={2}
              />
              <Text
                style={[
                  styles.progressFont,
                  {
                    left: `${Math.min(80, Math.max(3, (item.dailyProgress / item.dailyTarget) * 100 - 15))}%`,
                  },
                ]}
              >
                {Math.round(Math.min(100, (item.dailyProgress / item.dailyTarget) * 100))}%
              </Text>
            </View>

            <Pressable
              disabled={totalDone}
              onPress={() => navigation.navigate('(progress)/updateTask', { index })}
              style={({ pressed }) => ({
                opacity: totalDone || pressed ? 0.5 : 1,
              })}
            >
              <MaterialCommunityIcons name="plus-thick" size={height * 0.035} color="#556987" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Goal Progress</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={taskCard}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={styles.footerSpace} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}> You haven't added any tasks yet. Tap the + button to add one! </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.addButtonContainer}>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('(progress)/addTask')}
        >
          <MaterialCommunityIcons name="plus-thick" size={width*0.12} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE5F2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height*0.03,
  },
  cardContainer: {
    paddingHorizontal: width * 0.05,
    marginBottom: width * 0.05,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    alignSelf: 'center',
  },
  cardHeaderFont: {
    fontSize: height * 0.019,
    fontWeight: '500',
  },
  taskCard: {
    padding: width * 0.05,
    width: width * 0.8,
    borderRadius: width * 0.03,
    backgroundColor: '#EFF3F8',
    elevation: 5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowColor: '#74839B',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    fontSize: height * 0.025,
    fontWeight: '900',
    color: '#7C5A5A',
  },
  nameFont: {
    fontSize: height * 0.022,
    fontWeight: '600',
  },
  progressContainer: {
    position: 'relative',
    marginTop: height * 0.015,
  },
  progressFont: {
    position: 'absolute',
    top: 0,
    fontWeight: 'bold',
    fontSize: height * 0.018,
    color: 'black',
  },
  dottedLine: {
    borderBottomColor: '#ACB6C5',
    borderBottomWidth: 5,
    borderStyle: 'dotted',
    marginTop: height * 0.025,
    marginBottom: height * 0.01,
  },
  dailyFont: {
    fontSize: height * 0.02,
    marginTop: height * 0.01,
  },
  dailyProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.01,
  },
  addButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: width * 0.03,
    right: width * 0.03,
    justifyContent: 'space-evenly',
  },
  addButton: {
    backgroundColor: '#556987',
    borderRadius: height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.15,
    width: width * 0.15,
    elevation: 4,
  },
  footerSpace: {
    height: height * 0.12,
  },
  topBar: {
    width: '100%',
    height: height*0.08,
    backgroundColor: '#BBC6D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height*0.01,
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
  emptyContainer: {
    padding: width*0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: width*0.045,
  },
});

export default TaskScreen;
