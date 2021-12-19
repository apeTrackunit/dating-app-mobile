import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {AuthProvider} from './app/shared/contexts/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationStack} from './NavigationStack';

export type RootStackParamList = {
  LoginScreen: undefined;
  ViewUsersScreen: undefined;
};

//axios.defaults.baseURL = 'http://10.0.2.2:5000/api';
axios.defaults.baseURL = 'https://bgndatingapp-backend.azurewebsites.net/api';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const queryClient = new QueryClient();

import('react-query-native-devtools').then(({addPlugin}) => {
  addPlugin({queryClient});
});

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
