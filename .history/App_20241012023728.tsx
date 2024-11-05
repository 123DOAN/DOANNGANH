import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import các màn hình
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import SignUpScreen from './screens/SignUpScreen';
import ForgetPassword from './screens/ForgetPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator chính cho phần Splash, Onboarding, Login, Register, v.v.
function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={SignUpScreen} options={{ headerShown: false }} />
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
      <Stack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }} /> {/* Điều hướng đến Tab */}
    </Stack.Navigator>
  );
}

// Tab Navigator điều hướng giữa Home và Profile
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }} // Tắt header cho Tab.Navigator
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// App chính kết hợp điều hướng
export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
