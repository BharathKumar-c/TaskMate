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
import {setTasks, addTask} from '../state/slices/taskSlice';
import TaskCard from '../components/TaskCard';
import BottomSheet from '../components/BottomSheet';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
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

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
    setSelectedTask(null);
    setShowSheet(false);
  };

  const handleOpenAddTask = () => {
    setSelectedTask(null);
    setShowSheet(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowSheet(true);
  };

  return (
    <>
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
              <TaskCard
                item={item}
                index={index}
                onPress={() => handleEditTask(item)}
              />
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
          onPress={handleOpenAddTask}
        />
      </View>

      {/* Bottom Sheet for Adding & Editing Task */}
      {showSheet && (
        <BottomSheet isVisible={showSheet} onClose={() => setShowSheet(false)}>
          {selectedTask ? (
            <EditTaskForm
              task={selectedTask}
              onClose={() => setShowSheet(false)}
            />
          ) : (
            <AddTaskForm onTaskAdded={handleAddTask} />
          )}
        </BottomSheet>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
