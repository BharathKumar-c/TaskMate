import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThreeDotMenu from './ThreeDotMenu';

const Header = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#0560FD'} barStyle={'light-content'} />
      <View style={{width: 30, height: 40}} />
      <Text style={styles.title}>Your Task</Text>
      <ThreeDotMenu />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0560FD',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {},
});
