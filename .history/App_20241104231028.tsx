import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import các màn hình
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import SignUpScreen from './screens/SignUpScreen';
import ForgetPassword from './screens/ForgetPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import TabNavigator from './navigation/TabNavigator';
import ProfileScreen from './navigation/ProfileScreen';  // Import TabNavigator từ tệp riêng

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();

// Stack Navigator chính cho phần Splash, Onboarding, Login, Register, v.v.
function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Onboarding" 
        component={Onboarding} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={SignUpScreen} 
        options={{ headerShown: false }} 
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
        name="HomeScreen" // Điều hướng tới TabNavigator
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// App chính kết hợp điều hướng
const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
