import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../styles/globalStyles';

const AddTaskForm = ({onTaskAdded}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task title is required.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'https://task-mate-backend-x42q.onrender.com/tasks',
        {title, description},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      onTaskAdded(res.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleAddTask}>
        <Text style={globalStyles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default AddTaskForm;
