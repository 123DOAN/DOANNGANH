import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './screens/SplashScreen';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login'; 
import SignUpScreen from './screens/SignUpScreen'; 
import ForgetPassword from './screens/ForgetPassword';
import VerificationCodeScreen from './screens/VerificationCodeScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tạo một Tab Navigator cho màn hình Home và Search
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

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

        {/* Tab Navigator cho Home và Search */}
        <Stack.Screen 
          name="HomeTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
