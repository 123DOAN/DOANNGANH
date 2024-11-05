import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Xử lý khi người dùng nhấn nút Sign In
const handleSignIn = () => {
  if (email === '' || password === '') {
    Alert.alert('Error', 'Please enter both email and password');
    return;
  }

  // Bạn có thể thêm logic đăng nhập ở đây, ví dụ như gọi API
  console.log('User is trying to sign in with:', email, password);

  // Giả sử đăng nhập thành công
  Alert.alert('Success', `Logged in with email: ${email}`);
  
  // Chuyển hướng đến HomeScreen
  navigation.navigate('HomeScreen');
};

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/images/goldie_logo.png')} style={styles.logo} />

      {/* Chào mừng */}
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.brandName}>
        Login to your account using email or {'\n'} social networks
      </Text>

      {/* Nút đăng nhập với Apple */}
      <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignIn('Apple')}>
        <Image source={require('../assets/images/apple_icon.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      {/* Nút đăng nhập với Google */}
      <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialSignIn('Google')}>
        <Image source={require('../assets/images/google_icon.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with social account</Text>

      {/* Nhập Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Nhập Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Quên mật khẩu */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>

      {/* Nút Đăng nhập */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Đăng ký */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  brandName: {
    fontSize: 15,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialText: {
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#000000',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
