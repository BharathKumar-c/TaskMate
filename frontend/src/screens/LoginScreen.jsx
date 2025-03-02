import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import logo from '../assets/images/logo.png';
import {useRouter} from 'expo-router';
import {setUser} from '../state/slices/authSlice';
import {useDispatch} from 'react-redux';
import CustomTextInput from '../components/CustomTextInput';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://task-mate-backend-x42q.onrender.com/auth/login',
        {
          email,
          password,
        }
      );
      dispatch(setUser({user: res.data.user, token: res.data.token}));
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Login failed.');
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
      <TouchableOpacity
        style={styles.loginBtn}
        title="Login"
        onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      <Text onPress={() => router.push('/signup')} style={styles.link}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5},
  link: {color: 'blue', marginTop: 10, textAlign: 'center'},
  logoBox: {
    width: '100%',
    paddingVertical: 6,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
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
  loginBtn: {
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
