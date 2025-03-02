import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {logout} from '../state/slices/authSlice';
import {useDispatch} from 'react-redux';
import {useRouter} from 'expo-router';

const ThreeDotMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 3-dot button */}
      <TouchableOpacity
        style={styles.threedotbtn}
        onPress={() => setShowMenu(!showMenu)}>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>

      {/* Dropdown menu */}
      {showMenu && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              dispatch(logout());
              setShowMenu(false);
              router.replace('/login');
            }}>
            <MaterialIcons name="logout" size={20} color="#333" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  threedotbtn: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 50,
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1,
    top: 49,
    right: 0,
    backgroundColor: '#ffff',
    width: 120,
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 7,
  },
  menuText: {
    fontSize: 16,
  },
});

export default ThreeDotMenu;
