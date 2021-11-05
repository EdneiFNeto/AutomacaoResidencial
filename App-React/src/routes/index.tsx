import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../pages/Signin';
import SplashScreen from '../pages/SplashScreen';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Accept from '../pages/Accept';
import Settings from '../pages/settings';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#F5F5F5',
      },
      headerTitle: '',
      cardStyle: {backgroundColor: '#F5F5F5', borderColor: '#FFF'},
    }}>
    <Auth.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={() => ({
        headerShown: false,
        headerStyle: {backgroundColor: '#888'},
      })}
    />
    <Auth.Screen
      name="Signin"
      component={Signin}
      options={() => ({
        headerShown: false,
        headerStyle: {backgroundColor: '#888'},
      })}
    />

    <Auth.Screen
      name="SignUp"
      component={SignUp}
      options={() => ({
        headerShown: false,
        headerStyle: {backgroundColor: '#888'},
      })}
    />

    <Auth.Screen
      name="Home"
      component={Home}
      options={() => ({
        headerShown: false,
        headerStyle: {backgroundColor: '#888'},
      })}
    />

    <Auth.Screen
      name="Accept"
      component={Accept}
      options={() => ({
        headerShown: false,
        headerStyle: {backgroundColor: '#888'},
      })}
    />

    <Auth.Screen
      name="Settings"
      component={Settings}
      options={() => ({
        headerShown: false,
        headerStyle: {backgroundColor: '#888'},
      })}
    />
  </Auth.Navigator>
);

export default AuthRoutes;
