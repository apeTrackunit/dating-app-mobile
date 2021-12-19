import LoginScreen from './app/screens/LoginScreen';
import ViewUsersScreen from './app/screens/ViewUsersScreen';
import {AppHeader} from './app/components/AppHeader';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';
import {useAuthContext} from './app/shared/contexts/AuthContext';
import {StackActions, useNavigation} from '@react-navigation/native';

export const NavigationStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const {Screen, Navigator} = Stack;

  const {token} = useAuthContext();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (token) {
      navigation.dispatch(StackActions.replace('ViewUsersScreen'));
    }
  }, [token, navigation]);

  return (
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
            <AppHeader title={'Ban users'} showSignOut={true} {...props} />
          ),
          headerStyle: {
            backgroundColor: '#2a95ff',
          },
        }}
      />
    </Navigator>
  );
};
