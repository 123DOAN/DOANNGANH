import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login'; // Import màn hình Login
import SignUpScreen from './screens/SignUpScreen'; // Import màn hình Sign Up
import ForgetPassword from './screens/ForgetPassword'; // Import màn hình Forget
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
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
          options={{ headerShown: false }} // Ẩn tiêu đề trên màn hình login
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
