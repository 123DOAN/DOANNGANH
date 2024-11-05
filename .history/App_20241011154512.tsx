import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login'; 
import SignUpScreen from './screens/SignUpScreen'; 
import ForgetPassword from './screens/ForgetPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import HomeScreen from './screens/HomeScreen'; // Đường dẫn tới HomeScreen.js
import SearchScreen from './screens/SearchScreen'; // Đường dẫn tới SearchScreen.js

const Stack = createStackNavigator();

// Stack Navigator chính cho các màn hình
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Ẩn tiêu đề trên màn hình splash
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }} // Ẩn tiêu đề trên màn hình onboarding
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Ẩn tiêu đề trên màn hình login
        />
        <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{ headerShown: false }} // Ẩn tiêu đề trên màn hình đăng ký
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerTitle: 'Forget Password', headerBackTitleVisible: false }}
        />
        <Stack.Screen 
          name="VerificationCode" 
          component={VerificationCodeScreen} 
          options={{ headerTitle: 'Verification Code', headerBackTitleVisible: false }} 
        />
        <Stack.Screen 
          name="CreateNewPassword" 
          component={CreateNewPasswordScreen} 
          options={{ headerTitle: 'Create New Password', headerBackTitleVisible: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
