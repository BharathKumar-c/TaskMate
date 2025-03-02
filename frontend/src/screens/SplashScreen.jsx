import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import {useRouter} from 'expo-router';
import {MotiView} from 'moti';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/home');
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />
      <MotiView
        from={{translateY: -100, opacity: 0}} // Start from above the screen
        animate={{translateY: 0, opacity: 1}} // Drop down to original position
        transition={{
          type: 'spring',
          damping: 10, // Controls the bounce intensity
          stiffness: 100, // Controls how fast it falls
          mass: 1,
        }}
        style={styles.logoContainer}>
        <Text style={styles.title}>TaskMate</Text>
      </MotiView>
      {Platform.OS === 'android' && <View style={styles.bottomBar} />}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30, // Adjust height for better visibility
    backgroundColor: '#007bff',
  },
});
