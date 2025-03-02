import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import {useRouter} from 'expo-router';
import CustomTextInput from '../components/CustomTextInput';
import logo from '../assets/images/logo.png';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post(
        'https://task-mate-backend-x42q.onrender.com/auth/signup',
        {
          name,
          email,
          password,
        }
      );
      Alert.alert('Success', 'Account created! Please log in.');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>Task Mate</Text>
        <Text style={styles.logoDecTxt}>
          Smarter tasks, better productivity.
        </Text>
      </View>
      <CustomTextInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        rightIcon="account"
      />

      <CustomTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        rightIcon="account"
      />

      <CustomTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
      />
      <TouchableOpacity style={styles.Btn} onPress={handleSignup}>
        <Text style={styles.loginBtnText}>Sign Up</Text>
      </TouchableOpacity>
      <Text onPress={() => router.replace('/login')} style={styles.link}>
        Already have an account? Login
      </Text>
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
  link: {color: 'blue', marginTop: 10, textAlign: 'center'},
  Btn: {
    backgroundColor: '#207DFF',
    borderColor: '#207DFF',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    width: '100%',
    marginTop: 20,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  logoBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 6,
    marginTop: 6,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#207DFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoDecTxt: {
    marginTop: 12,
    color: '#207DFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignupScreen;
