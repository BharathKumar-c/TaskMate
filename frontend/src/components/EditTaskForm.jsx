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
import {useDispatch} from 'react-redux';
import {updateTask, deleteTask} from '../state/slices/taskSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '../styles/globalStyles';

const EditTaskForm = ({task, onClose}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleUpdateTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.put(
        `https://task-mate-backend-x42q.onrender.com/tasks/${task._id}`,
        {title, description},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      dispatch(updateTask(res.data));
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleDeleteTask = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(
        `https://task-mate-backend-x42q.onrender.com/tasks/${task._id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );

      dispatch(deleteTask(task._id));
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput
        style={[styles.input, styles.description]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={[globalStyles.button, {marginBottom: 7}]}
        onPress={handleUpdateTask}>
        <Text style={globalStyles.buttonText}>Update Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[globalStyles.button, {backgroundColor: 'red'}]}
        onPress={handleDeleteTask}>
        <Text style={globalStyles.buttonText}>Delete Task</Text>
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

export default EditTaskForm;
