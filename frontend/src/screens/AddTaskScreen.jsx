import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRouter} from 'expo-router';
import {globalStyles} from '../styles/globalStyles';
import CustomTextInput from '../components/CustomTextInput';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task title is required.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'https://task-mate-backend-x42q.onrender.com/tasks',
        {title, description},
        {headers: {Authorization: `Bearer ${token}`}}
      );
      Alert.alert('Success', 'Task added successfully!');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add New Task</Text>
      <CustomTextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <CustomTextInput
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

export default AddTaskScreen;
