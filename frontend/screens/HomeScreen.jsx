import React, {useEffect, useState} from 'react';
import {FAB, Appbar} from 'react-native-paper';
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useRouter} from 'expo-router';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        'https://task-mate-backend-x42q.onrender.com/tasks',
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      setTasks(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header with Logout Icon */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Your Tasks" />
        <Appbar.Action icon="power" onPress={handleLogout} />
      </Appbar.Header>
      {/* FAB for adding tasks */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('/add-task')}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('/add-task')}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => router.push(`/task-details/${item._id}`)}>
              <View style={styles.taskCard}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>{item.description || 'No description'}</Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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
  taskTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 5},
  taskDescription: {fontSize: 14, color: '#666'},
  fab: {
    zIndex: 100,
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 20,
    backgroundColor: '#007bff',
  },
});

export default HomeScreen;
