import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './app/screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import {AuthProvider} from './app/shared/contexts/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import ViewUsersScreen from './app/screens/ViewUsersScreen';
import {AppHeader} from './app/components/AppHeader';

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

export type RootStackParamList = {
  LoginScreen: undefined;
  ViewUsersScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

axios.defaults.baseURL = 'http://10.0.2.2:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const queryClient = new QueryClient();

const App = () => {
  const {Screen, Navigator} = Stack;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Navigator initialRouteName={'LoginScreen'}>
            <Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Screen
              name="ViewUsersScreen"
              component={ViewUsersScreen}
              options={{
                headerTitle: props => (
                  <AppHeader
                    title={'Ban users'}
                    showSignOut={true}
                    {...props}
                  />
                ),
                headerStyle: {
                  backgroundColor: '#2a95ff',
                },
              }}
            />
          </Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
