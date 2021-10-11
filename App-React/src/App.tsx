import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';

const styled = {backgroundColor: '#312e38', flex: 1};

import {AutProvider} from './contexts/auth';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View style={styled}>
        <AutProvider>
          <Routes />
        </AutProvider>
      </View>
    </NavigationContainer>
  );
};

export default App;
