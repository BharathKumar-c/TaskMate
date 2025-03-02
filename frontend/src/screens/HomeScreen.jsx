import React, {useEffect, useState} from 'react';
import {FAB} from 'react-native-paper';
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRouter} from 'expo-router';
import Header from '../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {setTasks} from '../state/slices/taskSlice';
import TaskCard from '../components/TaskCard';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Unauthorized. Please log in again.');
        router.replace('/login');
        return;
      }

      const res = await axios.get(
        'https://task-mate-backend-x42q.onrender.com/tasks',
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );

      if (res.data && Array.isArray(res.data)) {
        dispatch(setTasks(res.data));
      } else {
        Alert.alert('Error', 'Invalid response from server');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to load tasks');
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  return (
    <>
      {/* Header with Logout Icon */}
      <Header />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={styles.taskList}
            data={tasks}
            keyExtractor={(item) => item._id}
            renderItem={({item, index}) => (
              <TaskCard item={item} index={index} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
        <FAB
          style={styles.fab}
          icon="plus"
          color="white"
          onPress={() => router.push('/add-task')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
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
  taskList: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#0560FD',
  },
});

export default HomeScreen;
