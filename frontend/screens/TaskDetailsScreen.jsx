import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Button} from 'react-native-paper';

const TaskDetailsScreen = () => {
  const {id} = useLocalSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        `https://task-mate-backend-x42q.onrender.com/tasks/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      setTitle(res.data.title);
      setDescription(res.data.description);
    } catch (error) {
      Alert.alert('Error', 'Failed to load task details.');
    }
  };

  const handleUpdateTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `https://task-mate-backend-x42q.onrender.com/tasks/${id}`,
        {title, description},
        {headers: {Authorization: `Bearer ${token}`}}
      );
      Alert.alert('Success', 'Task updated!');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to update task.');
    }
  };

  const handleDeleteTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(
        `https://task-mate-backend-x42q.onrender.com/tasks/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      Alert.alert('Success', 'Task deleted!');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button
        mode="contained"
        onPress={handleUpdateTask}
        style={{marginBottom: 10}}>
        Update Task
      </Button>
      <Button mode="contained" color="red" onPress={handleDeleteTask}>
        Delete Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5},
});

export default TaskDetailsScreen;
