import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRouter} from 'expo-router';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchTasks();
  }, []);

  const checkAuthAndFetchTasks = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      router.replace('/login'); // Redirect to login if no token
      return;
    }

    fetchTasks(token);
  };

  const fetchTasks = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://task-mate-backend-x42q.onrender.com/tasks',
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      setTasks(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('token');
        router.replace('/login'); // Redirect to login on unauthorized error
      } else {
        Alert.alert('Error', 'Failed to load tasks');
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
      <Button title="Add Task" onPress={() => router.push('/add-task')} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskCard: {padding: 15, borderWidth: 1, borderRadius: 5, marginBottom: 10},
  taskTitle: {fontSize: 18, fontWeight: 'bold'},
});

export default HomeScreen;
