import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';
import {useRouter} from 'expo-router';

const TaskCard = ({item, index}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => router.push(`/task-details/${item._id}`)}>
      <MotiView
        from={{opacity: 0, translateY: 10}}
        animate={{opacity: 1, translateY: 0}}
        transition={{type: 'spring', delay: index * 100}}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>
          {item.description || 'No description'}
        </Text>
      </MotiView>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskCard: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#6200ea',
  },
});
